import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Train, Shield, Users, ArrowLeft, Mail, CheckCircle, XCircle, AlertTriangle, Sparkles, Lock, Eye, EyeOff, User, Building, Clock, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GoogleAuthLoginProps {
  onLogin: (userType: string, category?: string, userEmail?: string) => void;
  onBack?: () => void;
}

// Authorized email addresses with their roles
const AUTHORIZED_EMAILS = {
  // System Administrators
  'admin@kochimetro.com': { type: 'admin', role: 'System Administrator', department: 'IT Operations' },
  'ops.manager@kochimetro.com': { type: 'admin', role: 'Operations Manager', department: 'Operations Control' },
  'fleet.admin@kochimetro.com': { type: 'admin', role: 'Fleet Administrator', department: 'Rolling Stock' },
  
  // Operations Workers
  'maintenance.supervisor@kochimetro.com': { type: 'worker', category: 'job-cards', role: 'Maintenance Supervisor', department: 'Maintenance' },
  'cleaning.lead@kochimetro.com': { type: 'worker', category: 'cleaning-detailing', role: 'Cleaning Specialist', department: 'Operations' },
  'fitness.inspector@kochimetro.com': { type: 'worker', category: 'fitness-certificates', role: 'Safety Inspector', department: 'Safety & Quality' },
  'jobcard.coordinator@kochimetro.com': { type: 'worker', category: 'job-cards', role: 'Job Card Coordinator', department: 'Maintenance' },
  'mileage.analyst@kochimetro.com': { type: 'worker', category: 'mileage-balancing', role: 'Mileage Analyst', department: 'Operations' },
  'branding.specialist@kochimetro.com': { type: 'worker', category: 'branding', role: 'Branding Specialist', department: 'Marketing' },
  'geometry.engineer@kochimetro.com': { type: 'worker', category: 'stabling-geometry', role: 'Geometry Engineer', department: 'Engineering' },
  
  // Demo accounts for testing
  'demo.admin@gmail.com': { type: 'admin', role: 'Demo Administrator', department: 'Demo' },
  'demo.worker@gmail.com': { type: 'worker', category: 'fitness-certificates', role: 'Demo Worker', department: 'Demo' }
};

const backgroundImages = [
  "https://images.unsplash.com/photo-1646465579986-a802cbc36ab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb2NoaSUyMG1ldHJvJTIwdHJhaW4lMjBrZXJhbGElMjBtb2Rlcm58ZW58MXx8fHwxNzU2NTQzNDU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1704365159747-1f7b8913044f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU2NTAzMDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1665202839133-2ed694720107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBjb2NvbnV0JTIwcGFsbSUyMHRyZWVzfGVufDF8fHx8MTc1NjU0MDk4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
];

