import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { motion } from 'framer-motion';
import { 
  Train, 
  Shield, 
  Wrench, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  PlayCircle,
  PauseCircle,
  Settings,
  BarChart3,
  Users,
  MapPin,
  Fuel,
  Calendar,
  Bell,
  Brain,
  Mic,
  Trophy,
  List
} from 'lucide-react';
import { FleetOverview } from './FleetOverview';
import { TrainsetDetails } from './TrainsetDetails';
import { MaintenanceSchedule } from './MaintenanceSchedule';
import { DecisionSupport } from './DecisionSupport';
import { TrainInductionList } from './TrainInductionList';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second for live feel
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = {
    totalTrainsets: 25,
    inService: 18,
    onStandby: 4,
    inMaintenance: 3,
    punctuality: 99.2,
    totalMileage: 1847203,
    alertsCount: 3
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        />
        
        {/* Floating geometric shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute w-${32 + i * 16} h-${32 + i * 16} border-2 border-blue-500/20 rounded-full`}
            style={{
              top: `${10 + i * 15}%`,
              right: `${5 + i * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20 relative z-10"
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg"
                >
                  <Train className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-xl bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text text-transparent font-bold"
                  >
                    KMRL Fleet Management
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-sm text-gray-600"
                  >
                    Intelligent Operations Dashboard
                  </motion.p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Clock className="w-4 h-4" />
                </motion.div>
                <span>Last updated: {currentTime.toLocaleTimeString()}</span>
              </motion.div>
              
              {/* Notifications */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="relative"
              >
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative h-10 w-10 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                  onClick={() => {
                    // Toggle notifications dropdown with proper z-index
                    const dropdown = document.getElementById('notifications-dropdown');
                    if (dropdown) {
                      dropdown.classList.toggle('hidden');
                      // Ensure proper z-index when showing
                      if (!dropdown.classList.contains('hidden')) {
                        dropdown.style.zIndex = '9999';
                      }
                    }
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Bell className="w-5 h-5" />
                  </motion.div>
                  
                  {/* Red Dot Indicator */}
                  {stats.alertsCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-full h-full bg-red-500 rounded-full"
                      />
                    </motion.div>
                  )}
                </Button>
                
                {/* Notifications Dropdown */}
                <div 
                  id="notifications-dropdown"
                  className="hidden absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-[9999] overflow-hidden"
                  style={{ zIndex: 9999 }}
                >
                  <div className="p-4 border-b-2 border-orange-200 bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="p-2 bg-white rounded-full shadow-md"
                        >
                          <Bell className="w-5 h-5 text-orange-600" />
                        </motion.div>
                        <h3 className="text-lg font-bold text-gray-900 tracking-wide">
                          System Notifications
                        </h3>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Badge 
                          variant="destructive" 
                          className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 shadow-lg border-2 border-white font-bold"
                        >
                          {stats.alertsCount} Active
                        </Badge>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {/* Sample Notifications */}
                    <div className="p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">Critical Maintenance Alert</p>
                          <p className="text-xs text-gray-600 mt-1">Trainset T-015 requires immediate inspection</p>
                          <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">Scheduled Maintenance Due</p>
                          <p className="text-xs text-gray-600 mt-1">3 trainsets due for routine maintenance</p>
                          <p className="text-xs text-gray-400 mt-1">15 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">System Update</p>
                          <p className="text-xs text-gray-600 mt-1">Fleet management system updated successfully</p>
                          <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">Performance Report</p>
                          <p className="text-xs text-gray-600 mt-1">Weekly fleet performance report available</p>
                          <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 border-t border-gray-100 bg-gray-50">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      View All Notifications
                    </Button>
                  </div>
                </div>
              </motion.div>
              
              {/* Logout */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={onLogout} 
                  className="h-10 w-10 rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
                  title="Logout"
                >
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Quick Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="p-6 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Fleet',
              value: stats.totalTrainsets,
              icon: Train,
              gradient: 'from-blue-500 via-blue-600 to-indigo-700',
              textColor: 'text-blue-100',
              iconColor: 'text-blue-200',
              delay: 0
            },
            {
              title: 'In Service',
              value: stats.inService,
              icon: PlayCircle,
              gradient: 'from-green-500 via-emerald-600 to-teal-700',
              textColor: 'text-green-100',
              iconColor: 'text-green-200',
              delay: 0.1
            },
            {
              title: 'On Standby',
              value: stats.onStandby,
              icon: PauseCircle,
              gradient: 'from-yellow-500 via-orange-500 to-red-600',
              textColor: 'text-yellow-100',
              iconColor: 'text-yellow-200',
              delay: 0.2
            },
            {
              title: 'Maintenance',
              value: stats.inMaintenance,
              icon: Wrench,
              gradient: 'from-purple-500 via-violet-600 to-indigo-700',
              textColor: 'text-purple-100',
              iconColor: 'text-purple-200',
              delay: 0.3
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: stat.delay }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="transform-gpu"
            >
              <Card className={`bg-gradient-to-br ${stat.gradient} text-white shadow-xl border-0 overflow-hidden relative`}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-24 h-24 border border-white/10 rounded-full"
                />
                <CardContent className="p-6 relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: stat.delay + 0.2 }}
                        className={stat.textColor}
                      >
                        {stat.title}
                      </motion.p>
                      <motion.p 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: stat.delay + 0.4, type: "spring", stiffness: 100 }}
                        className="text-3xl font-bold"
                      >
                        {stat.value}
                      </motion.p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <stat.icon className={`w-10 h-10 ${stat.iconColor}`} />
                    </motion.div>
                  </div>
                  
                  {/* Progress indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.value / stats.totalTrainsets) * 100}%` }}
                    transition={{ duration: 1.5, delay: stat.delay + 0.6 }}
                    className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: 'Punctuality KPI',
              icon: Shield,
              iconColor: 'text-green-600',
              gradient: 'from-green-50 to-emerald-100',
              content: (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, type: "spring" }}
                      className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                    >
                      {stats.punctuality}%
                    </motion.span>
                    <Badge 
                      variant={stats.punctuality >= 99.5 ? "default" : "secondary"}
                      className="animate-pulse"
                    >
                      {stats.punctuality >= 99.5 ? "Target Met" : "Below Target"}
                    </Badge>
                  </div>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    style={{ originX: 0 }}
                  >
                    <Progress value={stats.punctuality} className="h-3" />
                  </motion.div>
                  <p className="text-sm text-gray-600">Target: 99.5%</p>
                </div>
              ),
              delay: 0.4
            },
            {
              title: 'Total Mileage',
              icon: Fuel,
              iconColor: 'text-blue-600',
              gradient: 'from-blue-50 to-cyan-100',
              content: (
                <div className="space-y-3">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
                  >
                    {stats.totalMileage.toLocaleString()} km
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </motion.div>
                    <span className="text-sm text-green-600 font-medium">+2.3% this month</span>
                  </motion.div>
                  <p className="text-xs text-gray-600">Balanced across fleet</p>
                </div>
              ),
              delay: 0.5
            },
            {
              title: 'Active Alerts',
              icon: AlertTriangle,
              iconColor: 'text-orange-600',
              gradient: 'from-orange-50 to-red-100',
              content: (
                <div className="space-y-3">
                  {[
                    { color: 'bg-red-500', text: 'T-012: Fitness certificate expires in 3 days - Service suspension imminent', delay: 0.2 },
                    { color: 'bg-yellow-500', text: 'T-007: Scheduled maintenance overdue by 2 days - Immediate attention required', delay: 0.3 },
                    { color: 'bg-orange-500', text: 'T-023: Branding contract expires next week - Revenue impact expected', delay: 0.4 }
                  ].map((alert, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: alert.delay }}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/50 transition-colors"
                    >
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className={`w-3 h-3 ${alert.color} rounded-full`}
                      />
                      <span className="text-sm">{alert.text}</span>
                    </motion.div>
                  ))}
                </div>
              ),
              delay: 0.6
            }
          ].map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: kpi.delay }}
              whileHover={{ y: -3, scale: 1.01 }}
            >
              <Card className={`bg-gradient-to-br ${kpi.gradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative`}>
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -mr-10 -mt-10"
                />
                <CardHeader className="pb-3 relative">
                  <CardTitle className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-2 bg-white/80 rounded-lg shadow-sm"
                    >
                      <kpi.icon className={`w-5 h-5 ${kpi.iconColor}`} />
                    </motion.div>
                    <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                      {kpi.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  {kpi.content}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <TabsList className="grid w-full grid-cols-5 mb-6 bg-white/80 backdrop-blur-md shadow-lg border-0 p-2 rounded-xl">
                {[
                  { value: 'overview', icon: BarChart3, label: 'Fleet Overview', gradient: 'from-blue-500 to-purple-500' },
                  { value: 'induction', icon: List, label: 'Induction List', gradient: 'from-emerald-500 to-green-500' },
                  { value: 'trainsets', icon: Train, label: 'Trainset Details', gradient: 'from-green-500 to-teal-500' },
                  { value: 'maintenance', icon: Wrench, label: 'Maintenance', gradient: 'from-orange-500 to-red-500' },
                  { value: 'decisions', icon: Settings, label: 'Decision Support', gradient: 'from-purple-500 to-indigo-500' }
                ].map((tab, index) => (
                  <motion.div
                    key={tab.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <TabsTrigger 
                      value={tab.value} 
                      className={`gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:${tab.gradient} data-[state=active]:text-white transition-all duration-300 rounded-lg px-4 py-2 font-medium hover:bg-gray-100`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
            </motion.div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          >
            <TabsContent value="overview" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
              >
                <FleetOverview />
              </motion.div>
            </TabsContent>

            <TabsContent value="induction" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
              >
                <TrainInductionList />
              </motion.div>
            </TabsContent>

            <TabsContent value="trainsets" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
              >
                <TrainsetDetails />
              </motion.div>
            </TabsContent>

            <TabsContent value="maintenance" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
              >
                <MaintenanceSchedule />
              </motion.div>
            </TabsContent>

            <TabsContent value="decisions" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
              >
                <DecisionSupport />
              </motion.div>
            </TabsContent>
          </motion.div>
        </Tabs>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
