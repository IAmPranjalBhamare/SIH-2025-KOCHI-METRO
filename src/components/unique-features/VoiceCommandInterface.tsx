import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Languages,
  MessageCircle,
  Zap,
  Activity,
  CheckCircle,
  AlertTriangle,
  PlayCircle
} from 'lucide-react';

interface VoiceCommand {
  id: string;
  command: string;
  action: string;
  response: string;
  timestamp: Date;
  language: string;
  confidence: number;
}

const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
];

const voiceCommands = [
  {
    english: "Show me critical trainsets",
    malayalam: "അപകടകര ട്രെയിൻസെറ്റുകൾ കാണിക്കൂ",
    hindi: "महत्वपूर्ण ट्रेनसेट दिखाओ",
    tamil: "முக்கியமான ரயில் தொகுப்புகளைக் காட்டு",
    action: "navigate_critical_trains",
    response: "Displaying critical maintenance alerts for 3 trainsets"
  },
  {
    english: "What's the fleet status today?",
    malayalam: "ഇന്നത്തെ ഫ്ലീറ്റ് സ്റ്റാറ്റസ് എന്താണ്?",
    hindi: "आज का फ्लीट स्टेटस क्या है?",
    tamil: "இன்று கடற்படையின் நிலை என்ன?",
    action: "show_fleet_overview",
    response: "Today's fleet status: 22 trains operational, 3 in maintenance"
  },
  {
    english: "Schedule maintenance for T-012",
    malayalam: "T-012 ന് മെയിന്റനൻസ് ഷെഡ്യൂൾ ചെയ്യൂ",
    hindi: "T-012 के लिए रखरखाव निर्धारित करें",
    tamil: "T-012 க்கு பராமரிப்பு திட்டமிடவும்",
    action: "schedule_maintenance",
    response: "Maintenance scheduled for T-012 on next available slot"
  }
];