export function GoogleAuthLogin({ onLogin, onBack }: GoogleAuthLoginProps) {
  const { t } = useLanguage();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [activeTab, setActiveTab] = useState('google');
  const [showPassword, setShowPassword] = useState(false);
  
  // Manual login credentials
  const [manualCredentials, setManualCredentials] = useState({
    email: '',
    password: '',
    employeeId: '',
    department: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate Google OAuth (in real implementation, you'd use Google's OAuth library)
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, show email input
    setShowEmailInput(true);
    setIsLoading(false);
  };

  const handleEmailSubmit = (email: string) => {
    const normalizedEmail = email.toLowerCase().trim();
    const authInfo = AUTHORIZED_EMAILS[normalizedEmail as keyof typeof AUTHORIZED_EMAILS];
    
    if (authInfo) {
      setIsAuthorized(true);
      setUserInfo({ email: normalizedEmail, ...authInfo });
      setUserEmail(normalizedEmail);
      
      // Auto-login after 2 seconds
      setTimeout(() => {
        onLogin(authInfo.type, authInfo.category, normalizedEmail);
      }, 2000);
    } else {
      setIsAuthorized(false);
      setUserEmail(normalizedEmail);
    }
  };

  const resetAuth = () => {
    setShowEmailInput(false);
    setIsAuthorized(null);
    setUserInfo(null);
    setUserEmail('');
    setManualCredentials({
      email: '',
      password: '',
      employeeId: '',
      department: ''
    });
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate email authorization
    const normalizedEmail = manualCredentials.email.toLowerCase().trim();
    const authInfo = AUTHORIZED_EMAILS[normalizedEmail as keyof typeof AUTHORIZED_EMAILS];
    
    if (!authInfo) {
      setIsAuthorized(false);
      setUserEmail(normalizedEmail);
      setIsLoading(false);
      return;
    }

    // Additional validation for manual login
    if (!manualCredentials.password || manualCredentials.password.length < 6) {
      alert('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (!manualCredentials.employeeId || !manualCredentials.employeeId.match(/^KMRL-\d{4}-\d{4}$/)) {
      alert('Employee ID must follow format: KMRL-XXXX-XXXX');
      setIsLoading(false);
      return;
    }

    if (!manualCredentials.department) {
      alert('Department selection is required');
      setIsLoading(false);
      return;
    }

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsAuthorized(true);
    setUserInfo({ email: normalizedEmail, ...authInfo });
    setUserEmail(normalizedEmail);
    
    // Auto-login after 2 seconds
    setTimeout(() => {
      onLogin(authInfo.type, authInfo.category, normalizedEmail);
    }, 2000);
    
    setIsLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
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
              alt="Kochi Metro Background"
              className="w-full h-full object-cover filter blur-sm brightness-50 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-teal-800/40 to-blue-900/60" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Language Selector */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-6 right-6 z-20"
      >
        <LanguageSelector />
      </motion.div>

      {/* Back Button */}
      {onBack && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          onClick={onBack}
          className="absolute top-6 left-6 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 text-white hover:text-emerald-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
      )}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl overflow-hidden relative">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />
            
            <CardHeader className="text-center pb-4 pt-8">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 100 }}
                className="inline-flex items-center gap-3 mb-4 justify-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg relative"
                >
                  <Train className="w-8 h-8 text-white" />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-emerald-400 rounded-xl"
                  />
                </motion.div>
                <div>
                  <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                  >
                    Kochi Metro
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="text-sm text-gray-600"
                  >
                    Fleet Management System
                  </motion.p>
                </div>
              </motion.div>

              {/* Security Badges */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="flex gap-2 justify-center mb-4"
              >
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                  <Shield className="w-3 h-3 mr-1" />
                  Secure Access
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                  <Mail className="w-3 h-3 mr-1" />
                  Google OAuth
                </Badge>
              </motion.div>
            </CardHeader>

            <CardContent>
              <AnimatePresence mode="wait">
                {!showEmailInput && !isAuthorized && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Security Notice */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <p className="text-sm text-blue-800">Authorized Personnel Only</p>
                      </div>
                      <p className="text-xs text-blue-600">
                        Access restricted to authorized Kochi Metro email addresses
                      </p>
                    </div>

                    {/* Login Method Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="google" className="flex items-center gap-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Google OAuth
                        </TabsTrigger>
                        <TabsTrigger value="manual" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Manual Login
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="google" className="space-y-4">
                        {/* Google Sign In Button */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="w-full h-12 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 shadow-sm"
                          >
                            {isLoading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"
                              />
                            ) : (
                              <div className="flex items-center gap-3">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continue with Google
                              </div>
                            )}
                          </Button>
                        </motion.div>

                        <div className="text-center">
                          <p className="text-xs text-gray-500">
                            Quick and secure authentication with your Google account
                          </p>
                        </div>
                      </TabsContent>

                      <TabsContent value="manual" className="space-y-4">
                        <form onSubmit={handleManualLogin} className="space-y-4">
                          {/* Email Field */}
                          <div className="space-y-2">
                            <Label htmlFor="manual-email" className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              Email Address *
                            </Label>
                            <Input
                              id="manual-email"
                              type="email"
                              placeholder="your.email@kochimetro.com"
                              value={manualCredentials.email}
                              onChange={(e) => setManualCredentials({ 
                                ...manualCredentials, 
                                email: e.target.value 
                              })}
                              className="h-12 bg-white/70 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                              required
                            />
                          </div>

                          {/* Password Field */}
                          <div className="space-y-2">
                            <Label htmlFor="manual-password" className="flex items-center gap-2">
                              <Lock className="w-4 h-4" />
                              Password *
                            </Label>
                            <div className="relative">
                              <Input
                                id="manual-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={manualCredentials.password}
                                onChange={(e) => setManualCredentials({ 
                                  ...manualCredentials, 
                                  password: e.target.value 
                                })}
                                className="h-12 bg-white/70 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 pr-12"
                                required
                                minLength={6}
                              />
                              <motion.button
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </motion.button>
                            </div>
                          </div>

                          {/* Employee ID Field */}
                          <div className="space-y-2">
                            <Label htmlFor="employee-id" className="flex items-center gap-2">
                              <Shield className="w-4 h-4" />
                              Employee ID *
                            </Label>
                            <Input
                              id="employee-id"
                              type="text"
                              placeholder="KMRL-XXXX-XXXX"
                              value={manualCredentials.employeeId}
                              onChange={(e) => {
                                const value = e.target.value.toUpperCase();
                                setManualCredentials({ 
                                  ...manualCredentials, 
                                  employeeId: value 
                                });
                              }}
                              className="h-12 bg-white/70 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 font-mono"
                              pattern="KMRL-[0-9]{4}-[0-9]{4}"
                              maxLength={14}
                              required
                            />
                            <p className="text-xs text-gray-500">Format: KMRL-DEPT-EMPNO</p>
                          </div>

                          {/* Department Selection */}
                          <div className="space-y-2">
                            <Label htmlFor="department" className="flex items-center gap-2">
                              <Building className="w-4 h-4" />
                              Department *
                            </Label>
                            <select
                              id="department"
                              value={manualCredentials.department}
                              onChange={(e) => setManualCredentials({ 
                                ...manualCredentials, 
                                department: e.target.value 
                              })}
                              className="w-full h-12 px-3 bg-white/70 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 outline-none"
                              required
                            >
                              <option value="">Select Department</option>
                              <option value="operations">Operations Control</option>
                              <option value="maintenance">Maintenance Division</option>
                              <option value="it">IT & Systems</option>
                              <option value="safety">Safety & Quality</option>
                              <option value="engineering">Engineering</option>
                              <option value="admin">Administration</option>
                            </select>
                          </div>

                          {/* Submit Button */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              type="submit" 
                              disabled={isLoading || !manualCredentials.email || !manualCredentials.password || !manualCredentials.employeeId || !manualCredentials.department}
                              className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg disabled:opacity-50"
                            >
                              {isLoading ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Shield className="w-5 h-5" />
                                  Verify & Login
                                </div>
                              )}
                            </Button>
                          </motion.div>
                        </form>

                        <div className="text-center">
                          <p className="text-xs text-gray-500">
                            All fields are required for security verification
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* Demo Instructions */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                      <p className="text-xs text-gray-600 mb-2 text-center">Demo Credentials:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-500">
                        <div className="p-2 bg-white rounded border">
                          <strong>Admin Demo:</strong><br/>
                          Email: demo.admin@gmail.com<br/>
                          ID: KMRL-0001-0001<br/>
                          Password: admin123
                        </div>
                        <div className="p-2 bg-white rounded border">
                          <strong>Worker Demo:</strong><br/>
                          Email: demo.worker@gmail.com<br/>
                          ID: KMRL-0002-0001<br/>
                          Password: worker123
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {showEmailInput && isAuthorized === null && (
                  <EmailInputForm onSubmit={handleEmailSubmit} onBack={resetAuth} />
                )}

                {isAuthorized === true && userInfo && (
                  <AuthorizedAccess userInfo={userInfo} />
                )}

                {isAuthorized === false && (
                  <UnauthorizedAccess email={userEmail} onBack={resetAuth} />
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

function EmailInputForm({ onSubmit, onBack }: { onSubmit: (email: string) => void; onBack: () => void }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit(email.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <h3 className="text-lg text-gray-800 mb-2">Google Authentication</h3>
        <p className="text-sm text-gray-600">Enter your authorized email address to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="your.email@kochimetro.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
        </div>
        
        <div className="flex gap-3">
          <Button type="button" onClick={onBack} variant="outline" className="flex-1">
            Back
          </Button>
          <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
            Verify Access
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

function AuthorizedAccess({ userInfo }: { userInfo: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-4"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.6 }}
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      </motion.div>
      
      <div>
        <h3 className="text-lg text-gray-800 mb-2">Access Granted</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Role:</strong> {userInfo.role}</p>
          <p><strong>Department:</strong> {userInfo.department}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-green-600">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm">Redirecting to dashboard...</span>
      </div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full mx-auto"
      />
    </motion.div>
  );
}

function UnauthorizedAccess({ email, onBack }: { email: string; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-4"
    >
      <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      
      <div>
        <h3 className="text-lg text-red-800 mb-2">Access Denied</h3>
        <p className="text-sm text-red-600 mb-4">
          <strong>{email}</strong> is not authorized to access this system
        </p>
        
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-800">Access Requirements</span>
          </div>
          <ul className="text-xs text-red-600 text-left space-y-1">
            <li>• Must use authorized Kochi Metro email address</li>
            <li>• Contact IT administrator for access requests</li>
            <li>• Demo accounts available for testing</li>
          </ul>
        </div>
      </div>

      <Button onClick={onBack} className="w-full bg-gray-600 hover:bg-gray-700">
        Try Different Email
      </Button>
    </motion.div>
  );
}
