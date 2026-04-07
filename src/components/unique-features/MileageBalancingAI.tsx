import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { motion } from 'framer-motion';
import { 
  Train, 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Gauge,
  RotateCcw,
  Target,
  Clock,
  BarChart3,
  Activity,
  Zap,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const mileageData = [
  { trainset: 'T-001', currentMileage: 285000, targetMileage: 280000, variance: 5000, wearLevel: 78, nextRotation: 7 },
  { trainset: 'T-008', currentMileage: 265000, targetMileage: 280000, variance: -15000, wearLevel: 65, nextRotation: 14 },
  { trainset: 'T-015', currentMileage: 295000, targetMileage: 280000, variance: 15000, wearLevel: 85, nextRotation: 3 },
  { trainset: 'T-022', currentMileage: 270000, targetMileage: 280000, variance: -10000, wearLevel: 72, nextRotation: 21 }
];

const wearAnalysis = [
  { component: 'Wheels', wear: 68, prediction: 75, optimal: 70 },
  { component: 'Brake Pads', wear: 82, prediction: 85, optimal: 75 },
  { component: 'Pantograph', wear: 45, prediction: 52, optimal: 50 },
  { component: 'Motors', wear: 71, prediction: 78, optimal: 70 },
  { component: 'Suspension', wear: 63, prediction: 68, optimal: 65 }
];

const rotationOptimization = [
  { week: 'Week 1', efficiency: 92, variance: 8, costSaving: 240000 },
  { week: 'Week 2', efficiency: 89, variance: 12, costSaving: 180000 },
  { week: 'Week 3', efficiency: 95, variance: 5, costSaving: 320000 },
  { week: 'Week 4', efficiency: 91, variance: 9, costSaving: 280000 }
];

const lifecyclePrediction = [
  { trainset: 'T-001', remainingLife: 78, nextMaintenance: 45, replacementCost: 2400000 },
  { trainset: 'T-008', remainingLife: 89, nextMaintenance: 62, replacementCost: 1800000 },
  { trainset: 'T-015', remainingLife: 65, nextMaintenance: 28, replacementCost: 3200000 },
  { trainset: 'T-022', remainingLife: 82, nextMaintenance: 55, replacementCost: 2100000 }
];

export function MileageBalancingAI() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getVarianceColor = (variance: number) => {
    const absVariance = Math.abs(variance);
    if (absVariance <= 5000) return 'text-green-600 bg-green-100';
    if (absVariance <= 10000) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getWearColor = (wear: number) => {
    if (wear <= 70) return 'text-green-600 bg-green-100';
    if (wear <= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getLifecycleColor = (life: number) => {
    if (life >= 80) return 'text-green-600 bg-green-100';
    if (life >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* AI Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl text-white mb-4">
          <motion.div
            animate={{ rotate: isAnalyzing ? 360 : 0 }}
            transition={{ duration: 2, repeat: isAnalyzing ? Infinity : 0 }}
          >
            <Brain className="w-8 h-8" />
          </motion.div>
          <div>
            <h2 className="text-xl">Mileage Intelligence AI</h2>
            <p className="text-blue-100">Smart Fleet Rotation & Wear Optimization</p>
          </div>
        </div>
      </motion.div>

      {/* Critical Rotation Alert */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>AI Rotation Alert:</strong> T-015 has exceeded optimal mileage by 15,000km with 85% wear level. 
          Immediate rotation recommended within 3 days to prevent premature component failure.
        </AlertDescription>
      </Alert>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600">Fleet Balance</p>
                  <p className="text-3xl text-blue-700">94.2%</p>
                  <p className="text-sm text-blue-500">Optimal distribution</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <RotateCcw className="w-12 h-12 text-blue-500" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600">Cost Savings</p>
                  <p className="text-3xl text-green-700">₹1.02M</p>
                  <p className="text-sm text-green-500">Monthly optimization</p>
                </div>
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp className="w-12 h-12 text-green-500" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600">Wear Prediction</p>
                  <p className="text-3xl text-yellow-700">92%</p>
                  <p className="text-sm text-yellow-500">Accuracy rate</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Gauge className="w-12 h-12 text-yellow-500" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600">Life Extension</p>
                  <p className="text-3xl text-purple-700">+18%</p>
                  <p className="text-sm text-purple-500">Component lifespan</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Activity className="w-12 h-12 text-purple-500" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Mileage Distribution & Wear Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              AI Mileage Distribution Analysis
            </CardTitle>
            <CardDescription>Smart fleet kilometer balancing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mileageData.map((train, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{train.trainset}</h4>
                      <p className="text-sm text-gray-600">{train.currentMileage.toLocaleString()} km</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getVarianceColor(train.variance)}>
                        {train.variance > 0 ? '+' : ''}{train.variance.toLocaleString()} km
                      </Badge>
                      <Badge className={getWearColor(train.wearLevel)}>
                        {train.wearLevel}% Wear
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress to Target</span>
                        <span>{((train.currentMileage / train.targetMileage) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(train.currentMileage / train.targetMileage) * 100} className="h-2" />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Next rotation: {train.nextRotation} days</span>
                      <span>Target: {train.targetMileage.toLocaleString()} km</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-orange-600" />
              Component Wear Prediction
            </CardTitle>
            <CardDescription>AI-powered wear pattern analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={wearAnalysis}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="component" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name="Current Wear" dataKey="wear" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  <Radar name="Predicted Wear" dataKey="prediction" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
                  <Radar name="Optimal Level" dataKey="optimal" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Efficiency & Lifecycle Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Rotation Efficiency Trends
            </CardTitle>
            <CardDescription>AI optimization performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rotationOptimization}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'costSaving' ? `₹${(value / 1000).toFixed(0)}K` : `${value}%`,
                    name === 'efficiency' ? 'Efficiency' : name === 'variance' ? 'Variance' : 'Cost Saving'
                  ]} />
                  <Bar dataKey="efficiency" fill="#10b981" name="efficiency" />
                  <Bar dataKey="variance" fill="#f59e0b" name="variance" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              AI Lifecycle Management
            </CardTitle>
            <CardDescription>Predictive component replacement planning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lifecyclePrediction.map((train, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 border rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{train.trainset}</h4>
                    <Badge className={getLifecycleColor(train.remainingLife)}>
                      {train.remainingLife}% Life Remaining
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Next Maintenance</p>
                      <p className="font-medium">{train.nextMaintenance} days</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Replacement Cost</p>
                      <p className="font-medium">₹{(train.replacementCost / 100000).toFixed(1)}L</p>
                    </div>
                  </div>
                  <Progress value={train.remainingLife} className="h-2 mt-2" />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QMMS Integration Dashboard */}
      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600" />
            QMMS Integration Hub
            <Badge className="bg-emerald-100 text-emerald-700 ml-2">Live Connection</Badge>
          </CardTitle>
          <CardDescription>Real-time integration with Kochi Metro's Quality Management System</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live QMMS Data Stream */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-sm text-emerald-900">QMMS Data Stream Active</span>
                <span className="text-xs text-gray-600">Last sync: 2 min ago</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: 'Fleet Utilization Matrix',
                    value: '94.7%',
                    change: '+2.3%',
                    data: 'Real-time from QMMS operational dashboard',
                    status: 'optimal'
                  },
                  {
                    title: 'Route Performance Index',
                    value: '91.2',
                    change: '+0.8',
                    data: 'Aggregated from all Blue Line services',
                    status: 'good'
                  },
                  {
                    title: 'Passenger Load Factor',
                    value: '78.4%',
                    change: '+5.1%',
                    data: 'Peak hour average across fleet',
                    status: 'optimal'
                  },
                  {
                    title: 'Energy Efficiency Score',
                    value: '89.6',
                    change: '-1.2',
                    data: 'kWh per passenger-km normalized',
                    status: 'warning'
                  }
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white/70 rounded-lg border border-emerald-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-emerald-700 font-medium">{metric.title}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        metric.status === 'optimal' ? 'bg-green-500' :
                        metric.status === 'good' ? 'bg-blue-500' : 'bg-orange-500'
                      }`}></div>
                    </div>
                    <div className="flex items-end gap-2 mb-1">
                      <span className="text-lg font-bold text-emerald-900">{metric.value}</span>
                      <span className={`text-sm ${
                        metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>{metric.change}</span>
                    </div>
                    <p className="text-xs text-gray-600">{metric.data}</p>
                  </motion.div>
                ))}
              </div>

              <Alert className="border-emerald-200 bg-emerald-50">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <AlertDescription className="text-emerald-800 text-sm">
                  <strong>QMMS Sync Status:</strong> Mileage data synchronized with fleet management system. 
                  Auto-balancing recommendations updated every 15 minutes based on real operational data.
                </AlertDescription>
              </Alert>
            </div>

            {/* QMMS Integration Status */}
            <div className="space-y-4">
              <div className="p-4 bg-white/70 rounded-lg border border-emerald-200">
                <h4 className="font-medium text-sm text-emerald-900 mb-3">System Integrations</h4>
                <div className="space-y-3">
                  {[
                    { system: 'QMMS Core Database', status: 'Connected', latency: '23ms' },
                    { system: 'Fleet Operations API', status: 'Connected', latency: '18ms' },
                    { system: 'Maintenance Records', status: 'Connected', latency: '31ms' },
                    { system: 'Route Analytics', status: 'Connected', latency: '15ms' },
                    { system: 'Passenger Counting', status: 'Connected', latency: '28ms' }
                  ].map((integration, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{integration.system}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{integration.status}</p>
                        <p className="text-gray-500">{integration.latency}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white/70 rounded-lg border border-emerald-200">
                <h4 className="font-medium text-sm text-emerald-900 mb-3">Data Quality Metrics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Mileage Accuracy</span>
                    <span className="text-xs font-medium text-emerald-700">99.7%</span>
                  </div>
                  <Progress value={99.7} className="h-1" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Real-time Updates</span>
                    <span className="text-xs font-medium text-emerald-700">98.2%</span>
                  </div>
                  <Progress value={98.2} className="h-1" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">System Uptime</span>
                    <span className="text-xs font-medium text-emerald-700">99.9%</span>
                  </div>
                  <Progress value={99.9} className="h-1" />
                </div>
              </div>

              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">QMMS AI Insights</span>
                </div>
                <p className="text-xs text-blue-100">
                  Next optimization cycle in 12 min. AI analyzing 47 operational parameters 
                  from QMMS to suggest mileage balancing adjustments.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            AI-Powered Mileage Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-red-50 rounded-lg border border-red-200"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h4 className="font-medium text-red-900">Immediate Rotation Required</h4>
                  <p className="text-sm text-red-700 mt-1">
                    T-015 requires immediate rotation to light-duty routes. Current excessive mileage 
                    poses 78% risk of brake system failure within 7 days, potentially costing ₹3.2M in repairs.
                  </p>
                  <div className="mt-2 text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                    <strong>QMMS Alert:</strong> Route efficiency dropped 3.2% this week, confirming AI mileage imbalance prediction
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900">Optimal Rotation Schedule</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Implement AI-suggested 14-day rotation cycle for T-008 and T-022 to balance fleet 
                    mileage within 2% variance. This strategy extends component life by 18% on average.
                  </p>
                  <div className="mt-2 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    <strong>QMMS Integration:</strong> Rotation schedule automatically synced with operational planning system
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-medium text-green-900">Predictive Maintenance Scheduling</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Schedule brake pad replacement for T-001 in 6 weeks based on wear prediction model. 
                    Proactive replacement saves ₹480,000 compared to emergency repairs and reduces downtime by 65%.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-4 bg-purple-50 rounded-lg border border-purple-200"
            >
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-medium text-purple-900">Long-term Fleet Planning</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    AI analysis suggests acquiring 3 additional trainsets by Q3 2025 to maintain optimal 
                    rotation flexibility as fleet approaches 2027 expansion target of 40 trainsets.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
