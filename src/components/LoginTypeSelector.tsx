import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Train, Shield, Users, ArrowLeft, Briefcase, Settings, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginTypeSelectorProps {
  onSelectAdmin: () => void;
  onSelectWorker: () => void;
  onBack?: () => void;
}

const backgroundImages = [
  "https://images.unsplash.com/photo-1646465579986-a802cbc36ab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb2NoaSUyMG1ldHJvJTIwdHJhaW4lMjBrZXJhbGElMjBtb2Rlcm58ZW58MXx8fHwxNzU2NTQzNDU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1704365159747-1f7b8913044f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU2NTAzMDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1665202839133-2ed694720107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBjb2NvbnV0JTIwcGFsbSUyMHRyZWVzfGVufDF8fHx8MTc1NjU0MDk4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
];

export function LoginTypeSelector({ onSelectAdmin, onSelectWorker, onBack }: LoginTypeSelectorProps) {
  const { t } = useLanguage();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={backgroundImages[currentBgIndex]}
              alt="Kochi Metro background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-indigo-900/95 backdrop-blur-sm" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0.5,
              opacity: 0.2
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0.5, 1, 0.5],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Train className="h-6 w-6 text-blue-300/20" />
          </motion.div>
        ))}
      </div>

      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageSelector />
      </div>

      {/* Back Button */}
      {onBack && (
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="absolute top-6 left-6 z-10 text-white hover:bg-white/10 backdrop-blur-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('Back')}
        </Button>
      )}

      {/* Main Content */}
      <div 
        className="min-h-screen flex items-center justify-center p-6 relative z-10"
        style={{
          backgroundImage: `url(${encodeURI('https://images.unsplash.com/photo-1672926639661-404213b93c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRybyUyMHRyYWluJTIwc3RhdGlvbiUyMG1vZGVybiUyMGJyaWdodHxlbnwxfHx8fDE3NTkxNDMzMzB8MA&ixlib=rb-4.1.0&q=80&w=1080')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Blurred overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/70 to-emerald-50/80"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-2xl relative z-20"
        >
          <Card className="bg-white/95 border-blue-200/50 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center pb-6">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6"
              >
                <Train className="h-10 w-10 text-white" />
              </motion.div>
              
              <CardTitle className="text-3xl text-gray-900 mb-2">
                {t('Kochi Metro Login')}
              </CardTitle>
              <CardDescription className="text-gray-700 text-lg">
                {t('Fleet Management System Access')}
              </CardDescription>
              
              <div className="flex flex-wrap gap-3 justify-center mt-6">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-300">
                  <Shield className="w-3 h-3 mr-1" />
                  {t('Secure Access')}
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-300">
                  <Users className="w-3 h-3 mr-1" />
                  {t('Role-Based')}
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-300">
                  <Building className="w-3 h-3 mr-1" />
                  {t('Multi-Department')}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-center mb-8"
              >
                <h3 className="text-xl text-gray-900 mb-2">{t('Select Your Access Level')}</h3>
                <p className="text-gray-600">{t('Choose your role to access the appropriate dashboard and tools')}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Admin Login */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer"
                  onClick={onSelectAdmin}
                >
                  <Card className="h-full bg-gradient-to-br from-blue-50/80 to-indigo-100/80 border-blue-200 hover:border-blue-300 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl">
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <Settings className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-gray-900 text-xl">
                        {t('Administrator')}
                      </CardTitle>
                      <CardDescription className="text-blue-700">
                        {t('System & Operations Management')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-blue-700">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                          {t('Fleet Overview Dashboard')}
                        </div>
                        <div className="flex items-center text-sm text-blue-700">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                          {t('Decision Support System')}
                        </div>
                        <div className="flex items-center text-sm text-blue-700">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                          {t('Maintenance Scheduling')}
                        </div>
                        <div className="flex items-center text-sm text-blue-700">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                          {t('System Administration')}
                        </div>
                      </div>
                      <Button 
                        onClick={onSelectAdmin}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
                      >
                        {t('Admin Login')}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Worker Portal */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer"
                  onClick={onSelectWorker}
                >
                  <Card className="h-full bg-gradient-to-br from-emerald-50/80 to-teal-100/80 border-emerald-200 hover:border-emerald-300 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl">
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <Briefcase className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-gray-900 text-xl">
                        {t('Worker Portal')}
                      </CardTitle>
                      <CardDescription className="text-emerald-700">
                        {t('Department-Specific Access')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-emerald-700">
                          <div className="w-1 h-1 bg-emerald-500 rounded-full mr-2" />
                          {t('Specialized Dashboards')}
                        </div>
                        <div className="flex items-center text-sm text-emerald-700">
                          <div className="w-1 h-1 bg-emerald-500 rounded-full mr-2" />
                          {t('AI-Powered Tools')}
                        </div>
                        <div className="flex items-center text-sm text-emerald-700">
                          <div className="w-1 h-1 bg-emerald-500 rounded-full mr-2" />
                          {t('Performance Analytics')}
                        </div>
                        <div className="flex items-center text-sm text-emerald-700">
                          <div className="w-1 h-1 bg-emerald-500 rounded-full mr-2" />
                          {t('Voice Assistant')}
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg">
                        {t('Worker Login')}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Footer Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-center text-gray-600 mt-8 space-y-2"
              >
                <p className="text-sm">
                  {t('Authorized personnel only. All access is logged and monitored.')}
                </p>
                <p className="text-xs">
                  {t('Kochi Metro Rail Limited - Integrated Fleet Management Platform')}
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}