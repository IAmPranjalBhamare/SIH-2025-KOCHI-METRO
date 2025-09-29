import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { motion } from 'motion/react';
import { 
  Shield, 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Clock,
  CheckCircle,
  Target,
  Zap,
  FileText,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const complianceData = [
  { date: 'Week 1', rolling: 95, signalling: 98, telecom: 92 },
  { date: 'Week 2', rolling: 93, signalling: 97, telecom: 89 },
  { date: 'Week 3', rolling: 91, signalling: 96, telecom: 87 },
  { date: 'Week 4', rolling: 94, signalling: 95, telecom: 91 }
];

const riskPredictions = [
  { trainset: 'T-001', department: 'Rolling Stock', risk: 85, daysToExpiry: 18, confidence: 94 },
  { trainset: 'T-012', department: 'Telecom', risk: 95, daysToExpiry: 3, confidence: 98 },
  { trainset: 'T-018', department: 'Signalling', risk: 72, daysToExpiry: 6, confidence: 89 },
  { trainset: 'T-025', department: 'Rolling Stock', risk: 45, daysToExpiry: 45, confidence: 76 }
];

const inspectionOptimization = [
  { inspector: 'A. Kumar', efficiency: 92, workload: 78, recommendation: 'Optimal' },
  { inspector: 'R. Nair', efficiency: 87, workload: 95, recommendation: 'Reduce Load' },
  { inspector: 'S. Pillai', efficiency: 95, workload: 65, recommendation: 'Increase Load' },
  { inspector: 'M. Menon', efficiency: 89, workload: 82, recommendation: 'Optimal' }
];

export function FitnessCertificateAI() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('30-days');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return 'text-red-600 bg-red-100';
    if (risk >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
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
        <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white mb-4">
          <motion.div
            animate={{ rotate: isAnalyzing ? 360 : 0 }}
            transition={{ duration: 2, repeat: isAnalyzing ? Infinity : 0 }}
          >
            <Brain className="w-8 h-8" />
          </motion.div>
          <div>
            <h2 className="text-xl">Certificate Compliance AI</h2>
            <p className="text-emerald-100">Intelligent Certificate Management & Risk Assessment</p>
          </div>
        </div>
      </motion.div>

      {/* Critical Risk Alert */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>AI Risk Assessment:</strong> High probability (95% confidence) that T-012 telecom certificate will cause operational disruption. 
          Immediate action recommended within 72 hours to prevent service impact.
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
                  <p className="text-blue-600">AI Compliance Score</p>
                  <p className="text-3xl text-blue-700">94.2%</p>
                  <p className="text-sm text-blue-500">↑ 2.1% from last week</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <CheckCircle className="w-12 h-12 text-blue-500" />
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
          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600">Risk Predictions</p>
                  <p className="text-3xl text-orange-700">4 High</p>
                  <p className="text-sm text-orange-500">Next 30 days</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Target className="w-12 h-12 text-orange-500" />
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
                  <p className="text-green-600">Efficiency Gain</p>
                  <p className="text-3xl text-green-700">+18%</p>
                  <p className="text-sm text-green-500">Through AI optimization</p>
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
      </div>

      {/* Risk Assessment & Compliance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              AI Risk Assessment
            </CardTitle>
            <CardDescription>ML-powered certificate expiry risk analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskPredictions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium">{item.trainset} - {item.department}</p>
                      <p className="text-sm text-gray-600">{item.daysToExpiry} days to expiry</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <Badge className={getRiskColor(item.risk)}>
                        {item.risk}% Risk
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{item.confidence}% confidence</p>
                    </div>
                    <div className="w-16">
                      <Progress value={item.risk} className="h-2" />
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
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Compliance Trend Analysis
            </CardTitle>
            <CardDescription>AI-powered compliance forecasting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={complianceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="rolling" stroke="#10b981" strokeWidth={2} name="Rolling Stock" />
                  <Line type="monotone" dataKey="signalling" stroke="#3b82f6" strokeWidth={2} name="Signalling" />
                  <Line type="monotone" dataKey="telecom" stroke="#8b5cf6" strokeWidth={2} name="Telecom" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inspector Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI Inspector Workload Optimization
          </CardTitle>
          <CardDescription>Machine learning recommendations for inspection scheduling</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {inspectionOptimization.map((inspector, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <h4 className="font-medium mb-3">{inspector.inspector}</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Efficiency</span>
                      <span>{inspector.efficiency}%</span>
                    </div>
                    <Progress value={inspector.efficiency} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Workload</span>
                      <span>{inspector.workload}%</span>
                    </div>
                    <Progress value={inspector.workload} className="h-2" />
                  </div>
                  <Badge className={getRecommendationColor(inspector.recommendation)}>
                    {inspector.recommendation}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

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
              className="p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900">Proactive Scheduling</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Schedule T-001 rolling stock inspection 5 days early to avoid weekend disruption. 
                    AI predicts 89% chance of successful completion with current inspector availability.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-medium text-green-900">Documentation Optimization</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Implement digital certificate tracking to reduce processing time by 34%. 
                    AI analysis shows significant efficiency gains with automated renewals.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-purple-50 rounded-lg border border-purple-200"
            >
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-medium text-purple-900">Predictive Maintenance Alert</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    T-025 shows early signs of signalling issues. Recommend inspection 2 weeks before 
                    scheduled to prevent certificate complications and ensure continuous compliance.
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