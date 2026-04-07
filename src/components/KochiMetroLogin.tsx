import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Train, 
  Shield, 
  Users, 
  ArrowLeft, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Building, 
  Sparkles,
  Globe,
  Clock,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface KochiMetroLoginProps {
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

export function KochiMetroLogin({ onLogin, onBack }: KochiMetroLoginProps) {
  const { t } = useLanguage();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  
  // Login credentials
  const [credentials, setCredentials] = useState({
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate email authorization
    const normalizedEmail = credentials.email.toLowerCase().trim();
    const authInfo = AUTHORIZED_EMAILS[normalizedEmail as keyof typeof AUTHORIZED_EMAILS];
    
    if (!authInfo) {
      setIsAuthorized(false);
      setUserInfo({ email: normalizedEmail });
      setIsLoading(false);
      return;
    }

    // Additional validation for credentials
    if (!credentials.password || credentials.password.length < 6) {
      alert('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (!credentials.employeeId || !credentials.employeeId.match(/^KMRL-\d{4}-\d{4}$/)) {
      alert('Employee ID must follow format: KMRL-XXXX-XXXX');
      setIsLoading(false);
      return;
    }

    if (!credentials.department) {
      alert('Department selection is required');
      setIsLoading(false);
      return;
    }

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsAuthorized(true);
    setUserInfo({ email: normalizedEmail, ...authInfo });
    
    // Auto-login after 2 seconds
    setTimeout(() => {
      onLogin(authInfo.type, authInfo.category, normalizedEmail);
    }, 2000);
    
    setIsLoading(false);
  };

  const resetAuth = () => {
    setIsAuthorized(null);
    setUserInfo(null);
    setCredentials({
      email: '',
      password: '',
      employeeId: '',
      department: ''
    });
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
              alt="Kerala Backwaters"
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
            {/* Header Gradient */}
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
                className="flex gap-2 justify-center mb-4 flex-wrap"
              >
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                  <Shield className="w-3 h-3 mr-1" />
                  Secure Access
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                  <Globe className="w-3 h-3 mr-1" />
                  Multi-Language
                </Badge>
                <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                  <Star className="w-3 h-3 mr-1" />
                  Professional
                </Badge>
              </motion.div>
            </CardHeader>

            <CardContent>
              <AnimatePresence mode="wait">
                {!isAuthorized && (
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
                        Access restricted to authorized Kochi Metro employees
                      </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      {/* Email Field */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@kochimetro.com"
                          value={credentials.email}
                          onChange={(e) => setCredentials({ 
                            ...credentials, 
                            email: e.target.value 
                          })}
                          className="h-12 bg-white/70 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                          required
                        />
                      </div>

                      {/* Password Field */}
                      <div className="space-y-2">
                        <Label htmlFor="password" className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Password *
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ 
                              ...credentials, 
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
                          <User className="w-4 h-4" />
                          Employee ID *
                        </Label>
                        <Input
                          id="employee-id"
                          type="text"
                          placeholder="KMRL-XXXX-XXXX"
                          value={credentials.employeeId}
                          onChange={(e) => {
                            const value = e.target.value.toUpperCase();
                            setCredentials({ 
                              ...credentials, 
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
                          value={credentials.department}
                          onChange={(e) => setCredentials({ 
                            ...credentials, 
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
                          <option value="marketing">Marketing</option>
                        </select>
                      </div>

                      {/* Submit Button */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          disabled={isLoading || !credentials.email || !credentials.password || !credentials.employeeId || !credentials.department}
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
                              Verify & Access System
                            </div>
                          )}
                        </Button>
                      </motion.div>
                    </form>

                    {/* Demo Instructions */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-gray-600" />
                        <p className="text-xs text-gray-600">Demo Credentials Available:</p>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-xs text-gray-500">
                        <div className="p-2 bg-white rounded border">
                          <strong>Admin Demo:</strong> demo.admin@gmail.com<br/>
                          <strong>Password:</strong> admin123<br/>
                          <strong>ID:</strong> KMRL-0001-0001
                        </div>
                        <div className="p-2 bg-white rounded border">
                          <strong>Worker Demo:</strong> demo.worker@gmail.com<br/>
                          <strong>Password:</strong> worker123<br/>
                          <strong>ID:</strong> KMRL-0002-0001
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {isAuthorized === true && userInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-4"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <div>
                      <h3 className="text-lg text-gray-800 mb-2">Access Granted</h3>
                      <p className="text-sm text-gray-600 mb-1">{userInfo.role}</p>
                      <p className="text-xs text-gray-500">{userInfo.department}</p>
                      <Badge variant="outline" className="mt-2 bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Authenticated
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Redirecting to dashboard...</p>
                  </motion.div>
                )}

                {isAuthorized === false && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-4"
                  >
                    <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                    <div>
                      <h3 className="text-lg text-red-700 mb-2">Access Denied</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {userInfo?.email} is not authorized to access this system.
                      </p>
                      <Badge variant="destructive" className="mb-4">
                        <XCircle className="w-3 h-3 mr-1" />
                        Unauthorized
                      </Badge>
                      <Button 
                        onClick={resetAuth}
                        variant="outline" 
                        className="w-full"
                      >
                        Try Again
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
