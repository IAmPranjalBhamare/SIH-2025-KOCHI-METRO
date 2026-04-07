import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { LanguageSelector } from '../LanguageSelector';
import { useLanguage } from '../../contexts/LanguageContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Calendar, ArrowLeft, Mail, CheckCircle, XCircle, AlertTriangle, Lock, Eye, EyeOff, User, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CleaningDetailingLoginProps {
  onLogin: (userType: string, category?: string, userEmail?: string) => void;
  onBack?: () => void;
}

// Authorized email addresses for Cleaning & Detailing workers
const AUTHORIZED_EMAILS = {
  'cleaning.lead@kochimetro.com': { role: 'Cleaning Specialist', department: 'Operations' },
  'cleaning.supervisor@kochimetro.com': { role: 'Cleaning Supervisor', department: 'Operations' },
  'detailing.expert@kochimetro.com': { role: 'Detailing Expert', department: 'Operations' },
  'hygiene.manager@kochimetro.com': { role: 'Hygiene Manager', department: 'Operations' },
  'cleaning.coordinator@kochimetro.com': { role: 'Cleaning Coordinator', department: 'Operations' },
  'demo.cleaning@gmail.com': { role: 'Demo Cleaning Worker', department: 'Demo' }
};

const backgroundImages = [
  "https://images.unsplash.com/photo-1747659362772-3caabc37c579?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjbGVhbmluZyUyMGVxdWlwbWVudCUyMGluZHVzdHJpYWwlMjBoeWdpZW5lfGVufDF8fHx8MTc1NjU0MzQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHNlcnZpY2UlMjBwcm9mZXNzaW9uYWwlMjB3b3JrZXJ8ZW58MXx8fHwxNzU2NTQzNDUzfDA&ixlib=rb-4.1.0&q=80&w=1080"
];

export function CleaningDetailingLogin({ onLogin, onBack }: CleaningDetailingLoginProps) {
  const { t } = useLanguage();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // Simulate Google OAuth flow
    setTimeout(() => {
      const email = 'cleaning.lead@kochimetro.com'; // Demo email
      if (AUTHORIZED_EMAILS[email]) {
        setLoginStatus('success');
        setTimeout(() => {
          onLogin('worker', 'cleaning-detailing', email);
        }, 1500);
      } else {
        setLoginStatus('error');
        setErrorMessage('Access denied. Please contact your administrator.');
        setIsLoading(false);
      }
    }, 2000);
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const emailKey = userEmail.toLowerCase();
      if (AUTHORIZED_EMAILS[emailKey]) {
        setLoginStatus('success');
        setTimeout(() => {
          onLogin('worker', 'cleaning-detailing', userEmail);
        }, 1500);
      } else {
        setLoginStatus('error');
        setErrorMessage('Invalid credentials or unauthorized access.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-900 via-lime-800 to-emerald-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={backgroundImages[currentBgIndex]}
              alt="Cleaning and hygiene background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-lime-800/80 to-emerald-900/90 backdrop-blur-sm" />
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
              opacity: 0.3
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Calendar className="h-8 w-8 text-green-300/30" />
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
      <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="bg-gray-900/95 border-green-500/30 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center pb-6">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-lime-600 rounded-full flex items-center justify-center mb-4"
              >
                <Calendar className="h-8 w-8 text-white" />
              </motion.div>
              
              <CardTitle className="text-2xl text-white mb-2">
                {t('Cleaning & Detailing')}
              </CardTitle>
              <CardDescription className="text-green-200">
                {t('Hygiene Specialist Portal')}
              </CardDescription>
              
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                  {t('Hygiene Management')}
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                  {t('Cleaning Operations')}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Google OAuth Login */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-100 text-gray-900 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  {t('Continue with Google')}
                </Button>
              </motion.div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-green-500/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-green-300">{t('or')}</span>
                </div>
              </div>

              {/* Manual Login Form */}
              <motion.form
                onSubmit={handleManualLogin}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-green-200">
                    {t('Work Email')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-green-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.name@kochimetro.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="pl-10 bg-gray-800/50 border-green-500/30 text-white placeholder-gray-400 focus:border-green-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-green-200">
                    {t('Password')}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-green-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-gray-800/50 border-green-500/30 text-white placeholder-gray-400 focus:border-green-400"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-2 h-6 w-6 p-0 text-green-400 hover:text-green-300"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-lime-600 hover:from-green-600 hover:to-lime-700 text-white transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : null}
                  {t('Sign In')}
                </Button>
              </motion.form>

              {/* Status Messages */}
              <AnimatePresence>
                {loginStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center text-green-400 space-x-2"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>{t('Login successful! Redirecting...')}</span>
                  </motion.div>
                )}

                {loginStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center text-red-400 space-x-2"
                  >
                    <XCircle className="h-5 w-5" />
                    <span className="text-sm">{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Authorized Users Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
              >
                <div className="flex items-center text-green-300 mb-2">
                  <User className="h-4 w-4 mr-2" />
                  <span className="text-sm">{t('Authorized Roles')}</span>
                </div>
                <div className="space-y-1 text-xs text-green-400">
                  <div>• {t('Cleaning Specialist')}</div>
                  <div>• {t('Hygiene Manager')}</div>
                  <div>• {t('Detailing Expert')}</div>
                </div>
              </motion.div>

              {/* Footer */}
              <div className="text-center text-xs text-green-300/70 space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{t('Round-the-clock hygiene maintenance')}</span>
                </div>
                <div>{t('Kochi Metro Rail Limited - Operations Division')}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
