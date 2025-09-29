import React from 'react';
import { motion } from 'motion/react';
import { Globe, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useLanguage, Language } from '../contexts/LanguageContext';

const languages = [
  { code: 'en' as Language, name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ml' as Language, name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'ta' as Language, name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'kn' as Language, name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'te' as Language, name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
];

interface LanguageSelectorProps {
  variant?: 'header' | 'footer' | 'standalone';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'header',
  className = ''
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant === 'header' ? 'ghost' : 'outline'}
          size="sm"
          className={`gap-2 ${className}`}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {currentLanguage?.nativeName || 'English'}
          </span>
          <span className="text-xs opacity-70">
            {currentLanguage?.flag}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="end">
        <div className="p-2">
          <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
            Select Language
          </div>
          <div className="space-y-1">
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                className={`w-full flex items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors ${
                  language === lang.code ? 'bg-accent text-accent-foreground' : ''
                }`}
                onClick={() => handleLanguageChange(lang.code)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{lang.nativeName}</div>
                  <div className="text-xs opacity-60">{lang.name}</div>
                </div>
                {language === lang.code && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};