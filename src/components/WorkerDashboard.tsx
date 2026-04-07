import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Train, 
  Shield, 
  Wrench, 
  Calendar, 
  Zap, 
  MapPin, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Bell,
  Brain,
  Mic,
  LogOut,
  Map
} from 'lucide-react';
import { FitnessCertificatesDashboard } from './worker-dashboards/FitnessCertificatesDashboard';
import { JobCardsDashboard } from './worker-dashboards/JobCardsDashboard';
import { BrandingDashboard } from './worker-dashboards/BrandingDashboard';
import { MileageBalancingDashboard } from './worker-dashboards/MileageBalancingDashboard';
import { CleaningDetailingDashboard } from './worker-dashboards/CleaningDetailingDashboard';
import { StablingGeometryDashboard } from './worker-dashboards/StablingGeometryDashboard';
import { FitnessCertificateAI } from './unique-features/FitnessCertificateAI';
import { JobCardAI } from './unique-features/JobCardAI';
import { BrandingAI } from './unique-features/BrandingAI';
import { MileageBalancingAI } from './unique-features/MileageBalancingAI';
import { CleaningDetailingAI } from './unique-features/CleaningDetailingAI';
import { StablingGeometryAI } from './unique-features/StablingGeometryAI';
import { VoiceCommandInterface } from './unique-features/VoiceCommandInterface';
import { RealTime3DFleetMap } from './unique-features/RealTime3DFleetMap';
import { ImageWithFallback } from './figma/ImageWithFallback';


interface WorkerDashboardProps {
  category: string;
  onLogout: () => void;
}