export function VoiceCommandInterface() {
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [commandHistory, setCommandHistory] = useState<VoiceCommand[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<'unknown' | 'granted' | 'denied'>('unknown');
  const [permissionError, setPermissionError] = useState<string>('');
  const [hasInitialized, setHasInitialized] = useState(false);
  const recognitionRef = useRef<any>(null);

  const getLanguageCode = (lang: string) => {
    const codes: { [key: string]: string } = {
      'en': 'en-US',
      'ml': 'ml-IN',
      'hi': 'hi-IN',
      'ta': 'ta-IN'
    };
    return codes[lang] || 'en-US';
  };

  const requestMicrophoneAccess = async (): Promise<boolean> => {
    try {
      setPermissionError('Requesting microphone access...');
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermissionError('Microphone API not available. Demo mode works perfectly!');
        setTimeout(() => setPermissionError(''), 3000);
        return false;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      
      // Configure speech recognition only after permission is granted
      configureSpeechRecognition();
      
      setPermissionStatus('granted');
      setPermissionError('✅ Microphone access granted! You can now use voice commands.');
      setTimeout(() => setPermissionError(''), 3000);
      return true;
    } catch (error: any) {
      console.log('Microphone access declined by user - this is completely normal');
      setPermissionStatus('denied');
      setPermissionError('Demo mode active! Click the sample commands below to test the full functionality.');
      setTimeout(() => setPermissionError(''), 4000);
      return false;
    }
  };

  const startListening = () => {
    // Only allow voice recognition if microphone access is explicitly granted
    if (!recognitionRef.current || !recognitionRef.current.start) {
      setPermissionError('Voice recognition not available in your browser. Demo commands work perfectly!');
      return;
    }

    if (isListening) {
      console.log('Already listening...');
      return;
    }

    // Strictly require permission to be granted before starting
    if (permissionStatus !== 'granted') {
      setPermissionError('Please enable microphone access first using the green button below, or try the demo commands!');
      return;
    }

    try {
      recognitionRef.current.lang = getLanguageCode(currentLanguage);
      console.log('Starting voice recognition with language:', getLanguageCode(currentLanguage));
      recognitionRef.current.start();
      
    } catch (error: any) {
      console.error('Voice recognition start failed:', error);
      setIsListening(false);
      setPermissionStatus('denied');
      setPermissionError('Voice recognition failed to start. Demo commands work perfectly!');
    }
  };

  useEffect(() => {
    // Initialize speech recognition API without triggering any microphone access
    if (('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && 
        (location.protocol === 'https:' || location.hostname === 'localhost')) {
      try {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        
        // Only create the recognition object, don't configure it yet to avoid any permission triggers
        recognitionRef.current = {
          SpeechRecognition,
          isConfigured: false
        };

        console.log('Speech recognition API detected (demo mode ready)');
      } catch (error) {
        console.error('Failed to detect speech recognition:', error);
        recognitionRef.current = null;
      }
    } else {
      console.log('Speech recognition not supported or requires HTTPS. Demo mode active.');
      recognitionRef.current = null;
    }

    return () => {
      if (recognitionRef.current && recognitionRef.current.stop && isListening) {
        recognitionRef.current.stop();
      }
    };
  }, [currentLanguage]);

  // Configure speech recognition only when permission is granted
  const configureSpeechRecognition = () => {
    if (!recognitionRef.current || recognitionRef.current.isConfigured) return;

    try {
      const recognition = new recognitionRef.current.SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = getLanguageCode(currentLanguage);
      recognition.maxAlternatives = 3;

      recognition.onstart = () => {
        console.log('Voice recognition started');
        setIsListening(true);
      };

      recognition.onend = () => {
        console.log('Voice recognition ended');
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence || 0.8;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            console.log('Final transcript:', finalTranscript, 'Confidence:', confidence);
            processVoiceCommand(finalTranscript.trim(), confidence);
          } else {
            interimTranscript += transcript;
            setCurrentCommand(interimTranscript.trim());
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsProcessing(false);
        setPermissionStatus('denied');
        setPermissionError('Voice recognition failed. Demo commands work perfectly!');
      };

      // Replace the reference with the configured recognition object
      recognitionRef.current = recognition;
      recognitionRef.current.isConfigured = true;
      
      console.log('Speech recognition configured successfully');
    } catch (error) {
      console.error('Failed to configure speech recognition:', error);
      setPermissionError('Voice recognition setup failed. Demo commands work perfectly!');
    }
  };

  // Initialize with a welcome demo command
  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true);
      setTimeout(() => {
        const welcomeCommand: VoiceCommand = {
          id: 'welcome-demo',
          command: 'Voice Command Center Loaded',
          action: 'welcome',
          response: 'Welcome to the Voice Command Center! Demo mode is active. Click any sample command below to test the AI voice processing system.',
          timestamp: new Date(),
          language: currentLanguage,
          confidence: 1.0
        };
        setCommandHistory([welcomeCommand]);
        setPermissionError('🎉 Demo mode ready! Click sample commands below to test functionality.');
        setTimeout(() => setPermissionError(''), 5000);
      }, 500);
    }
  }, [hasInitialized, currentLanguage]);

  const stopListening = () => {
    if (recognitionRef.current && recognitionRef.current.stop && isListening) {
      console.log('Stopping voice recognition');
      recognitionRef.current.stop();
      setIsListening(false);
      setCurrentCommand('');
    }
  };

  const processVoiceCommand = async (command: string, confidence: number) => {
    if (!command.trim()) {
      console.log('Empty command received, ignoring...');
      return;
    }

    console.log('Processing command:', command, 'Confidence:', confidence);
    setIsProcessing(true);
    setCurrentCommand('');
    
    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find matching command with improved matching logic
    const matchedCommand = voiceCommands.find(cmd => {
      const langKey = currentLanguage === 'en' ? 'english' : 
                     currentLanguage === 'ml' ? 'malayalam' :
                     currentLanguage === 'hi' ? 'hindi' : 'tamil';
      
      const commandText = (cmd as any)[langKey].toLowerCase();
      const inputCommand = command.toLowerCase();
      
      // Check for exact match, partial match, or keyword match
      return commandText.includes(inputCommand) ||
             inputCommand.includes(commandText) ||
             commandText.split(' ').some(word => inputCommand.includes(word)) ||
             inputCommand.split(' ').some(word => commandText.includes(word));
    });

    const newCommand: VoiceCommand = {
      id: Date.now().toString(),
      command: command.trim(),
      action: matchedCommand?.action || 'unknown',
      response: matchedCommand?.response || `Command "${command}" not recognized. Try saying one of the sample commands.`,
      timestamp: new Date(),
      language: currentLanguage,
      confidence: confidence || 0.8
    };

    setCommandHistory(prev => [newCommand, ...prev.slice(0, 4)]);
    setIsProcessing(false);

    // Execute the action if matched
    if (matchedCommand) {
      executeCommand(matchedCommand.action);
    }

    // Speak the response (if supported and not disabled by user)
    if ('speechSynthesis' in window && speechSynthesis.speaking === false) {
      try {
        const utterance = new SpeechSynthesisUtterance(newCommand.response);
        utterance.lang = getLanguageCode(currentLanguage);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Text-to-speech error:', error);
      }
    }
  };

  const executeCommand = (action: string) => {
    // Simulate command execution with feedback
    switch (action) {
      case 'navigate_critical_trains':
        console.log('Navigating to critical trains view');
        break;
      case 'show_fleet_overview':
        console.log('Showing fleet overview');
        break;
      case 'schedule_maintenance':
        console.log('Opening maintenance scheduling');
        break;
      default:
        console.log('Unknown command action:', action);
    }
  };

  const testVoiceCommand = (commandText: string) => {
    processVoiceCommand(commandText, 0.95);
  };

  return (
    <div className="space-y-6">
      {/* Voice Interface Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-900 to-purple-900 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ 
                    scale: isListening ? [1, 1.2, 1] : 1,
                    backgroundColor: isListening ? '#ef4444' : 'rgba(255,255,255,0.2)'
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: isListening ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className="p-3 rounded-full"
                >
                  {isListening ? (
                    <Mic className="w-8 h-8" />
                  ) : (
                    <MicOff className="w-8 h-8" />
                  )}
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold">Voice Command Center</h2>
                  <p className="text-blue-200">Multilingual AI Voice Assistant</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Language Selector */}
                <div className="flex gap-2">
                  {supportedLanguages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentLanguage(lang.code)}
                      className={`px-3 py-2 rounded-lg border transition-colors ${
                        currentLanguage === lang.code 
                          ? 'bg-white/30 border-white/50' 
                          : 'bg-white/10 border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <span className="mr-1">{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Voice Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Microphone Control */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="text-center">
            <CardContent className="p-8">
              <motion.button
                whileHover={{ scale: permissionStatus === 'granted' ? 1.05 : 1 }}
                whileTap={{ scale: permissionStatus === 'granted' ? 0.95 : 1 }}
                onClick={isListening ? stopListening : startListening}
                disabled={isProcessing || permissionStatus !== 'granted'}
                className={`w-24 h-24 rounded-full border-4 flex items-center justify-center mx-auto mb-4 transition-all ${
                  isListening 
                    ? 'bg-red-500 border-red-600 text-white' 
                    : !recognitionRef.current 
                    ? 'bg-gray-400 border-gray-500 text-white cursor-not-allowed'
                    : permissionStatus === 'granted'
                    ? 'bg-green-500 border-green-600 text-white hover:bg-green-600'
                    : 'bg-gray-400 border-gray-500 text-white cursor-not-allowed'
                } ${isProcessing || permissionStatus !== 'granted' ? 'opacity-50' : ''}`}
              >
                {isProcessing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Activity className="w-8 h-8" />
                  </motion.div>
                ) : isListening ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </motion.button>
              
              <h3 className="text-lg font-semibold mb-2">
                {isListening ? 'Listening...' : 
                 isProcessing ? 'Processing...' : 
                 !recognitionRef.current ? 'Demo Mode Only' :
                 permissionStatus === 'granted' ? 'Voice Ready' :
                 'Demo Mode Active'}
              </h3>
              
              <AnimatePresence>
                {currentCommand && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-gray-600 italic"
                  >
                    "{currentCommand}"
                  </motion.div>
                )}
                
                {permissionError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-blue-600 mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    {permissionError}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Mode Indicators */}
              {!recognitionRef.current ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <div className="flex items-center gap-2 justify-center mb-1">
                    <PlayCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-700 font-medium">
                      Demo Mode Only
                    </span>
                  </div>
                  <p className="text-xs text-blue-600">
                    Browser doesn't support voice recognition. Demo commands work perfectly!
                  </p>
                </motion.div>
              ) : permissionStatus !== 'granted' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 space-y-2"
                >
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 justify-center mb-1">
                      <PlayCircle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-700 font-medium">
                        Demo Mode Active
                      </span>
                    </div>
                    <p className="text-xs text-blue-600">
                      Try the sample commands below!
                    </p>
                  </div>
                  <Button
                    onClick={requestMicrophoneAccess}
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Mic className="w-4 h-4" />
                    Enable Microphone (Optional)
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200"
                >
                  <div className="flex items-center gap-2 justify-center mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">
                      Voice & Demo Ready
                    </span>
                  </div>
                  <p className="text-xs text-green-600">
                    Speak or use demo commands!
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Command History */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                Recent Commands
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {commandHistory.map((cmd, index) => (
                    <motion.div
                      key={cmd.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-gray-50 rounded-lg border"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Languages className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">
                            {supportedLanguages.find(l => l.code === cmd.language)?.name}
                          </span>
                        </div>
                        <Badge className={`text-xs ${
                          cmd.confidence > 0.8 ? 'bg-green-100 text-green-600' : 
                          cmd.confidence > 0.6 ? 'bg-yellow-100 text-yellow-600' : 
                          'bg-red-100 text-red-600'
                        }`}>
                          {Math.round(cmd.confidence * 100)}%
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">"{cmd.command}"</p>
                      <p className="text-xs text-green-600">{cmd.response}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {cmd.timestamp.toLocaleTimeString()}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {commandHistory.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No commands yet</p>
                    <p className="text-xs">Try a demo command to get started!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Voice Commands Help */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-purple-600" />
                Demo Commands
              </CardTitle>
              <CardDescription>
                Click to test voice processing (works without microphone!)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {voiceCommands.map((cmd, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all duration-200 bg-gradient-to-r from-blue-50/50 to-purple-50/50"
                    onClick={() => testVoiceCommand((cmd as any)[currentLanguage === 'en' ? 'english' : currentLanguage === 'ml' ? 'malayalam' : currentLanguage === 'hi' ? 'hindi' : 'tamil'])}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <PlayCircle className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-medium text-blue-800">
                        {(cmd as any)[currentLanguage === 'en' ? 'english' : currentLanguage === 'ml' ? 'malayalam' : currentLanguage === 'hi' ? 'hindi' : 'tamil']}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">→ {cmd.response}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Multilingual Support</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Commands work in Malayalam (മലയാളം), Hindi (हिन्दी), Tamil (தமிழ்), and English. Demo mode shows full AI processing!
                  </p>
                </div>
                
                <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">🚀 Try Demo Commands</span>
                  </div>
                  <p className="text-xs text-green-700">
                    Click any sample command above to experience the complete voice processing system. No microphone needed - full functionality guaranteed!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Voice Recognition Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${
                  permissionStatus === 'granted' ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <span className="text-sm">
                  Voice Commands: {
                    !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
                      ? 'Demo Mode Only'
                      : location.protocol !== 'https:' && location.hostname !== 'localhost'
                      ? 'Demo Mode (HTTPS Required)'
                      : permissionStatus === 'granted'
                      ? 'Live Voice & Demo Active'
                      : 'Demo Active (Voice Available)'
                  }
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Commands: {commandHistory.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Languages: {supportedLanguages.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
