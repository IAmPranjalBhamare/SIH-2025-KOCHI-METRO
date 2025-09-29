import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles,
  Users,
  Target,
  Clock,
  BarChart3,
  CheckCircle,
  Zap,
  Droplets
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const cleaningSchedule = [
  { trainset: 'T-003', priority: 'High', lastCleaning: '2 days ago', nextScheduled: 'Tomorrow', quality: 85, duration: 4.5 },
  { trainset: 'T-017', priority: 'Medium', lastCleaning: '1 day ago', nextScheduled: 'In 2 days', quality: 92, duration: 3.8 },
  { trainset: 'T-024', priority: 'Critical', lastCleaning: '4 days ago', nextScheduled: 'Today', quality: 76, duration: 6.2 },
  { trainset: 'T-011', priority: 'Low', lastCleaning: 'Yesterday', nextScheduled: 'In 3 days', quality: 94, duration: 3.2 }
];

const qualityMetrics = [
  { area: 'Interior', score: 87, target: 90, trend: 2 },
  { area: 'Exterior', score: 92, target: 88, trend: 5 },
  { area: 'Windows', score: 84, target: 90, trend: -1 },
  { area: 'Floors', score: 89, target: 85, trend: 3 },
  { area: 'Seats', score: 91, target: 88, trend: 4 }
];

const resourceOptimization = [
  { name: 'Cleaning Team A', efficiency: 94, workload: 87, satisfaction: 91 },
  { name: 'Cleaning Team B', efficiency: 89, workload: 95, satisfaction: 86 },
  { name: 'Detailing Team C', efficiency: 92, workload: 78, satisfaction: 93 },
  { name: 'Maintenance Team D', efficiency: 87, workload: 91, satisfaction: 88 }
];

const predictiveScheduling = [
  { day: 'Mon', scheduled: 8, predicted: 9, efficiency: 92 },
  { day: 'Tue', scheduled: 6, predicted: 7, efficiency: 89 },
  { day: 'Wed', scheduled: 10, predicted: 12, efficiency: 95 },
  { day: 'Thu', scheduled: 7, predicted: 8, efficiency: 91 },
  { day: 'Fri', scheduled: 9, predicted: 10, efficiency: 93 }
];

const bayOccupancy = [
  { name: 'Available', count: 4, color: '#10b981' },
  { name: 'In Use', count: 8, color: '#3b82f6' },
  { name: 'Maintenance', count: 2, color: '#f59e0b' }
];

