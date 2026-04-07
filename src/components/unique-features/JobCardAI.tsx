import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Clock,
  CheckCircle,
  Target,
  Zap,
  Settings,
  BarChart3,
  Cog
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const priorityData = [
  { name: 'Critical', count: 8, color: '#ef4444', estimated: '2-4 hours' },
  { name: 'High', count: 15, color: '#f59e0b', estimated: '4-8 hours' },
  { name: 'Medium', count: 23, color: '#3b82f6', estimated: '1-2 days' },
  { name: 'Low', count: 12, color: '#10b981', estimated: '3-5 days' }
];

const failurePredictions = [
  { system: 'HVAC System', trainset: 'T-003', probability: 87, timeframe: '7 days', impact: 'High' },
  { system: 'Door Mechanism', trainset: 'T-015', probability: 74, timeframe: '14 days', impact: 'Medium' },
  { system: 'Brake System', trainset: 'T-008', probability: 92, timeframe: '3 days', impact: 'Critical' },
  { system: 'Lighting System', trainset: 'T-022', probability: 65, timeframe: '21 days', impact: 'Low' }
];

const resourceOptimization = [
  { resource: 'Mechanical Team A', utilization: 89, efficiency: 94, recommendation: 'Optimal' },
  { resource: 'Electrical Team B', utilization: 95, efficiency: 87, recommendation: 'Reduce Load' },
  { resource: 'Hydraulics Team C', utilization: 72, efficiency: 91, recommendation: 'Increase Load' },
  { resource: 'Electronics Team D', utilization: 83, efficiency: 96, recommendation: 'Optimal' }
];

const maintenanceEfficiency = [
  { week: 'Week 1', planned: 85, emergency: 15, completion: 92 },
  { week: 'Week 2', planned: 78, emergency: 22, completion: 88 },
  { week: 'Week 3', planned: 90, emergency: 10, completion: 95 },
  { week: 'Week 4', planned: 87, emergency: 13, completion: 93 }
];

