import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Train, Shield, Users, Wrench, Calendar, Zap, MapPin, Waves, Palmtree, Brain, Sparkles, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EnhancedLoginPageProps {
  onLogin: (userType: string, category?: string) => void;
  onBack?: () => void;
}

const workerCategories = [
  {
    id: 'fitness-certificates',
    name: 'Fitness Certificates',
    icon: Shield,
    description: 'Rolling-Stock, Signalling & Telecom clearances',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'job-cards',
    name: 'Job-Card Status',
    icon: Wrench,
    description: 'IBM Maximo work orders management',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'branding',
    name: 'Branding Priorities',
    icon: Zap,
    description: 'Contractual commitments & exposure hours',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'mileage-balancing',
    name: 'Mileage Balancing',
    icon: Train,
    description: 'Kilometre allocation & wear equalization',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'cleaning-detailing',
    name: 'Cleaning & Detailing',
    icon: Calendar,
    description: 'Manpower scheduling & bay occupancy',
    color: 'from-green-500 to-lime-600'
  },
  {
    id: 'stabling-geometry',
    name: 'Stabling Geometry',
    icon: MapPin,
    description: 'Physical bay positions & shunting optimization',
    color: 'from-pink-500 to-rose-600'
  }
];

const backgroundImages = [
  "https://images.unsplash.com/photo-1704365159747-1f7b8913044f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU2NTAzMDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1665202839133-2ed694720107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBjb2NvbnV0JTIwcGFsbSUyMHRyZWVzfGVufDF8fHx8MTc1NjU0MDk4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1646465579986-a802cbc36ab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb2NoaSUyMG1ldHJvJTIwdHJhaW4lMjBrZXJhbGElMjBtb2Rlcm58ZW58MXx8fHwxNzU2NTQzNDU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1593417033920-3c04818ee8a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBob3VzZWJvYXQlMjBiYWNrd2F0ZXIlMjBzdW5zZXR8ZW58MXx8fHwxNzU2NTQ0MTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1658305808448-a799614b0941?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBzcGljZSUyMHBsYW50YXRpb24lMjB0ZWElMjBnYXJkZW5zfGVufDF8fHx8MTc1NjU0NDEzMXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1685677260082-dbec4b1303ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMHRlbXBsZXxlbnwxfHx8fDE3NTY1NDQxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1652372103462-d48b44bddc77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBmaXNoZXJtYW4lMjBib2F0JTIwY29hc3RhbCUyMHN1bnNldHxlbnwxfHx8fDE3NTY1NDQxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1658051161493-1d311c4c7b4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBtb25zb29uJTIwbGFuZHNjYXBlJTIwZ3JlZW4lMjBoaWxsc3xlbnwxfHx8fDE3NTY1NDQxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1633338718293-785082123de7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBkYW5jZSUyMGthdGhha2FsaSUyMHRyYWRpdGlvbmFsJTIwY3VsdHVyZXxlbnwxfHx8fDE3NTY1NDQxNDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
];

