import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Grid3x3,
  Shuffle,
  Target,
  Clock,
  BarChart3,
  Compass,
  Zap,
  Route
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from 'recharts';

const bayLayout = [
  { bay: 'A1', trainset: 'T-001', status: 'Occupied', efficiency: 92, moveTime: 3.2, nextMove: '14:30' },
  { bay: 'A2', trainset: 'T-008', status: 'Occupied', efficiency: 88, moveTime: 4.1, nextMove: '16:15' },
  { bay: 'A3', trainset: null, status: 'Available', efficiency: 0, moveTime: 0, nextMove: 'Ready' },
  { bay: 'B1', trainset: 'T-015', status: 'Maintenance', efficiency: 0, moveTime: 8.5, nextMove: '18:00' },
  { bay: 'B2', trainset: 'T-024', status: 'Occupied', efficiency: 95, moveTime: 2.8, nextMove: '15:45' },
  { bay: 'B3', trainset: null, status: 'Available', efficiency: 0, moveTime: 0, nextMove: 'Ready' },
  { bay: 'C1', trainset: 'T-011', status: 'Occupied', efficiency: 91, moveTime: 3.5, nextMove: '17:20' },
  { bay: 'C2', trainset: null, status: 'Available', efficiency: 0, moveTime: 0, nextMove: 'Ready' }
];

const shuntingOptimization = [
  { route: 'A1→A3', distance: 45, time: 2.1, conflicts: 0, efficiency: 98 },
  { route: 'B1→C2', distance: 120, time: 5.8, conflicts: 1, efficiency: 85 },
  { route: 'A2→B3', distance: 85, time: 4.2, conflicts: 0, efficiency: 92 },
  { route: 'C1→A1', distance: 95, time: 4.8, conflicts: 2, efficiency: 78 }
];

const capacityAnalysis = [
  { time: '06:00', occupied: 18, available: 7, utilization: 72 },
  { time: '09:00', occupied: 22, available: 3, utilization: 88 },
  { time: '12:00', occupied: 20, available: 5, utilization: 80 },
  { time: '15:00', occupied: 24, available: 1, utilization: 96 },
  { time: '18:00', occupied: 19, available: 6, utilization: 76 },
  { time: '21:00', occupied: 15, available: 10, utilization: 60 }
];

const geometricEfficiency = [
  { parameter: 'Track Alignment', current: 94, optimal: 96, variance: -2 },
  { parameter: 'Clearance Zones', current: 98, optimal: 95, variance: 3 },
  { parameter: 'Turning Radius', current: 87, optimal: 90, variance: -3 },
  { parameter: 'Grade Levels', current: 91, optimal: 88, variance: 3 },
  { parameter: 'Signal Spacing', current: 89, optimal: 92, variance: -3 }
];

const movementPrediction = [
  { hour: '14:00', predicted: 8, actual: 7, accuracy: 92 },
  { hour: '15:00', predicted: 12, actual: 13, accuracy: 89 },
  { hour: '16:00', predicted: 15, actual: 14, accuracy: 95 },
  { hour: '17:00', predicted: 18, actual: 19, accuracy: 87 },
  { hour: '18:00', predicted: 22, actual: 21, accuracy: 96 }
];

