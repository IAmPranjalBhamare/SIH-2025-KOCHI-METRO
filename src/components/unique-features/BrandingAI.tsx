import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  Eye,
  Target,
  Clock,
  BarChart3,
  Megaphone,
  Award
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const exposureData = [
  { route: 'Aluva-Thripunithura', exposure: 450000, value: 3200000, compliance: 98 },
  { route: 'Thripunithura-Ernakulam', exposure: 380000, value: 2800000, compliance: 95 },
  { route: 'Ernakulam-Maharajas', exposure: 520000, value: 3800000, compliance: 99 },
  { route: 'Maharajas-MG Road', exposure: 610000, value: 4200000, compliance: 97 }
];

const brandPerformance = [
  { brand: 'Coca-Cola', exposure: 520000, target: 500000, revenue: 4200000, efficiency: 104 },
  { brand: 'Samsung', exposure: 380000, target: 400000, revenue: 3200000, efficiency: 95 },
  { brand: 'Airtel', exposure: 450000, target: 420000, revenue: 3600000, efficiency: 107 },
  { brand: 'HDFC Bank', exposure: 290000, target: 320000, revenue: 2800000, efficiency: 91 }
];

const revenueOptimization = [
  { month: 'Jan', actual: 12.5, predicted: 13.2, target: 12.0 },
  { month: 'Feb', actual: 13.8, predicted: 14.1, target: 13.5 },
  { month: 'Mar', actual: 14.2, predicted: 15.0, target: 14.0 },
  { month: 'Apr', actual: 15.1, predicted: 15.8, target: 15.0 }
];

const contractCompliance = [
  { name: 'Fulfilled', count: 47, color: '#10b981' },
  { name: 'At Risk', count: 8, color: '#f59e0b' },
  { name: 'Overdue', count: 3, color: '#ef4444' }
];

export function BrandingAI() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('exposure');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 100) return 'text-green-600 bg-green-100';
    if (efficiency >= 90) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 98) return 'text-green-600 bg-green-100';
    if (compliance >= 95) return 'text-yellow-600 bg-yellow-100';
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
        <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl text-white mb-4">
          <motion.div
            animate={{ rotate: isAnalyzing ? 360 : 0 }}
            transition={{ duration: 2, repeat: isAnalyzing ? Infinity : 0 }}
          >
            <Brain className="w-8 h-8" />
          </motion.div>
          <div>
            <h2 className="text-xl">Brand Intelligence AI</h2>
            <p className="text-purple-100">Smart Brand Exposure & Revenue Optimization</p>
          </div>
        </div>
      </motion.div>

      {/* Revenue Opportunity Alert */}
      <Alert className="border-green-200 bg-green-50">
        <TrendingUp className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>AI Revenue Opportunity:</strong> Optimize Coca-Cola placement on high-traffic routes to increase 
          monthly revenue by ₹420,000. Current exposure efficiency at 104% with expansion potential.
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
                  <p className="text-green-600">Monthly Revenue</p>
                  <p className="text-3xl text-green-700">₹15.1M</p>
                  <p className="text-sm text-green-500">↑ 12.3% from target</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <DollarSign className="w-12 h-12 text-green-500" />
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
                  <p className="text-blue-600">Brand Exposure</p>
                  <p className="text-3xl text-blue-700">1.96M</p>
                  <p className="text-sm text-blue-500">Daily impressions</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Eye className="w-12 h-12 text-blue-500" />
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
                  <p className="text-purple-600">Contract Efficiency</p>
                  <p className="text-3xl text-purple-700">97.4%</p>
                  <p className="text-sm text-purple-500">Compliance score</p>
                </div>
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Award className="w-12 h-12 text-purple-500" />
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
                  <p className="text-orange-600">AI Optimization</p>
                  <p className="text-3xl text-orange-700">+24%</p>
                  <p className="text-sm text-orange-500">Revenue increase potential</p>
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

      {/* Brand Performance & Route Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              AI Brand Performance Analysis
            </CardTitle>
            <CardDescription>Machine learning brand efficiency optimization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {brandPerformance.map((brand, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{brand.brand}</h4>
                      <p className="text-sm text-gray-600">₹{(brand.revenue / 100000).toFixed(1)}L revenue</p>
                    </div>
                    <Badge className={getEfficiencyColor(brand.efficiency)}>
                      {brand.efficiency}% Efficient
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Exposure vs Target</span>
                        <span>{brand.exposure.toLocaleString()} / {brand.target.toLocaleString()}</span>
                      </div>
                      <Progress value={(brand.exposure / brand.target) * 100} className="h-2" />
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
              <TrendingUp className="w-5 h-5 text-green-600" />
              Revenue Prediction Model
            </CardTitle>
            <CardDescription>AI-powered revenue forecasting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueOptimization}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}M`, '']} />
                  <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={3} name="Actual Revenue" />
                  <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name="AI Prediction" />
                  <Line type="monotone" dataKey="target" stroke="#6b7280" strokeWidth={1} strokeDasharray="2 2" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contract Compliance & Route Optimization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Contract Compliance Monitor
            </CardTitle>
            <CardDescription>AI contract fulfillment tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contractCompliance}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {contractCompliance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {contractCompliance.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm">{item.count} contracts</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-600" />
              Route Exposure Analysis
            </CardTitle>
            <CardDescription>AI route performance optimization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exposureData.map((route, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 border rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{route.route}</h4>
                    <Badge className={getComplianceColor(route.compliance)}>
                      {route.compliance}% Compliance
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Daily Exposure</p>
                      <p className="font-medium">{route.exposure.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revenue Value</p>
                      <p className="font-medium">₹{(route.value / 100000).toFixed(1)}L</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-yellow-600" />
            AI-Powered Brand Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-medium text-green-900">Revenue Maximization</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Reallocate Coca-Cola branding from low-traffic morning hours to peak evening slots 
                    on MG Road route. AI predicts 18% increase in exposure value worth ₹760,000 monthly.
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
                <Target className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900">Contract Optimization</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Samsung contract shows 95% efficiency. Recommend renegotiation for premium slots 
                    during tech conference season to boost exposure by 15% and increase revenue by ₹450,000.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-orange-50 rounded-lg border border-orange-200"
            >
              <div className="flex items-start gap-3">
                <Megaphone className="w-5 h-5 text-orange-600 mt-1" />
                <div>
                  <h4 className="font-medium text-orange-900">Dynamic Pricing Strategy</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    Implement AI-driven dynamic pricing for festive seasons. Historical data suggests 
                    35% premium pricing during Onam and Christmas periods can boost annual revenue by ₹2.1M.
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
                  <h4 className="font-medium text-purple-900">Automated Compliance Monitoring</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Deploy AI sensors for real-time brand exposure tracking. Automated compliance reporting 
                    can reduce manual oversight by 60% and ensure 100% contract fulfillment accuracy.
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