export function EnhancedLoginPage({ onLogin, onBack }: EnhancedLoginPageProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    userType: 'admin',
    category: ''
  });
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000); // Slightly faster transition for more variety
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.userType === 'worker' && !credentials.category) {
      alert('Please select your work category');
      return;
    }
    
    setIsLoading(true);
    setLoginAttempts(prev => prev + 1);
    
    // Simulate authentication process with realistic delays
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
    onLogin(credentials.userType, credentials.category);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex relative overflow-hidden"
    >
      {/* Animated Kerala Cultural Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            background: [
              'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))',
              'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
              'linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(168, 85, 247, 0.1))'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={backgroundImages[currentBgIndex]}
              alt="Kerala Background"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Animated Traditional Kerala patterns */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute w-${16 + i * 4} h-${16 + i * 4} border-2 border-emerald-500/20 rounded-full`}
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 10}%`,
                borderColor: `hsla(${160 + i * 40}, 70%, 50%, 0.2)`
              }}
            />
          ))}
          
          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4"
          >
            <Palmtree className="w-8 h-8 text-green-500/30" />
          </motion.div>
          
          <motion.div
            animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 left-1/4"
          >
            <Waves className="w-6 h-6 text-blue-500/30" />
          </motion.div>
        </div>
      </div>

      {/* Left side - Enhanced Kochi Metro Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 items-center justify-center p-8">
        {/* Back Button */}
        {onBack && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={onBack}
            className="absolute top-8 left-8 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group z-30"
          >
            <ArrowLeft className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          </motion.button>
        )}

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center text-white relative z-20"
        >
          <div className="mb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 100 }}
              className="inline-flex items-center gap-4 mb-6"
            >
              <motion.div 
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
              >
                <Train className="w-12 h-12 text-emerald-400" />
              </motion.div>
              <div className="text-left">
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="text-5xl mb-2 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent"
                >
                  കൊച്ചി മെട്രോ
                </motion.h1>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.4 }}
                  className="text-3xl bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent"
                >
                  Kochi Metro
                </motion.h2>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
          >
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="text-2xl mb-4 text-emerald-200"
            >
              Fleet Management System
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="text-lg mb-6 text-white/90"
            >
              Intelligent Train Scheduling & Operations Dashboard
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="grid grid-cols-2 gap-4 text-sm"
            >
              {[
                { icon: Train, color: 'emerald', text: '25 Trainsets' },
                { icon: Shield, color: 'teal', text: '99.5% Target' },
                { icon: Users, color: 'green', text: 'Smart Operations' },
                { icon: MapPin, color: 'cyan', text: '2 Depots' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 2.4 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`bg-${item.color}-500/20 rounded-xl p-4 cursor-pointer`}
                >
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <item.icon className={`w-6 h-6 mx-auto mb-2 text-${item.color}-300`} />
                  </motion.div>
                  <div className={`text-${item.color}-200`}>{item.text}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-md"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md overflow-hidden relative">
              {/* Security Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute top-4 right-4 z-10"
              >
                <Badge className="bg-green-100 text-green-700 border-green-200 gap-1">
                  <Lock className="w-3 h-3" />
                  Secure
                </Badge>
              </motion.div>

              {/* AI Badge */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute top-4 left-4 z-10"
              >
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 gap-1">
                  <Brain className="w-3 h-3" />
                  AI-Powered
                </Badge>
              </motion.div>

            <CardHeader className="text-center pb-4 pt-16">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9, type: "spring", stiffness: 100 }}
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
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                  >
                    KMRL Portal
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                    className="text-sm text-emerald-600 flex items-center gap-1 justify-center"
                  >
                    <Sparkles className="w-3 h-3" />
                    Fleet Operations
                  </motion.p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <CardTitle className="text-2xl text-gray-800 mb-2">Welcome Back</CardTitle>
                <CardDescription className="text-gray-600">
                  Secure access to your intelligent operations dashboard
                </CardDescription>
              </motion.div>
              
              {/* Login Attempts Indicator */}
              {loginAttempts > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 text-xs text-gray-500 flex items-center gap-1 justify-center"
                >
                  <Shield className="w-3 h-3" />
                  Login attempt #{loginAttempts}
                </motion.div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="userType" className="text-gray-700">Role</Label>
                  <Select value={credentials.userType} onValueChange={(value) => 
                    setCredentials({ ...credentials, userType: value, category: '' })}>
                    <SelectTrigger className="h-12 bg-white/70 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          System Administrator
                        </div>
                      </SelectItem>
                      <SelectItem value="worker">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Operations Worker
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {credentials.userType === 'worker' && (
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-gray-700">Work Category</Label>
                    <Select value={credentials.category} onValueChange={(value) => 
                      setCredentials({ ...credentials, category: value })}>
                      <SelectTrigger className="h-12 bg-white/70 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue placeholder="Select your work category" />
                      </SelectTrigger>
                      <SelectContent>
                        {workerCategories.map((category) => {
                          const IconComponent = category.icon;
                          return (
                            <SelectItem key={category.id} value={category.id}>
                              <div className="flex items-center gap-2">
                                <IconComponent className="w-4 h-4" />
                                {category.name}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    {credentials.category && (
                      <p className="text-xs text-gray-500 mt-1">
                        {workerCategories.find(c => c.id === credentials.category)?.description}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-700">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="h-12 bg-white/70 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="h-12 bg-white/70 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg disabled:opacity-50"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      'Sign In to Dashboard'
                    )}
                  </Button>
                </motion.div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Demo: admin/admin123 or worker/worker123
                </p>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-8 text-center text-xs text-gray-500"
          >
            <p>© 2024 Kochi Metro Rail Limited. All rights reserved.</p>
            <p className="mt-1">Kerala's Pride • India's Future</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}