export function StablingGeometryAI() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedDepot, setSelectedDepot] = useState('muttom');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Occupied': return 'text-blue-600 bg-blue-100';
      case 'Available': return 'text-green-600 bg-green-100';
      case 'Maintenance': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600 bg-green-100';
    if (efficiency >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getVarianceColor = (variance: number) => {
    if (Math.abs(variance) <= 2) return 'text-green-600';
    if (Math.abs(variance) <= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* AI Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl text-white mb-4">
          <motion.div
            animate={{ rotate: isAnalyzing ? 360 : 0 }}
            transition={{ duration: 2, repeat: isAnalyzing ? Infinity : 0 }}
          >
            <Brain className="w-8 h-8" />
          </motion.div>
          <div>
            <h2 className="text-xl">Geometry Intelligence AI</h2>
            <p className="text-pink-100">Smart Space Optimization & Shunting Efficiency</p>
          </div>
        </div>
      </motion.div>

      {/* Capacity Alert */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>AI Capacity Warning:</strong> Depot utilization will reach 96% at 15:00 today. 
          Recommend preemptive shunting of T-015 from B1 to optimize space allocation and prevent congestion.
        </AlertDescription>
      </Alert>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600">Space Efficiency</p>
                  <p className="text-3xl text-blue-700">91.4%</p>
                  <p className="text-sm text-blue-500">AI optimized layout</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Grid3x3 className="w-12 h-12 text-blue-500" />
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
                  <p className="text-green-600">Move Time Saved</p>
                  <p className="text-3xl text-green-700">28%</p>
                  <p className="text-sm text-green-500">Through smart routing</p>
                </div>
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Clock className="w-12 h-12 text-green-500" />
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
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600">Conflict Reduction</p>
                  <p className="text-3xl text-purple-700">85%</p>
                  <p className="text-sm text-purple-500">Fewer movement conflicts</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Shuffle className="w-12 h-12 text-purple-500" />
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
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600">Capacity Utilization</p>
                  <p className="text-3xl text-orange-700">76%</p>
                  <p className="text-sm text-orange-500">Current occupancy</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Target className="w-12 h-12 text-orange-500" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bay Layout & Shunting Optimization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Grid3x3 className="w-5 h-5 text-blue-600" />
              Real-time Bay Status
            </CardTitle>
            <CardDescription>AI-monitored stabling positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {bayLayout.map((bay, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-3 border rounded-lg ${
                    bay.status === 'Available' ? 'border-green-200 bg-green-50' :
                    bay.status === 'Maintenance' ? 'border-orange-200 bg-orange-50' :
                    'border-blue-200 bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{bay.bay}</h4>
                    <Badge className={getStatusColor(bay.status)}>
                      {bay.status}
                    </Badge>
                  </div>
                  {bay.trainset && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{bay.trainset}</p>
                      <div className="flex justify-between text-xs">
                        <span>Move: {bay.moveTime}h</span>
                        <span>{bay.nextMove}</span>
                      </div>
                      {bay.efficiency > 0 && (
                        <Progress value={bay.efficiency} className="h-1" />
                      )}
                    </div>
                  )}
                  {bay.status === 'Available' && (
                    <p className="text-sm text-green-600 font-medium">{bay.nextMove}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="w-5 h-5 text-purple-600" />
              AI Shunting Optimization
            </CardTitle>
            <CardDescription>Intelligent movement path planning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shuntingOptimization.map((route, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{route.route}</h4>
                    <Badge className={getEfficiencyColor(route.efficiency)}>
                      {route.efficiency}% Efficient
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Distance</p>
                      <p className="font-medium">{route.distance}m</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Time</p>
                      <p className="font-medium">{route.time}min</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Conflicts</p>
                      <p className={`font-medium ${route.conflicts === 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {route.conflicts}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Capacity Analysis & Geometric Efficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              AI Capacity Forecasting
            </CardTitle>
            <CardDescription>Predictive depot utilization analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={capacityAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="occupied" fill="#3b82f6" name="Occupied Bays" />
                  <Bar dataKey="available" fill="#10b981" name="Available Bays" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-orange-600" />
              Geometric Efficiency Analysis
            </CardTitle>
            <CardDescription>AI infrastructure optimization metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {geometricEfficiency.map((param, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 border rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{param.parameter}</h4>
                    <span className={`text-sm font-medium ${getVarianceColor(param.variance)}`}>
                      {param.variance > 0 ? '+' : ''}{param.variance}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current: {param.current}%</span>
                      <span>Optimal: {param.optimal}%</span>
                    </div>
                    <Progress value={param.current} className="h-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Movement Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            AI Movement Prediction Model
          </CardTitle>
          <CardDescription>Machine learning shunting demand forecasting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={movementPrediction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={3} name="AI Predicted" />
                <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Actual Movements" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-600 font-medium">Prediction Accuracy</p>
              <p className="text-2xl text-blue-700">91.8%</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-green-600 font-medium">Average Movements/Hour</p>
              <p className="text-2xl text-green-700">14.2</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            AI-Powered Geometry Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-orange-50 rounded-lg border border-orange-200"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-1" />
                <div>
                  <h4 className="font-medium text-orange-900">Capacity Management Alert</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    Move T-015 from B1 to C2 before 15:00 peak period. AI predicts 96% utilization 
                    will cause 12-minute delays in subsequent shunting operations.
                  </p>
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
                <Route className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900">Shunting Path Optimization</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Use A1→A3 route for next movement - 98% efficiency with zero conflicts. 
                    Avoid B1→C2 route during peak hours due to 85% efficiency and potential conflicts.
                  </p>
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
                <Grid3x3 className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-medium text-green-900">Space Allocation Efficiency</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Implement dynamic bay allocation based on service schedules. AI suggests 
                    reserving A3 and B3 for incoming morning services to reduce turnaround time by 23%.
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
                <Compass className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-medium text-purple-900">Geometric Infrastructure Upgrade</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Track alignment in Section C shows -3% variance from optimal. 
                    Recommend minor realignment during next maintenance window to improve efficiency by 8%.
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