export function JobCardAI() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7-days');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getProbabilityColor = (prob: number) => {
    if (prob >= 80) return 'text-red-600 bg-red-100';
    if (prob >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRecommendationColor = (rec: string) => {
    if (rec === 'Reduce Load') return 'text-red-600 bg-red-100';
    if (rec === 'Increase Load') return 'text-blue-600 bg-blue-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="space-y-6">
      {/* AI Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl text-white mb-4">
          <motion.div
            animate={{ rotate: isAnalyzing ? 360 : 0 }}
            transition={{ duration: 2, repeat: isAnalyzing ? Infinity : 0 }}
          >
            <Brain className="w-8 h-8" />
          </motion.div>
          <div>
            <h2 className="text-xl">Maintenance Intelligence AI</h2>
            <p className="text-orange-100">Smart Job-Card Management & Failure Prevention</p>
          </div>
        </div>
      </motion.div>

      {/* Critical Prediction Alert */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>AI Failure Prediction:</strong> T-008 brake system shows 92% failure probability within 3 days. 
          Critical priority job card recommended immediately to prevent safety incidents.
        </AlertDescription>
      </Alert>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600">AI Efficiency Score</p>
                  <p className="text-3xl text-blue-700">91.4%</p>
                  <p className="text-sm text-blue-500">↑ 3.2% from last month</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Settings className="w-12 h-12 text-blue-500" />
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
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600">Failure Predictions</p>
                  <p className="text-3xl text-red-700">4 Critical</p>
                  <p className="text-sm text-red-500">Next 30 days</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <AlertTriangle className="w-12 h-12 text-red-500" />
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
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600">Cost Savings</p>
                  <p className="text-3xl text-green-700">₹2.4M</p>
                  <p className="text-sm text-green-500">Through predictive maintenance</p>
                </div>
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <TrendingUp className="w-12 h-12 text-green-500" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Priority Distribution & Failure Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              AI Priority Optimization
            </CardTitle>
            <CardDescription>Machine learning job-card prioritization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {priorityData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm">{item.count} jobs</span>
                    <p className="text-xs text-gray-500">{item.estimated}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-red-600" />
              AI Failure Predictions
            </CardTitle>
            <CardDescription>Predictive maintenance alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {failurePredictions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Cog className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="font-medium text-sm">{item.system}</p>
                      <p className="text-xs text-gray-600">{item.trainset} • {item.timeframe}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <Badge className={getProbabilityColor(item.probability)}>
                        {item.probability}%
                      </Badge>
                      <Badge className={getImpactColor(item.impact)} variant="outline">
                        {item.impact}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            AI Resource Optimization
          </CardTitle>
          <CardDescription>Machine learning team efficiency analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {resourceOptimization.map((team, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <h4 className="font-medium mb-3">{team.resource}</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Utilization</span>
                      <span>{team.utilization}%</span>
                    </div>
                    <Progress value={team.utilization} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Efficiency</span>
                      <span>{team.efficiency}%</span>
                    </div>
                    <Progress value={team.efficiency} className="h-2" />
                  </div>
                  <Badge className={getRecommendationColor(team.recommendation)}>
                    {team.recommendation}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Efficiency Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            AI Performance Analytics
          </CardTitle>
          <CardDescription>Planned vs Emergency maintenance trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={maintenanceEfficiency}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="planned" fill="#10b981" name="Planned %" />
                <Bar dataKey="emergency" fill="#ef4444" name="Emergency %" />
                <Bar dataKey="completion" fill="#3b82f6" name="Completion %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* QMMS Integration & End-of-Service Data Collection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              End-of-Service Data Collection
            </CardTitle>
            <CardDescription>Automated data capture during final service hour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-white/60 rounded-lg border border-indigo-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-sm">T-003 - Final Hour Active</span>
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-700">Collecting</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-gray-600">Service End Time</p>
                    <p className="font-medium">23:45 IST</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Data Points</p>
                    <p className="font-medium">847/920</p>
                  </div>
                  <div>
                    <p className="text-gray-600">System Health</p>
                    <p className="font-medium text-green-600">92.4%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Anomalies</p>
                    <p className="font-medium text-orange-600">3 Minor</p>
                  </div>
                </div>
                <Progress value={92} className="h-2 mt-3" />
              </motion.div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm text-indigo-900">Critical Systems Monitoring</h4>
                {[
                  { system: 'Door Operations', status: 'Normal', cycles: '2,847', alerts: 0 },
                  { system: 'Brake Performance', status: 'Optimal', pressure: '8.2 bar', alerts: 0 },
                  { system: 'HVAC Efficiency', status: 'Warning', temp: '24.8°C', alerts: 1 },
                  { system: 'Traction Motors', status: 'Normal', current: '385A', alerts: 0 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white/40 rounded text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'Normal' ? 'bg-green-500' : 
                        item.status === 'Optimal' ? 'bg-blue-500' : 'bg-orange-500'
                      }`}></div>
                      <span className="font-medium">{item.system}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{Object.values(item)[2]}</span>
                      {item.alerts > 0 && (
                        <Badge className="bg-orange-100 text-orange-700 text-xs">
                          {item.alerts} Alert
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800 text-sm">
                  <strong>Auto-Generate Job Cards:</strong> AI will create maintenance job cards based on 
                  final hour performance data and detected anomalies within 15 minutes of service end.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-teal-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-cyan-600" />
              Historical Performance Insights
            </CardTitle>
            <CardDescription>End-of-service trends and patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { day: 'Mon', efficiency: 94, issues: 2 },
                    { day: 'Tue', efficiency: 91, issues: 4 },
                    { day: 'Wed', efficiency: 96, issues: 1 },
                    { day: 'Thu', efficiency: 89, issues: 6 },
                    { day: 'Fri', efficiency: 93, issues: 3 },
                    { day: 'Sat', efficiency: 95, issues: 2 },
                    { day: 'Sun', efficiency: 92, issues: 3 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="efficiency" stroke="#06b6d4" strokeWidth={2} />
                    <Line type="monotone" dataKey="issues" stroke="#f59e0b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm text-cyan-900">Weekly Summary</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/60 rounded-lg text-center">
                    <p className="text-2xl font-bold text-cyan-700">93.1%</p>
                    <p className="text-xs text-cyan-600">Avg. End-Service Health</p>
                  </div>
                  <div className="p-3 bg-white/60 rounded-lg text-center">
                    <p className="text-2xl font-bold text-orange-700">21</p>
                    <p className="text-xs text-orange-600">Total Issues Detected</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white/60 rounded-lg">
                <h5 className="font-medium text-xs text-cyan-900 mb-2">Most Common End-Service Issues</h5>
                <div className="space-y-1">
                  {[
                    { issue: 'HVAC Temperature Variance', count: 8, trend: '↑' },
                    { issue: 'Door Sensor Delays', count: 6, trend: '→' },
                    { issue: 'Brake Pad Wear Alerts', count: 4, trend: '↓' },
                    { issue: 'LED Light Dimming', count: 3, trend: '→' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="text-gray-700">{item.issue}</span>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{item.count}</span>
                        <span className={`${
                          item.trend === '↑' ? 'text-red-500' : 
                          item.trend === '↓' ? 'text-green-500' : 'text-gray-500'
                        }`}>{item.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            AI-Powered Recommendations
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
                  <h4 className="font-medium text-red-900">Immediate Action Required</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Create critical job card for T-008 brake system inspection. AI prediction indicates 
                    high failure probability. Allocate Mechanical Team A for immediate intervention.
                  </p>
                  <div className="mt-2 text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                    <strong>End-Service Data:</strong> T-008 showed brake pressure irregularities during final hour yesterday
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
                <Settings className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900">Workflow Optimization</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Redistribute workload from Electrical Team B to Hydraulics Team C to improve 
                    overall efficiency by 12% and reduce bottlenecks in critical maintenance tasks.
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
                <Clock className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-medium text-green-900">Preventive Scheduling</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Schedule T-015 door mechanism maintenance during next planned downtime. 
                    Early intervention can prevent emergency repairs and save an estimated ₹380,000.
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
