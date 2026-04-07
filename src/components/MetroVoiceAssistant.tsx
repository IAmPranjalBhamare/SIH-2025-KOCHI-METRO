import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  X, 
  Send,
  AlertTriangle,
  Train,
  Wrench,
  Clock,
  CheckCircle,
  Zap
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';
import assistantImage from 'figma:asset/4cdfe7bbde9b33e43dae145c4d92a2fa5e39c0de.png';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface MetroStatus {
  inService: number;
  standby: number;
  maintenance: number;
  urgent: string[];
  totalFleet: number;
}

export const MetroVoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [textInput, setTextInput] = useState('');
  const [microphonePermission, setMicrophonePermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');
  const [currentCommand, setCurrentCommand] = useState('');
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const { language } = useLanguage();

  // Mock metro status data
  const metroStatus: MetroStatus = {
    inService: 18,
    standby: 4,
    maintenance: 3,
    urgent: ['Train KM-07', 'Train KM-15'],
    totalFleet: 25
  };

  const speechSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen || !speechSupported) return;

    // Check microphone permission
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'microphone' as PermissionName }).then((result) => {
        setMicrophonePermission(result.state as any);
        result.onchange = () => {
          setMicrophonePermission(result.state as any);
        };
      }).catch(() => {
        setMicrophonePermission('unknown');
      });
    }

    // Initialize speech recognition
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCurrentCommand(transcript);
        processVoiceCommand(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        switch (event.error) {
          case 'not-allowed':
            setMicrophonePermission('denied');
            toast.error('Microphone access denied. Please enable microphone permissions.');
            break;
          case 'no-speech':
            break;
          case 'network':
            toast.error('Network error. Please check your internet connection.');
            break;
          default:
            toast.error('Voice recognition error. Please try again.');
            break;
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setCurrentCommand('');
      };
    } catch (error) {
      console.error('Speech recognition initialization error:', error);
    }
  }, [isOpen]);

  const addMessage = (type: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const speak = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  const processVoiceCommand = (command: string) => {
    addMessage('user', command);
    
    const lowerCommand = command.toLowerCase();
    let response = '';

    if (lowerCommand.includes('status') || lowerCommand.includes('metro') || lowerCommand.includes('fleet')) {
      response = `Current metro status: ${metroStatus.inService} trains in service, ${metroStatus.standby} on standby, ${metroStatus.maintenance} in maintenance. Total fleet: ${metroStatus.totalFleet} trains.`;
    } else if (lowerCommand.includes('urgent') || lowerCommand.includes('priority') || lowerCommand.includes('emergency')) {
      response = `There are ${metroStatus.urgent.length} urgent trains requiring immediate attention: ${metroStatus.urgent.join(', ')}. Please check their status immediately.`;
    } else if (lowerCommand.includes('standby')) {
      response = `Currently ${metroStatus.standby} trains are on standby and ready for deployment if needed.`;
    } else if (lowerCommand.includes('maintenance')) {
      response = `${metroStatus.maintenance} trains are currently under maintenance. Scheduled maintenance includes routine inspections and cleaning operations.`;
    } else if (lowerCommand.includes('service') || lowerCommand.includes('running')) {
      response = `${metroStatus.inService} trains are currently in active service, operating on schedule across all metro lines.`;
    } else if (lowerCommand.includes('help') || lowerCommand.includes('commands')) {
      response = "I can help you with metro fleet status, urgent trains, standby units, maintenance schedules, and operational updates. Try asking about 'fleet status', 'urgent trains', or 'maintenance schedule'.";
    } else {
      response = `I understand you said: "${command}". I can provide information about metro fleet status, urgent trains, standby units, and maintenance schedules. How can I assist you?`;
    }

    setTimeout(() => {
      addMessage('assistant', response);
      speak(response);
    }, 500);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      processVoiceCommand(textInput);
      setTextInput('');
    }
  };

  const startListening = async () => {
    if (!speechSupported) {
      toast.error('Speech recognition is not supported in this browser.');
      return;
    }

    if (microphonePermission === 'denied') {
      toast.error('Microphone access is denied. Please enable it in your browser settings.');
      return;
    }

    try {
      if (recognitionRef.current) {
        setMicrophonePermission('granted');
        setIsListening(true);
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error('Speech recognition start error:', error);
      setIsListening(false);
      toast.error('Failed to start voice recognition. Please try again.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleSpeaking = () => {
    if (synthRef.current && isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const getQuickStatus = () => {
    const statusMessage = `Quick Status: ${metroStatus.inService} trains active, ${metroStatus.urgent.length} urgent alerts.`;
    addMessage('assistant', statusMessage);
    speak(statusMessage);
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src={assistantImage} 
            alt="Kochi Metro Chat Assistant" 
            className="w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
          
          {/* Status indicators */}
          <div className="absolute -top-1 -right-1 flex flex-col gap-1">
            {metroStatus.urgent.length > 0 && (
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-2 h-2 text-white" />
              </div>
            )}
            <div className={`w-3 h-3 rounded-full ${
              isListening ? 'bg-red-500 animate-pulse' : 
              isSpeaking ? 'bg-blue-500 animate-pulse' : 
              'bg-green-500'
            }`} />
          </div>

          {/* Hover tooltip */}
          <div className="absolute bottom-full mb-2 right-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Metro Assistant Sahayi
          </div>
        </motion.button>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-lg">
              <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={assistantImage} alt="Sahayi" className="w-8 h-8 rounded-full" />
                    <div>
                      <CardTitle className="text-sm">Metro Assistant Sahayi</CardTitle>
                      <p className="text-xs text-blue-100">
                        {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Online & Ready'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {speechSupported && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={isListening ? stopListening : startListening}
                        className="h-8 w-8 p-0 text-white hover:bg-white/20"
                        disabled={microphonePermission === 'denied'}
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 p-0 text-white hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Quick Status Bar */}
                <div className="p-3 bg-blue-50 border-b border-gray-100">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Train className="w-3 h-3 text-green-600" />
                        <span className="text-green-600 font-medium">{metroStatus.inService}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-yellow-600" />
                        <span className="text-yellow-600 font-medium">{metroStatus.standby}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wrench className="w-3 h-3 text-blue-600" />
                        <span className="text-blue-600 font-medium">{metroStatus.maintenance}</span>
                      </div>
                    </div>
                    {metroStatus.urgent.length > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {metroStatus.urgent.length} Urgent
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Messages */}
                <div className="h-64 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 && (
                    <div className="text-center py-4">
                      <MessageCircle className="w-12 h-12 text-blue-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Welcome to Metro Assistant!</p>
                      <p className="text-xs text-gray-500">Ask me about fleet status, urgent trains, or maintenance schedules.</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={getQuickStatus}
                        className="mt-2 text-xs"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Quick Status
                      </Button>
                    </div>
                  )}
                  
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user' 
                            ? 'bg-blue-600' 
                            : 'bg-gradient-to-r from-blue-500 to-emerald-500'
                        }`}>
                          {message.type === 'user' ? (
                            <div className="w-3 h-3 bg-white rounded-full" />
                          ) : (
                            <Train className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div
                          className={`p-2 rounded-lg text-sm ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white rounded-br-sm'
                              : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isSpeaking && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center">
                          <Train className="w-3 h-3 text-white" />
                        </div>
                        <div className="bg-gray-100 p-2 rounded-lg rounded-bl-sm">
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-3 border-t border-gray-100 bg-gray-50/50">
                  {currentCommand && (
                    <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
                      <span className="font-medium">Voice:</span> "{currentCommand}"
                    </div>
                  )}
                  
                  <form onSubmit={handleTextSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Ask about metro status..."
                      className="flex-1 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button 
                      type="submit" 
                      size="sm" 
                      disabled={!textInput.trim()}
                      className="px-3"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                  
                  {/* Quick Commands */}
                  <div className="flex gap-1 mt-2">
                    {['Fleet Status', 'Urgent Trains', 'Maintenance'].map((cmd) => (
                      <Button
                        key={cmd}
                        variant="ghost"
                        size="sm"
                        onClick={() => setTextInput(cmd)}
                        className="text-xs h-6 px-2 text-gray-500 hover:text-blue-600"
                      >
                        {cmd}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