export function CleaningDetailingAI() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedShift, setSelectedShift] = useState('morning');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getQualityColor = (score: number, target: number) => {
    if (score >= target) return 'text-green-600 bg-green-100';
    if (score >= target - 5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600 bg-green-100';
    if (efficiency >= 80) return 'text-yellow-600 bg-yellow-100';
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
        <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-lime-600 rounded-2xl text-white mb-4">
          <motion.div
            animate={{ rotate: isAnalyzing ? 360 : 0 }}
            transition={{ duration: 2, repeat: isAnalyzing ? Infinity : 0 }}
          >
            <Brain className="w-8 h-8" />
          </motion.div>
          <div>
            <h2 className="text-xl">Cleaning Intelligence AI</h2>
            <p className="text-green-100">Smart Cleaning & Quality Management</p>
          </div>
        </div>
      </motion.div>

      {/* Critical Cleaning Alert */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>AI Quality Alert:</strong> T-024 requires immediate deep cleaning with quality score of 76% 
          and 4 days since last service. Customer satisfaction risk detected - prioritize for today's shift.
        </AlertDescription>
      </Alert>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600">Quality Score</p>
                  <p className="text-3xl text-green-700">88.6%</p>
                  <p className="text-sm text-green-500">↑ 2.8% this week</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-12 h-12 text-green-500" />
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
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600">Efficiency Rate</p>
                  <p className="text-3xl text-blue-700">92.1%</p>
                  <p className="text-sm text-blue-500">AI optimized</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp className="w-12 h-12 text-blue-500" />
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
                  <p className="text-purple-600">Time Saved</p>
                  <p className="text-3xl text-purple-700">18%</p>
                  <p className="text-sm text-purple-500">Through AI scheduling</p>
                </div>
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Clock className="w-12 h-12 text-purple-500" />
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
          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600">Cost Reduction</p>
                  <p className="text-3xl text-orange-700">₹240K</p>
                  <p className="text-sm text-orange-500">Monthly savings</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Target className="w-12 h-12 text-orange-500" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Cleaning Schedule & Quality Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              AI-Optimized Cleaning Schedule
            </CardTitle>
            <CardDescription>Smart prioritization and resource allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cleaningSchedule.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{item.trainset}</h4>
                      <p className="text-sm text-gray-600">Last: {item.lastCleaning}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                      <Badge className={getQualityColor(item.quality, 85)}>
                        {item.quality}% Quality
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Next scheduled: {item.nextScheduled}</span>
                      <span>Est. duration: {item.duration}h</span>
                    </div>
                    <Progress value={item.quality} className="h-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Quality Performance Analysis
            </CardTitle>
            <CardDescription>AI quality assessment by area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qualityMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 border rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{metric.area}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className={getQualityColor(metric.score, metric.target)}>
                        {metric.score}%
                      </Badge>
                      <span className={`text-sm ${metric.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.trend > 0 ? '+' : ''}{metric.trend}%
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Current: {metric.score}%</span>
                      <span>Target: {metric.target}%</span>
                    </div>
                    <Progress value={metric.score} className="h-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Optimization & Bay Occupancy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              AI Team Optimization
            </CardTitle>
            <CardDescription>Smart workforce allocation and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resourceOptimization.map((team, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
                >
                  <h4 className="font-medium mb-3">{team.name}</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Efficiency</span>
                        <span>{team.efficiency}%</span>
                      </div>
                      <Progress value={team.efficiency} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Workload</span>
                        <span>{team.workload}%</span>
                      </div>
                      <Progress value={team.workload} className="h-2" />
                    </div>
                    <Badge className={getEfficiencyColor(team.satisfaction)}>
                      {team.satisfaction}% Satisfaction
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-cyan-600" />
              Bay Occupancy Analysis
            </CardTitle>
            <CardDescription>Real-time cleaning bay utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bayOccupancy}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {bayOccupancy.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {bayOccupancy.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm">{item.count} bays</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">Peak Hours Analysis</span>
              </div>
              <p className="text-sm text-blue-700">
                AI predicts 85% bay utilization between 10:00-14:00. 
                Recommend scheduling deep cleans during off-peak hours (06:00-09:00).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Scheduling */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            AI Predictive Scheduling
          </CardTitle>
          <CardDescription>Machine learning schedule optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={predictiveScheduling}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="scheduled" fill="#10b981" name="Scheduled Cleans" />
                <Bar dataKey="predicted" fill="#3b82f6" name="AI Predicted Demand" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            AI-Powered Cleaning Optimization
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
                  <h4 className="font-medium text-red-900">Immediate Quality Intervention</h4>
                  <p className="text-sm text-red-700 mt-1">
                    T-024 requires immediate deep cleaning with specialized detailing team. 
                    Current 76% quality score poses customer satisfaction risk. Allocate 6.2 hours today.
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
                <Users className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900">Workload Rebalancing</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Redistribute 15% workload from Cleaning Team B to Detailing Team C to improve 
                    overall efficiency and reduce overtime costs by ₹48,000 monthly.
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
                <Sparkles className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-medium text-green-900">Quality Enhancement Program</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Focus on window cleaning improvements - current 84% vs 90% target. 
                    AI suggests specialized training and new cleaning agents to boost passenger satisfaction.
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
                <Clock className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-medium text-purple-900">Smart Schedule Optimization</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Implement AI-suggested staggered cleaning schedule to reduce bay congestion. 
                    Peak hour optimization can increase throughput by 23% without additional resources.
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