const categoryInfo = {
  'fitness-certificates': {
    name: 'Fitness Certificates',
    icon: Shield,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    backgroundImage: 'https://images.unsplash.com/photo-1651133008947-3aba55fdb3b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMHNhZmV0eSUyMGluc3BlY3Rpb24lMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc1NjU0MzQ0NXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  'job-cards': {
    name: 'Job-Card Status',
    icon: Wrench,
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    backgroundImage: 'https://images.unsplash.com/photo-1683115099414-c83156978045?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbiUyMG1haW50ZW5hbmNlJTIwd29ya3Nob3AlMjB0b29sc3xlbnwxfHx8fDE3NTY1NDM0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  'branding': {
    name: 'Branding Priorities',
    icon: Zap,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    backgroundImage: 'https://images.unsplash.com/photo-1679761845192-1b61c04055ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxiaWxsYm9hcmQlMjBhZHZlcnRpc2luZyUyMGJ1c2luZXNzJTIwaW5kaWF8ZW58MXx8fHwxNzU2NTQzNDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  'mileage-balancing': {
    name: 'Mileage Balancing',
    icon: Train,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    backgroundImage: 'https://images.unsplash.com/photo-1662748218684-b0f64458c7b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyYWlsd2F5JTIwdHJhY2tzJTIwc3BlZWRvbWV0ZXIlMjBtb2Rlcm58ZW58MXx8fHwxNzU2NTQzNDUwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  'cleaning-detailing': {
    name: 'Cleaning & Detailing',
    icon: Calendar,
    color: 'from-green-500 to-lime-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    backgroundImage: 'https://images.unsplash.com/photo-1747659362772-3caabc37c579?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjbGVhbmluZyUyMGVxdWlwbWVudCUyMGluZHVzdHJpYWwlMjBoeWdpZW5lfGVufDF8fHx8MTc1NjU0MzQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  'stabling-geometry': {
    name: 'Stabling Geometry',
    icon: MapPin,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
    backgroundImage: 'https://images.unsplash.com/photo-1579178893849-3bd2a3f3b6be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0cmFpbiUyMGRlcG90JTIwcmFpbHdheSUyMHlhcmQlMjBnZW9tZXRyeXxlbnwxfHx8fDE3NTY1NDM0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
};

export function WorkerDashboard({ category, onLogout }: WorkerDashboardProps) {
  const { t } = useLanguage();
  const categoryData = categoryInfo[category];
  
  // Check if categoryData exists, fallback to default if not
  if (!categoryData) {
    console.error(`Unknown worker category: ${category}`);
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-96 text-center">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Unknown worker category: {category}</p>
            <Button onClick={onLogout} variant="outline">
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const IconComponent = categoryData.icon;
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderCategoryDashboard = () => {
    switch (category) {
      case 'fitness-certificates':
        return <FitnessCertificatesDashboard />;
      case 'job-cards':
        return <JobCardsDashboard />;
      case 'branding':
        return <BrandingDashboard />;
      case 'mileage-balancing':
        return <MileageBalancingDashboard />;
      case 'cleaning-detailing':
        return <CleaningDetailingDashboard />;
      case 'stabling-geometry':
        return <StablingGeometryDashboard />;
      default:
        return <div>Category not found</div>;
    }
  };

  const renderCategoryAI = () => {
    switch (category) {
      case 'fitness-certificates':
        return <FitnessCertificateAI />;
      case 'job-cards':
        return <JobCardAI />;
      case 'branding':
        return <BrandingAI />;
      case 'mileage-balancing':
        return <MileageBalancingAI />;
      case 'cleaning-detailing':
        return <CleaningDetailingAI />;
      case 'stabling-geometry':
        return <StablingGeometryAI />;
      default:
        return <div>AI features not available for this category</div>;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden"
    >
      {/* Category-specific Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={categoryData.backgroundImage}
            alt={`${categoryData.name} Background`}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                rotate: 360,
                scale: [1, 1.3, 1],
                opacity: [0.02, 0.08, 0.02]
              }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute w-${24 + i * 8} h-${24 + i * 8} border-2 rounded-full`}
              style={{
                top: `${15 + i * 20}%`,
                right: `${10 + i * 15}%`,
                borderColor: categoryData.textColor.replace('text-', '').replace('-600', '')
              }}
            />
          ))}
          
          <motion.div
            animate={{ y: [-30, 30, -30], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-10"
          >
            <IconComponent className={`w-12 h-12 ${categoryData.textColor}/10`} />
          </motion.div>
        </div>
      </div>
      
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/95 backdrop-blur-md shadow-sm border-b relative z-10"
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 bg-gradient-to-r ${categoryData.color} rounded-lg shadow-lg`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl text-gray-900"
                  >
                    {categoryData.name} Dashboard
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-sm text-gray-600"
                  >
                    കൊച്ചി മെട്രോ • Operations Worker Portal
                  </motion.p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageSelector variant="header" />
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Clock className="w-4 h-4" />
                </motion.div>
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Button variant="outline" className="gap-2 relative">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Bell className="w-4 h-4" />
                  </motion.div>
                  <Badge variant="destructive" className="ml-1">2</Badge>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <Button variant="outline" onClick={onLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  {t('common.logout')}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content with Enhanced Features */}
      <div className="flex-1 relative z-10">
        {/* Main Dashboard Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 p-6"
        >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/90 backdrop-blur-md shadow-lg border-0 p-2 rounded-xl">
              <TabsTrigger 
                value="dashboard" 
                className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 rounded-lg px-3 py-2"
              >
                <IconComponent className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="ai-features" 
                className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 rounded-lg px-3 py-2"
              >
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">AI Features</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="voice" 
                className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-teal-500 data-[state=active]:text-white transition-all duration-300 rounded-lg px-3 py-2"
              >
                <Mic className="w-4 h-4" />
                <span className="hidden sm:inline">Voice</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="3d-map" 
                className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300 rounded-lg px-3 py-2"
              >
                <Map className="w-4 h-4" />
                <span className="hidden sm:inline">3D Map</span>
              </TabsTrigger>
              

            </TabsList>
          </motion.div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          >
            <TabsContent value="dashboard" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
              >
                {renderCategoryDashboard()}
              </motion.div>
            </TabsContent>

            <TabsContent value="ai-features" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
              >
                {renderCategoryAI()}
              </motion.div>
            </TabsContent>

            <TabsContent value="voice" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
              >
                <VoiceCommandInterface />
              </motion.div>
            </TabsContent>

            <TabsContent value="3d-map" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
              >
                <RealTime3DFleetMap />
              </motion.div>
            </TabsContent>


          </motion.div>
        </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
}
