import React, { createContext, useContext, useState, useEffect } from 'react';

// Language types
export type Language = 'en' | 'hi' | 'ml' | 'ta' | 'kn' | 'te';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

// Translation interface
interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

// Comprehensive translations
const translations: Translations = {
  // Common
  'common.loading': {
    en: 'Loading...',
    hi: 'लोड हो रहा है...',
    ml: 'ലോഡിംഗ്...',
    ta: 'ஏற்றுகிறது...',
    kn: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    te: 'లోడ్ అవుతోంది...'
  },
  'common.save': {
    en: 'Save',
    hi: 'सेव करें',
    ml: 'സംരക്ഷിക്കുക',
    ta: 'சேமிக்கவும்',
    kn: 'ಸೇವ್ ಮಾಡಿ',
    te: 'సేవ్ చేయండి'
  },
  'common.cancel': {
    en: 'Cancel',
    hi: 'रद्द करें',
    ml: 'റദ്ദാക്കുക',
    ta: 'ரத்து செய்',
    kn: 'ರದ್ದುಮಾಡಿ',
    te: 'రద్దు చేయండి'
  },
  'common.delete': {
    en: 'Delete',
    hi: 'डिलीट करें',
    ml: 'ഇല്ലാതാക്കുക',
    ta: 'அழி',
    kn: 'ಅಳಿಸಿ',
    te: 'తొలగించండి'
  },
  'common.edit': {
    en: 'Edit',
    hi: 'संपादित करें',
    ml: 'എഡിറ്റ് ചെയ്യുക',
    ta: 'திருத்து',
    kn: 'ಸಂಪಾದಿಸಿ',
    te: 'సవరించండి'
  },
  'common.search': {
    en: 'Search',
    hi: 'खोजें',
    ml: 'തിരയുക',
    ta: 'தேடு',
    kn: 'ಹುಡುಕಿ',
    te: 'వెతకండి'
  },
  'common.filter': {
    en: 'Filter',
    hi: 'फिल्टर',
    ml: 'ഫിൽട്ടർ',
    ta: 'வடிகட்டி',
    kn: 'ಫಿಲ್ಟರ್',
    te: 'ఫిల్టర్'
  },
  'common.refresh': {
    en: 'Refresh',
    hi: 'रिफ्रेश',
    ml: 'പുതുക്കുക',
    ta: 'புதுப்பி',
    kn: 'ರಿಫ್ರೆಶ್',
    te: 'రిఫ్రెష్'
  },
  'common.logout': {
    en: 'Logout',
    hi: 'लॉग आउट',
    ml: 'ലോഗൗട്ട്',
    ta: 'வெளியேறு',
    kn: 'ಲಾಗ್ ಔಟ್',
    te: 'లాగ్ అవుట్'
  },
  'common.welcome': {
    en: 'Welcome',
    hi: 'स्वागत है',
    ml: 'സ്വാഗതം',
    ta: 'வரவேற்கிறோம்',
    kn: 'ಸ್ವಾಗತ',
    te: 'స్వాగతం'
  },
  'common.dashboard': {
    en: 'Dashboard',
    hi: 'डैशबोर्ड',
    ml: 'ഡാഷ്ബോർഡ്',
    ta: 'டாஷ்போர்டு',
    kn: 'ಡ್ಯಾಶ್ಬೋರ್ಡ್',
    te: 'డాష్‌బోర్డ్'
  },

  // Landing Page
  'landing.title': {
    en: 'Kochi Metro Fleet Management System',
    hi: 'कोच्चि मेट्रो फ्लीट प्रबंधन सिस्टम',
    ml: 'കൊച്ചി മെട്രോ ഫ്ലീറ്റ് മാനേജ്മെന്റ് സിസ്റ്റം',
    ta: 'கொச்சி மெட்ரோ கடற்படை மேலாண்மை அமைப்பு',
    kn: 'ಕೊಚ್ಚಿ ಮೆಟ್ರೋ ಫ್ಲೀಟ್ ಮ್ಯಾನೇಜ್ಮೆಂಟ್ ಸಿಸ್ಟಮ್',
    te: 'కొచ్చి మెట్రో ఫ్లీట్ మేనేజ్మెంట్ సిస్టం'
  },
  'landing.subtitle': {
    en: 'AI-Powered Decision Support Platform for Efficient Fleet Operations',
    hi: 'कुशल फ्लीट संचालन के लिए AI-संचालित निर्णय सहायता प्लेटफॉर्म',
    ml: 'കാര്യക്ഷമമായ ഫ്ലീറ്റ് പ്രവർത്തനങ്ങൾക്കായി AI-പവേർഡ് ഡിസിഷൻ സപ്പോർട്ട് പ്ലാറ്റ്ഫോം',
    ta: 'திறமையான கடற்படை செயல்பாடுகளுக்கான AI-இயങ்கும் முடிவு ஆதரவு தளம்',
    kn: 'ಪರಿಣಾಮಕಾರಿ ಫ್ಲೀಟ್ ಕಾರ್ಯಾಚರಣೆಗಳಿಗಾಗಿ AI-ಚಾಲಿತ ನಿರ್ಣಯ ಬೆಂಬಲ ವೇದಿಕೆ',
    te: 'సమర్థవంతమైన ఫ్లీట్ కార్యకలాపాలకు AI-పవర్డ్ డెసిషన్ సపోర్ట్ ప్లాట్‌ఫారమ్'
  },
  'landing.getStarted': {
    en: 'Get Started',
    hi: 'शुरू करें',
    ml: 'ആരംഭിക്കുക',
    ta: 'தொடங்கு',
    kn: 'ಪ್ರಾರಂಭಿಸಿ',
    te: 'ప్రారంభించండి'
  },

  // Login Page
  'login.title': {
    en: 'Sign In to Your Account',
    hi: 'अपने खाते में साइन इन करें',
    ml: 'നിങ്ങളുടെ അക്കൗണ്ടിലേക്ക് സൈൻ ഇൻ ചെയ്യുക',
    ta: 'உங்கள் கணக்கில் உள்நுழையவும்',
    kn: 'ನಿಮ್ಮ ಖಾತೆಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ',
    te: 'మీ ఖాతాలో సైన్ ఇన్ చేయండి'
  },
  'login.email': {
    en: 'Email Address',
    hi: 'ईमेल पता',
    ml: 'ഇമെയിൽ വിലാസം',
    ta: 'மின்னஞ்சல் முகவரி',
    kn: 'ಇಮೇಲ್ ವಿಳಾಸ',
    te: 'ఇమెయిల్ చిరునామా'
  },
  'login.password': {
    en: 'Password',
    hi: 'पासवर्ड',
    ml: 'പാസ്‌വേഡ്',
    ta: 'கடவுச்சொல்',
    kn: 'ಪಾಸ್ವರ್ಡ್',
    te: 'పాస్‌వర్డ్'
  },
  'login.signIn': {
    en: 'Sign In',
    hi: 'साइन इन करें',
    ml: 'സൈൻ ഇൻ ചെയ്യുക',
    ta: 'உள்நுழையவும்',
    kn: 'ಸೈನ್ ಇನ್ ಮಾಡಿ',
    te: 'సైన్ ఇన్ చేయండి'
  },
  'login.adminRole': {
    en: 'Administrator',
    hi: 'प्रशासक',
    ml: 'അഡ്മിനിസ്ട്രേറ്റർ',
    ta: 'நிர்வாகி',
    kn: 'ನಿರ್ವಾಹಕ',
    te: 'అడ್మినిస్ట్రేటర్'
  },
  'login.workerRole': {
    en: 'Field Worker',
    hi: 'क्षेत्रीय कार्यकर्ता',
    ml: 'ഫീൽഡ് വർക്കർ',
    ta: 'கள பணியாளர்',
    kn: 'ಕ್ಷೇತ್ರ ಕೆಲಸಗಾರ',
    te: 'ఫీల్డ్ వర్కర్'
  },

  // Dashboard
  'dashboard.title': {
    en: 'Fleet Management Dashboard',
    hi: 'फ्लीट प्रबंधन डैशबोर्ड',
    ml: 'ഫ്ലീറ്റ് മാനേജ്മെന്റ് ഡാഷ്ബോർഡ്',
    ta: 'கடற்படை மேலாண்மை டாஷ்போர்டு',
    kn: 'ಫ್ಲೀಟ್ ಮ್ಯಾನೇಜ್ಮೆಂಟ್ ಡ್ಯಾಶ್ಬೋರ್ಡ್',
    te: 'ఫ్లీట్ మేనేజ్మెంట్ డాష్‌బోర్డ్'
  },
  'dashboard.fleetOverview': {
    en: 'Fleet Overview',
    hi: 'फ्लीट अवलोकन',
    ml: 'ഫ്ലീറ്റ് അവലോകനം',
    ta: 'கடற்படை மேலோட்டம்',
    kn: 'ಫ್ಲೀಟ್ ಅವಲೋಕನ',
    te: 'ఫ్లీట్ అవలోకనం'
  },
  'dashboard.totalTrains': {
    en: 'Total Trains',
    hi: 'कुल ट्रेनें',
    ml: 'മൊത്തം ട്രെയിനുകൾ',
    ta: 'மொத்த ரயில்கள்',
    kn: 'ಒಟ್ಟು ರೈಲುಗಳು',
    te: 'మొత్తం రైళ్లు'
  },
  'dashboard.activeTrains': {
    en: 'Active Trains',
    hi: 'सक्रिय ट्रेनें',
    ml: 'സജീവ ട്രെയിനുകൾ',
    ta: 'செயலில் உள்ள ரயில்கள்',
    kn: 'ಸಕ್ರಿಯ ರೈಲುಗಳು',
    te: 'యాక్టివ్ రైళ్లు'
  },
  'dashboard.maintenance': {
    en: 'Under Maintenance',
    hi: 'रखरखाव के अंतर्गत',
    ml: 'അറ്റകുറ്റപ്പണിയിൽ',
    ta: 'பராமரிப்பில்',
    kn: 'ನಿರ್ವಹಣೆಯಲ್ಲಿ',
    te: 'మెయింటెనెన్స్‌లో'
  },
  'dashboard.standby': {
    en: 'On Standby',
    hi: 'स्टैंडबाई पर',
    ml: 'സ്റ്റാൻഡ്ബൈയിൽ',
    ta: 'காத்திருப்பில்',
    kn: 'ಸ್ಟ್ಯಾಂಡ್ಬೈನಲ್ಲಿ',
    te: 'స్టాండ్‌బైలో'
  },

  // Voice Assistant
  'voice.greeting': {
    en: 'Hello! I am your Metro Assistant. How can I help you today?',
    hi: 'नमस्ते! मैं आपका मेट्रो सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
    ml: 'ഹലോ! ഞാൻ നിങ്ങളുടെ മെട്രോ അസിസ്റ്റന്റാണ്. ഇന്ന് ഞാൻ എങ്ങനെ സഹായിക്കാം?',
    ta: 'வணக்கம்! நான் உங்கள் மெட்ரோ உதவியாளர். இன்று நான் எப்படி உதவ முடியும்?',
    kn: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಮೆಟ್ರೋ ಸಹಾಯಕ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    te: 'హలో! నేను మీ మెట్రో అసిస్టెంట్. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?'
  },
  'voice.tasksToday': {
    en: 'You have {count} tasks assigned for today.',
    hi: 'आज आपके लिए {count} कार्य निर्धारित हैं।',
    ml: 'ഇന്നത്തേക്ക് നിങ്ങൾക്ക് {count} ചുമതലകൾ നിയോഗിച്ചിട്ടുണ്ട്।',
    ta: 'இன்றைக்கு உங்களுக்கு {count} பணிகள் ஒதுக்கப்பட்டுள்ளன.',
    kn: 'ಇಂದು ನಿಮಗೆ {count} ಕಾರ್ಯಗಳನ್ನು ನಿಯೋಜಿಸಲಾಗಿದೆ.',
    te: 'ఈరోజు మీకు {count} టాస్క్‌లు కేటాయించబడ్డాయి.'
  },
  'voice.highPriority': {
    en: 'High priority task: {task}',
    hi: 'उच्च प्राथमिकता कार्य: {task}',
    ml: 'ഉയർന്ന മുൻഗണനാ ചുമതല: {task}',
    ta: 'அதிக முன்னுரிமை பணி: {task}',
    kn: 'ಹೆಚ್ಚಿನ ಆದ್ಯತೆಯ ಕಾರ್ಯ: {task}',
    te: 'అధిక ప్రాధాన్యత టాస్క్: {task}'
  },

  // Worker Categories
  'worker.fitness': {
    en: 'Fitness Certificates',
    hi: 'फिटनेस प्रमाणपत्र',
    ml: 'ഫിറ്റ്നസ് സർട്ടിഫിക്കറ്റുകൾ',
    ta: 'உடற்தகுதி சான்றிதழ்கள்',
    kn: 'ಫಿಟ್ನೆಸ್ ಪ್ರಮಾಣಪತ್ರಗಳು',
    te: 'ఫిట్‌నెస్ సర్టిఫికేట్‌లు'
  },
  'worker.jobCard': {
    en: 'Job Cards',
    hi: 'जॉब कार्ड',
    ml: 'ജോബ് കാർഡുകൾ',
    ta: 'வேலை அட்டைகள்',
    kn: 'ಜಾಬ್ ಕಾರ್ಡ್‌ಗಳು',
    te: 'జాబ్ కార్డ్‌లు'
  },
  'worker.branding': {
    en: 'Branding & Advertising',
    hi: 'ब्रांडिंग और विज्ञापन',
    ml: 'ബ്രാൻഡിംഗും പരസ്യവും',
    ta: 'பிராண்டிங் மற்றும் விளம்பரம்',
    kn: 'ಬ್ರಾಂಡಿಂಗ್ ಮತ್ತು ಜಾಹೀರಾತು',
    te: 'బ్రాండింగ్ మరియు అడ్వర్టైజింగ్'
  },
  'worker.mileage': {
    en: 'Mileage Balancing',
    hi: 'माइलेज संतुलन',
    ml: 'മൈലേജ് ബാലൻസിംഗ്',
    ta: 'மைலேஜ் சமநிலை',
    kn: 'ಮೈಲೇಜ್ ಬ್ಯಾಲೆನ್ಸಿಂಗ್',
    te: 'మైలేజ్ బ్యాలెన్సింగ్'
  },
  'worker.cleaning': {
    en: 'Cleaning & Detailing',
    hi: 'सफाई और विवरण',
    ml: 'ക്ലീനിംഗും വിശദാംശങ്ങളും',
    ta: 'சுத்தம் மற்றும் விவரம்',
    kn: 'ಸ್ವಚ್ಛತೆ ಮತ್ತು ವಿವರ',
    te: 'క్లీనింగ్ మరియు డిటైలింగ్'
  },
  'worker.stabling': {
    en: 'Stabling Geometry',
    hi: 'स्टेबलिंग ज्यामिति',
    ml: 'സ്റ്റേബ്ലിംഗ് ജ്യാമിതി',
    ta: 'ஸ்டேபிளிங் வடிவவியல்',
    kn: 'ಸ್ಟೇಬ್ಲಿಂಗ್ ರೇಖಾಗಣಿತ',
    te: 'స్టేబ్లింగ్ జ్యామితి'
  },

  // Performance & Gamification
  'performance.score': {
    en: 'Performance Score',
    hi: 'प्रदर्शन स्कोर',
    ml: 'പ്രകടന സ്കോർ',
    ta: 'செயல்திறன் மதிப்பெண்',
    kn: 'ಕಾರ್ಯಕ್ಷಮತೆ ಸ್ಕೋರ್',
    te: 'పనితీరు స్కోర్'
  },
  'performance.level': {
    en: 'Level {level}',
    hi: 'स्तर {level}',
    ml: 'ലെവൽ {level}',
    ta: 'நிலை {level}',
    kn: 'ಹಂತ {level}',
    te: 'స్థాయి {level}'
  },
  'performance.achievements': {
    en: 'Achievements',
    hi: 'उपलब्धियां',
    ml: 'നേട്ടങ്ങൾ',
    ta: 'சாதனைகள்',
    kn: 'ಸಾಧನೆಗಳು',
    te: 'విజయాలు'
  },
  'performance.badges': {
    en: 'Badges Earned',
    hi: 'अर्जित बैज',
    ml: 'നേടിയ ബാഡ്ജുകൾ',
    ta: 'பெற்ற பதக்கங்கள்',
    kn: 'ಗಳಿಸಿದ ಬ್ಯಾಡ್ಜ್‌ಗಳು',
    te: 'పొందిన బ్యాడ್జీలు'
  },

  // Languages
  'lang.english': {
    en: 'English',
    hi: 'अंग्रेजी',
    ml: 'ഇംഗ്ലീഷ്',
    ta: 'ஆங்கிலம்',
    kn: 'ಇಂಗ್ಲೀಷ್',
    te: 'ఇంగ్లీష్'
  },
  'lang.hindi': {
    en: 'हिन्दी',
    hi: 'हिन्दी',
    ml: 'ഹിന്ദി',
    ta: 'இந்தி',
    kn: 'ಹಿಂದಿ',
    te: 'హిందీ'
  },
  'lang.malayalam': {
    en: 'മലയാളം',
    hi: 'मलयालम',
    ml: 'മലയാളം',
    ta: 'மலையாளம்',
    kn: 'ಮಲಯಾಳಂ',
    te: 'మలయాళం'
  },
  'lang.tamil': {
    en: 'தமிழ்',
    hi: 'तमिल',
    ml: 'തമിഴ്',
    ta: 'தமிழ்',
    kn: 'ತಮಿಳು',
    te: 'తమిళం'
  },
  'lang.kannada': {
    en: 'ಕನ್ನಡ',
    hi: 'कन्नड़',
    ml: 'കന്നഡ',
    ta: 'கன்னடம்',
    kn: 'ಕನ್ನಡ',
    te: 'కన్నడ'
  },
  'lang.telugu': {
    en: 'తెలుగు',
    hi: 'तेलुगू',
    ml: 'തെലുഗു',
    ta: 'தெலுங்கு',
    kn: 'ತೆಲುಗು',
    te: 'తెలుగు'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('metro-language');
    return (stored as Language) || 'en';
  });

  const isRTL = false; // None of our supported languages are RTL

  useEffect(() => {
    localStorage.setItem('metro-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[key]?.[language] || translations[key]?.['en'] || key;
    
    // Replace parameters in text
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, String(value));
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};