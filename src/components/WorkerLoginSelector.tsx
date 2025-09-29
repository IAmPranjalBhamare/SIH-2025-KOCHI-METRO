import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Train, Shield, Wrench, Calendar, Zap, MapPin, ArrowLeft, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WorkerLoginSelectorProps {
  onSelectCategory: (category: string) => void;
  onBack?: () => void;
}

const workerCategories = [
  {
    id: 'fitness-certificates',
    name: 'Fitness Certificates',
    description: 'Safety Inspector Portal',
    icon: Shield,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-500/30',
    roles: ['Safety Inspector', 'Quality Inspector', 'Safety Manager']
  },
  {
    id: 'job-cards',
    name: 'Job-Card Status',
    description: 'Maintenance Coordinator Portal',
    icon: Wrench,
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    borderColor: 'border-orange-500/30',
    roles: ['Job Card Coordinator', 'Maintenance Supervisor', 'Workshop Lead']
  },
  {
    id: 'branding',
    name: 'Branding Priorities',
    description: 'Marketing Specialist Portal',
    icon: Zap,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-500/30',
    roles: ['Branding Specialist', 'Marketing Manager', 'Creative Director']
  },
  {
    id: 'mileage-balancing',
    name: 'Mileage Balancing',
    description: 'Operations Analyst Portal',
    icon: Train,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-500/30',
    roles: ['Mileage Analyst', 'Operations Controller', 'Fleet Optimizer']
  },
  {
    id: 'cleaning-detailing',
    name: 'Cleaning & Detailing',
    description: 'Hygiene Specialist Portal',
    icon: Calendar,
    color: 'from-green-500 to-lime-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    borderColor: 'border-green-500/30',
    roles: ['Cleaning Specialist', 'Hygiene Manager', 'Detailing Expert']
  },
  {
    id: 'stabling-geometry',
    name: 'Stabling Geometry',
    description: 'Engineering Specialist Portal',
    icon: MapPin,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
    borderColor: 'border-pink-500/30',
    roles: ['Geometry Engineer', 'Depot Manager', 'Track Engineer']
  }
];

const backgroundImages = [
  "https://images.unsplash.com/photo-1646465579986-a802cbc36ab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb2NoaSUyMG1ldHJvJTIwdHJhaW4lMjBrZXJhbGElMjBtb2Rlcm58ZW58MXx8fHwxNzU2NTQzNDU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1704365159747-1f7b8913044f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU2NTAzMDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1665202839133-2ed694720107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBjb2NvbnV0JTIwcGFsbSUyMHRyZWVzfGVufDF8fHx8MTc1NjU0MDk4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
];

export function WorkerLoginSelector({ onSelectCategory, onBack }: WorkerLoginSelectorProps) {
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
        {[...Array(8)].map((_, i) => (
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
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          onClick={onBack}
          className="absolute top-6 left-6 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 text-white hover:text-blue-200 border border-white/20 hover:border-white/40 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
      )}

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6">
            <Users className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-4xl text-white mb-4">
            {t('Worker Portal Selection')}
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            {t('Choose your department to access specialized tools and dashboards')}
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              {t('Role-Based Access')}
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              {t('Specialized Tools')}
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              {t('Department-Specific')}
            </Badge>
          </div>
        </motion.div>

        {/* Worker Category Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl"
        >
          {workerCategories.map((category, index) => {
            const IconComponent = category.icon;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 * index, 
                  ease: "easeOut" 
                }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
                onClick={() => onSelectCategory(category.id)}
              >
                <Card className={`h-full bg-gray-900/95 ${category.borderColor} backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300 group-hover:border-opacity-60`}>
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + (0.1 * index), duration: 0.5 }}
                      className={`mx-auto w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </motion.div>
                    
                    <CardTitle className="text-xl text-white group-hover:text-blue-200 transition-colors duration-300">
                      {t(category.name)}
                    </CardTitle>
                    <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      {t(category.description)}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Roles */}
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">{t('Authorized Roles')}:</p>
                      <div className="space-y-1">
                        {category.roles.map((role, roleIndex) => (
                          <div key={roleIndex} className="text-xs text-gray-300 flex items-center">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                            {t(role)}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Login Button */}
                    <Button
                      className={`w-full bg-gradient-to-r ${category.color} hover:opacity-90 text-white transition-all duration-300 transform group-hover:scale-[1.02]`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCategory(category.id);
                      }}
                    >
                      {t('Access Portal')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center text-gray-400 mt-12 space-y-2"
        >
          <p className="text-sm">
            {t('Each portal provides specialized tools and AI assistance for your department')}
          </p>
          <p className="text-xs">
            {t('Kochi Metro Rail Limited - Unified Worker Management System')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}