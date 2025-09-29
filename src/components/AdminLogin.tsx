import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Shield, ArrowLeft, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface AdminLoginProps {
  onLogin: (type: string, category?: string, email?: string) => void;
  onBack: () => void;
}

// Authorized admin emails (in production, this would be managed in the backend)
const AUTHORIZED_ADMIN_EMAILS = [
  'admin@kochimetro.com',
  'director@kochimetro.com',
  'operations@kochimetro.com',
  'fleet.manager@kochimetro.com',
  'superintendent@kochimetro.com'
];

export function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'google'>('email');
  const [errors, setErrors] = useState<{ email?: string; password?: string; auth?: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isAuthorizedAdmin = (email: string): boolean => {
    return AUTHORIZED_ADMIN_EMAILS.includes(email.toLowerCase());
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    // Validation
    const newErrors: { email?: string; password?: string; auth?: string } = {};

    if (!email) {
      newErrors.email = t('Email is required');
    } else if (!validateEmail(email)) {
      newErrors.email = t('Please enter a valid email address');
    } else if (!isAuthorizedAdmin(email)) {
      newErrors.auth = t('Access denied. This email is not authorized for admin access.');
    }

    if (!password) {
      newErrors.password = t('Password is required');
    } else if (password.length < 8) {
      newErrors.password = t('Password must be at least 8 characters');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In production, this would verify against backend authentication
    if (email && password && isAuthorizedAdmin(email)) {
      toast.success(t('Admin login successful'), {
        description: t('Welcome to Kochi Metro Fleet Management System')
      });
      onLogin('admin', 'administrator', email);
    } else {
      setErrors({ auth: t('Invalid credentials or unauthorized access') });
    }

    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      // Simulate Google OAuth process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock Google response with admin email
      const mockGoogleEmail = 'admin@kochimetro.com';
      
      if (isAuthorizedAdmin(mockGoogleEmail)) {
        toast.success(t('Google authentication successful'), {
          description: t('Welcome to Kochi Metro Fleet Management System')
        });
        onLogin('admin', 'administrator', mockGoogleEmail);
      } else {
        setErrors({ auth: t('This Google account is not authorized for admin access') });
      }
    } catch (error) {
      setErrors({ auth: t('Google authentication failed. Please try again.') });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Blurred Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&h=1080&fit=crop"
          alt="Kochi Metro Station"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageSelector />
      </div>

      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="absolute top-6 left-6 z-10 text-white hover:bg-white/20 backdrop-blur-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t('Back')}
      </Button>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="bg-white/95 backdrop-blur-lg border border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t('Administrator Portal')}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {t('Secure access to Kochi Metro Fleet Management System')}
            </CardDescription>
            <Badge variant="outline" className="w-fit mx-auto mt-2 border-blue-200 text-blue-700">
              {t('High Security Zone')}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Login Method Toggle */}
            <div className="flex rounded-lg bg-gray-100 p-1">
              <Button
                type="button"
                variant={loginMethod === 'email' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLoginMethod('email')}
                className="flex-1 text-sm"
              >
                <Mail className="w-4 h-4 mr-2" />
                {t('Email Login')}
              </Button>
              <Button
                type="button"
                variant={loginMethod === 'google' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLoginMethod('google')}
                className="flex-1 text-sm"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {t('Google')}
              </Button>
            </div>

            {/* Error Alert */}
            {errors.auth && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.auth}</AlertDescription>
              </Alert>
            )}

            {loginMethod === 'email' ? (
              /* Email Login Form */
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t('Administrator Email')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@kochimetro.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${errors.email ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    {t('Password')}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t('Enter your password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${errors.password ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t('Authenticating...')}
                    </div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      {t('Secure Login')}
                    </>
                  )}
                </Button>
              </form>
            ) : (
              /* Google Login Button */
              <div className="space-y-4">
                <Button 
                  onClick={handleGoogleLogin}
                  className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                      {t('Authenticating...')}
                    </div>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      {t('Continue with Google')}
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Security Notice */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center text-blue-700 text-sm">
                <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{t('This portal uses enterprise-grade security for authorized personnel only')}</span>
              </div>
            </div>

            {/* Authorized Emails Info */}
            <div className="text-xs text-gray-500 text-center">
              {t('Only authorized Kochi Metro email addresses can access this portal')}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}