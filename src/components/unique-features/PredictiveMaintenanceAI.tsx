import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  AlertTriangle, 
  TrendingDown, 
  Zap,
  Thermometer,
  Activity,
  Gauge,
  Clock,
  Target,
  CheckCircle
} from 'lucide-react';

const aiPredictions = [
  {
    trainset: 'T-012',
    component: 'Brake System',
    healthScore: 45,
    predictedFailure: '2024-02-15',
    daysToFailure: 12,
    confidence: 92,
    riskLevel: 'Critical',
    maintenanceAction: 'Replace brake pads immediately',
    costImpact: '₹45,000',
    serviceImpact: 'High - Peak hour disruption possible',
    aiRecommendation: 'Schedule maintenance during 23:00-05:00 window'
  },
  {
    trainset: 'T-007',
    component: 'HVAC Compressor',
    healthScore: 62,
    predictedFailure: '2024-02-28',
    daysToFailure: 25,
    confidence: 87,
    riskLevel: 'Medium',
    maintenanceAction: 'Preventive compressor service',
    costImpact: '₹28,000',
    serviceImpact: 'Medium - Passenger comfort affected',
    aiRecommendation: 'Schedule during weekly maintenance window'
  },
  {
    trainset: 'T-018',
    component: 'Door Mechanism',
    healthScore: 78,
    predictedFailure: '2024-03-20',
    daysToFailure: 46,
    confidence: 83,
    riskLevel: 'Low',
    maintenanceAction: 'Lubrication and adjustment',
    costImpact: '₹12,000',
    serviceImpact: 'Low - Minimal service disruption',
    aiRecommendation: 'Include in next scheduled maintenance'
  }
];

const sensorData = [
  { time: '00:00', temperature: 42, vibration: 0.8, current: 15.2, noise: 65 },
  { time: '04:00', temperature: 38, vibration: 0.6, current: 12.8, noise: 62 },
  { time: '08:00', temperature: 55, vibration: 1.2, current: 18.5, noise: 72 },
  { time: '12:00', temperature: 61, vibration: 1.4, current: 22.1, noise: 75 },
  { time: '16:00', temperature: 58, vibration: 1.3, current: 20.8, noise: 74 },
  { time: '20:00', temperature: 47, vibration: 0.9, current: 16.3, noise: 68 }
];

const componentHealth = [
  { component: 'Brakes', health: 45, threshold: 70 },
  { component: 'HVAC', health: 62, threshold: 70 },
  { component: 'Doors', health: 78, threshold: 70 },
  { component: 'Traction', health: 85, threshold: 70 },
  { component: 'Lighting', health: 92, threshold: 70 },
  { component: 'Communication', health: 88, threshold: 70 }
];

export function PredictiveMaintenanceAI() {
  const [currentPrediction, setCurrentPrediction] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrediction((prev) => (prev + 1) % aiPredictions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsAnalyzing(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'Low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Analysis Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: isAnalyzing ? 360 : 0 }}
                  transition={{ duration: 2, repeat: isAnalyzing ? Infinity : 0, ease: "linear" }}
                  className="p-3 bg-white/20 rounded-full"
                >
                  <Brain className="w-8 h-8" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold">AI Predictive Maintenance</h2>
                  <p className="text-purple-200">Advanced Machine Learning Fleet Analysis</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={runAIAnalysis}
                disabled={isAnalyzing}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/30 transition-colors disabled:opacity-50"
              >
                {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Critical Alerts */}
      <AnimatePresence>
        {aiPredictions.filter(p => p.riskLevel === 'Critical').map((prediction, index) => (
          <motion.div
            key={prediction.trainset}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ delay: index * 0.1 }}
          >
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>AI Critical Alert:</strong> {prediction.trainset} {prediction.component} predicted to fail in {prediction.daysToFailure} days 
                (Confidence: {prediction.confidence}%). Immediate action required.
              </AlertDescription>
            </Alert>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Real-time Sensor Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Real-time Sensor Data (T-012)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="Temperature (°C)"
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="vibration" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Vibration (mm/s)"
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Component Health Radar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={componentHealth}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="component" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="Health Score"
                      dataKey="health"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Threshold"
                      dataKey="threshold"
                      stroke="#ef4444"
                      fill="transparent"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Predictions Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI Maintenance Predictions
            </CardTitle>
            <CardDescription>
              Machine learning analysis of component degradation patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPrediction}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {[aiPredictions[currentPrediction]].map((prediction) => (
                  <div key={prediction.trainset} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-semibold">{prediction.trainset} - {prediction.component}</h4>
                        <p className="text-gray-600">AI Confidence: {prediction.confidence}%</p>
                      </div>
                      <Badge className={`${getRiskColor(prediction.riskLevel)} border`}>
                        {prediction.riskLevel} Risk
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <div className="relative">
                          <div className="w-24 h-24 mx-auto rounded-full border-8 border-gray-200 flex items-center justify-center">
                            <div 
                              className="w-16 h-16 rounded-full flex items-center justify-center"
                              style={{ 
                                background: `conic-gradient(${prediction.healthScore < 50 ? '#ef4444' : prediction.healthScore < 70 ? '#f59e0b' : '#10b981'} ${prediction.healthScore * 3.6}deg, #e5e7eb 0deg)` 
                              }}
                            >
                              <span className="text-lg font-bold">{prediction.healthScore}%</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Health Score</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Clock className="w-8 h-8 text-orange-500" />
                        </div>
                        <p className="text-2xl font-bold text-orange-600">{prediction.daysToFailure}</p>
                        <p className="text-sm text-gray-600">Days to Failure</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Gauge className="w-8 h-8 text-blue-500" />
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{prediction.confidence}%</p>
                        <p className="text-sm text-gray-600">AI Confidence</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">Action Required:</span>
                          <span>{prediction.maintenanceAction}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingDown className="w-4 h-4 text-red-500" />
                          <span className="font-medium">Cost Impact:</span>
                          <span>{prediction.costImpact}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">Service Impact:</span>
                          <span>{prediction.serviceImpact}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="font-medium">AI Recommendation:</span>
                          <span>{prediction.aiRecommendation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Prediction Navigation */}
            <div className="flex justify-center gap-2 mt-4">
              {aiPredictions.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentPrediction(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentPrediction ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
