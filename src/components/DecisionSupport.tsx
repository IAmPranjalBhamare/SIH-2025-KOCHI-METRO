import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from "sonner@2.0.3";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { VoiceCommandInterface } from './unique-features/VoiceCommandInterface';
import { 
  Brain, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  PlayCircle,
  PauseCircle,
  Wrench,
  Clock,
  Zap,
  TrendingUp,
  BarChart3,
  Settings,
  RefreshCw,
  Mic,
  Wifi,
  WifiOff,
  Shield,
  Activity,
  MapPin,
  Calendar,
  Users,
  ArrowUp,
  ArrowDown,
  Minimize2,
  Maximize2,
  MessageCircle,
  Languages
} from 'lucide-react';

const decisionRecommendations = [
  {
    trainset: 'T-001',
    recommendation: 'Deploy to Service',
    confidence: 95,
    reasoning: [
      'All fitness certificates valid until March 2024',
      'No pending job cards',
      'Cleaning completed yesterday',
      'Mileage within optimal range (74,523 km)',
      'Currently in optimal stabling position'
    ],
    constraints: [],
    priority: 1
  },
  {
    trainset: 'T-012',
    recommendation: 'Keep on Standby',
    confidence: 82,
    reasoning: [
      'Fitness certificate expires in 2 days',
      'Renewal appointment scheduled for tomorrow',
      'Better to avoid service disruption risk'
    ],
    constraints: [
      'Fitness certificate expiring soon',
      'Telecom clearance pending'
    ],
    priority: 2
  },
  {
    trainset: 'T-023',
    recommendation: 'Send to IBL',
    confidence: 98,
    reasoning: [
      'Quarterly maintenance overdue by 3 days',
      'High mileage threshold exceeded (89,245 km)',
      '2 pending job cards require attention',
      'Branding contract renewal due next week'
    ],
    constraints: [
      'Maintenance overdue',
      'Job cards pending',
      'High mileage'
    ],
    priority: 1
  }
];

const whatIfScenarios = [
  {
    id: 'scenario-1',
    name: 'Peak Hour Demand +20%',
    description: 'Simulate 20% increase in passenger demand during peak hours',
    impact: {
      serviceTakes: 22,
      standbyNeeded: 2,
      maintenanceDeferred: 1,
      punctualityRisk: 'Low'
    }
  },
  {
    id: 'scenario-2',
    name: 'Monsoon Service Disruption',
    description: 'Simulate reduced speed operations due to heavy rainfall',
    impact: {
      serviceTakes: 20,
      standbyNeeded: 4,
      maintenanceDeferred: 1,
      punctualityRisk: 'Medium'
    }
  },
  {
    id: 'scenario-3',
    name: 'Festival Special Service',
    description: 'Extended operating hours for Onam festival season',
    impact: {
      serviceTakes: 24,
      standbyNeeded: 1,
      maintenanceDeferred: 0,
      punctualityRisk: 'High'
    }
  }
];

const optimizationMetrics = {
  currentPlan: {
    serviceReadiness: 92,
    mileageBalance: 87,
    maintenanceCompliance: 94,
    brandingExposure: 78,
    energyEfficiency: 85
  },
  recommendedPlan: {
    serviceReadiness: 96,
    mileageBalance: 92,
    maintenanceCompliance: 98,
    brandingExposure: 85,
    energyEfficiency: 89
  }
};

export function DecisionSupport() {
  const [activeScenario, setActiveScenario] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isApplyingRecommendations, setIsApplyingRecommendations] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [appliedRecommendations, setAppliedRecommendations] = useState(new Set());
  const [realTimeData, setRealTimeData] = useState({
    fleetStatus: { active: 18, standby: 4, maintenance: 3 },
    systemHealth: 98,
    predictiveAccuracy: 94,
    energyEfficiency: 87
  });

  const handleSimulate = (scenario) => {
    setIsSimulating(true);
    setActiveScenario(scenario);
    
    // Simulate processing time
    setTimeout(() => {
      setIsSimulating(false);
    }, 2000);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // Real-time data simulation
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setLastUpdated(new Date());
      
      // Simulate real-time data changes
      setRealTimeData(prev => ({
        fleetStatus: {
          active: prev.fleetStatus.active + Math.floor(Math.random() * 3) - 1,
          standby: prev.fleetStatus.standby + Math.floor(Math.random() * 2) - 1,
          maintenance: prev.fleetStatus.maintenance + Math.floor(Math.random() * 2) - 1
        },
        systemHealth: Math.max(95, Math.min(100, prev.systemHealth + Math.random() * 2 - 1)),
        predictiveAccuracy: Math.max(90, Math.min(99, prev.predictiveAccuracy + Math.random() * 2 - 1)),
        energyEfficiency: Math.max(80, Math.min(95, prev.energyEfficiency + Math.random() * 2 - 1))
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Connection restored", {
        description: "Real-time data sync resumed"
      });
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning("Connection lost", {
        description: "Working in offline mode"
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleApplyAllRecommendations = async () => {
    if (!isOnline) {
      toast.error("No internet connection", {
        description: "Please check your connection and try again"
      });
      return;
    }

    setIsApplyingRecommendations(true);
    
    try {
      // Show initial toast
      toast.info("Applying AI recommendations...", {
        description: "Processing all trainset allocations",
        action: {
          label: "View Progress",
          onClick: () => toast.info("Processing in background...")
        }
      });

      const successfullyApplied = new Set();

      // Simulate API calls for each recommendation
      for (let i = 0; i < decisionRecommendations.length; i++) {
        const rec = decisionRecommendations[i];
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Show progress toast for each trainset
        toast.loading(`Processing ${rec.trainset}: ${rec.recommendation}`, {
          description: `Confidence: ${rec.confidence}% | Priority: ${rec.priority}`,
          duration: 1000
        });
        
        // Simulate potential API call with occasional failure
        const success = Math.random() > 0.1; // 90% success rate
        
        if (success) {
          successfullyApplied.add(rec.trainset);
          await new Promise(resolve => setTimeout(resolve, 300));
        } else {
          toast.error(`Failed to process ${rec.trainset}`, {
            description: "Will retry automatically",
            duration: 2000
          });
        }
      }

      setAppliedRecommendations(successfullyApplied);

      // Final success message
      toast.success("Recommendations applied successfully!", {
        description: `${successfullyApplied.size}/${decisionRecommendations.length} trainsets updated. Fleet optimized.`,
        duration: 4000,
        action: {
          label: "View Report",
          onClick: () => toast.info("Generating detailed report...")
        }
      });

      // Update real-time metrics
      setRealTimeData(prev => ({
        ...prev,
        systemHealth: Math.min(100, prev.systemHealth + 2),
        predictiveAccuracy: Math.min(99, prev.predictiveAccuracy + 1)
      }));

      // Optional: Show summary statistics
      setTimeout(() => {
        toast.success("Fleet Status Updated", {
          description: `Service readiness: ${optimizationMetrics.recommendedPlan.serviceReadiness}% | Efficiency improved by 4.2%`,
          duration: 3000
        });
      }, 1000);

    } catch (error) {
      toast.error("Failed to apply recommendations", {
        description: "System error occurred. Please contact support.",
        duration: 4000,
        action: {
          label: "Retry",
          onClick: () => handleApplyAllRecommendations()
        }
      });
    } finally {
      setIsApplyingRecommendations(false);
    }
  };

  const handleRefreshAnalysis = useCallback(async () => {
    toast.info("Refreshing AI analysis...", {
      description: "Fetching latest data from all systems"
    });

    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLastUpdated(new Date());
    
    toast.success("Analysis updated", {
      description: "All recommendations refreshed with latest data"
    });
  }, []);

  const handleApplyIndividualRecommendation = async (trainset: string) => {
    if (appliedRecommendations.has(trainset)) {
      toast.warning("Already applied", {
        description: `Recommendation for ${trainset} has been applied`
      });
      return;
    }

    const recommendation = decisionRecommendations.find(r => r.trainset === trainset);
    if (!recommendation) return;

    toast.loading(`Applying recommendation for ${trainset}...`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setAppliedRecommendations(prev => new Set([...prev, trainset]));
    
    toast.success(`${trainset} updated successfully`, {
      description: `${recommendation.recommendation} - Confidence: ${recommendation.confidence}%`
    });
  };

  return (
    <div className="space-y-6">
      {/* Real-time Status Header */}
      <Card className="border-2 border-dashed border-blue-200 bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isOnline ? 'bg-green-100' : 'bg-red-100'}`}>
                {isOnline ? <Wifi className="w-5 h-5 text-green-600" /> : <WifiOff className="w-5 h-5 text-red-600" />}
              </div>
              <div>
                <p className="text-sm font-medium">System Status</p>
                <p className={`text-lg font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Fleet Active</p>
                <p className="text-lg font-bold text-blue-600">{realTimeData.fleetStatus.active}/25</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">AI Accuracy</p>
                <p className="text-lg font-bold text-purple-600">{realTimeData.predictiveAccuracy}%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-lg font-bold text-orange-600">
                  {lastUpdated.toLocaleTimeString('en-IN', { timeStyle: 'short' })}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Auto-refresh {autoRefresh ? 'enabled' : 'disabled'}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className="gap-2"
              >
                {autoRefresh ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                {autoRefresh ? 'Disable' : 'Enable'} Auto-refresh
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Users className="w-3 h-3" />
                {appliedRecommendations.size} Applied
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Brain className="w-3 h-3" />
                AI Engine Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="recommendations">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommendations" className="gap-2">
            <Brain className="w-4 h-4" />
            AI Recommendations
          </TabsTrigger>
          <TabsTrigger value="voice" className="gap-2">
            <Mic className="w-4 h-4" />
            Voice Commands
          </TabsTrigger>
          <TabsTrigger value="whatif" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            What-If Analysis
          </TabsTrigger>
          <TabsTrigger value="optimization" className="gap-2">
            <Target className="w-4 h-4" />
            Optimization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-6">
          {/* AI Decision Engine Status */}
          <Alert className={`border-2 ${isOnline ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
            <Brain className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <div>
                AI Decision Engine last updated at {lastUpdated.toLocaleTimeString('en-IN')} IST. 
                Confidence level: High. {isOnline ? 'All data sources synchronized.' : 'Working with cached data.'}
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`}></div>
                <span className="text-xs font-medium">
                  {isOnline ? 'Live' : 'Cached'}
                </span>
              </div>
            </AlertDescription>
          </Alert>

          {/* Recommendations */}
          <div className="space-y-4">
            {decisionRecommendations.map((rec, index) => {
              const isApplied = appliedRecommendations.has(rec.trainset);
              return (
                <Card key={index} className={`transition-all duration-300 ${isApplied ? 'border-green-200 bg-green-50' : 'hover:border-blue-200'}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {rec.recommendation === 'Deploy to Service' && <PlayCircle className="w-5 h-5 text-green-600" />}
                          {rec.recommendation === 'Keep on Standby' && <PauseCircle className="w-5 h-5 text-yellow-600" />}
                          {rec.recommendation === 'Send to IBL' && <Wrench className="w-5 h-5 text-purple-600" />}
                          {rec.trainset}: {rec.recommendation}
                          {isApplied && <CheckCircle className="w-5 h-5 text-green-600 ml-2" />}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4">
                          <span>
                            AI Confidence: <span className={getConfidenceColor(rec.confidence)}>{rec.confidence}%</span>
                          </span>
                          {isApplied && (
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              Applied ✓
                            </Badge>
                          )}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={rec.priority === 1 ? "destructive" : "secondary"}>
                          Priority {rec.priority}
                        </Badge>
                        <Button
                          size="sm"
                          variant={isApplied ? "outline" : "default"}
                          onClick={() => handleApplyIndividualRecommendation(rec.trainset)}
                          disabled={isApplied || !isOnline}
                          className="gap-1"
                        >
                          {isApplied ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              Applied
                            </>
                          ) : (
                            <>
                              <Zap className="w-3 h-3" />
                              Apply
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Supporting Factors
                      </h4>
                      <ul className="space-y-2">
                        {rec.reasoning.map((reason, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {rec.constraints.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                          Constraints & Risks
                        </h4>
                        <ul className="space-y-2">
                          {rec.constraints.map((constraint, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                              {constraint}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 disabled:opacity-50"
              onClick={handleApplyAllRecommendations}
              disabled={isApplyingRecommendations || !isOnline || appliedRecommendations.size === decisionRecommendations.length}
            >
              {isApplyingRecommendations ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Applying Recommendations...
                </>
              ) : appliedRecommendations.size === decisionRecommendations.length ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  All Recommendations Applied
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Apply All Recommendations ({decisionRecommendations.length - appliedRecommendations.size} pending)
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={handleRefreshAnalysis}
              disabled={!isOnline}
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Analysis
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => {
                setAppliedRecommendations(new Set());
                toast.info("Recommendations reset", { description: "You can now reapply recommendations" });
              }}
            >
              <ArrowUp className="w-4 h-4" />
              Reset Status
            </Button>
          </div>

          {/* Quick Stats Summary */}
          {appliedRecommendations.size > 0 && (
            <Card className="mt-4 border-green-200 bg-green-50">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-green-800">Applied Recommendations Summary</h4>
                    <p className="text-sm text-green-600">
                      {appliedRecommendations.size} of {decisionRecommendations.length} recommendations implemented
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-700">
                      {Math.round((appliedRecommendations.size / decisionRecommendations.length) * 100)}%
                    </p>
                    <p className="text-sm text-green-600">Complete</p>
                  </div>
                </div>
                <Progress 
                  value={(appliedRecommendations.size / decisionRecommendations.length) * 100} 
                  className="mt-3 h-2"
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="voice" className="space-y-6">
          <Card className="border-2 border-dashed border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-purple-600" />
                Voice-Controlled Decision Support
              </CardTitle>
              <CardDescription>
                Use voice commands to interact with the AI decision engine and apply recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white rounded-lg border">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    Quick Voice Commands
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>"Apply all recommendations"</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>"Show fleet status"</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>"Refresh analysis"</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>"Apply recommendation for T-001"</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-white rounded-lg border">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Languages className="w-4 h-4 text-green-600" />
                    Supported Languages
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span>🇺🇸</span>
                      <span>English</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🇮🇳</span>
                      <span>മലയാളം (Malayalam)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🇮🇳</span>
                      <span>हिन्दी (Hindi)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🇮🇳</span>
                      <span>தமிழ் (Tamil)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <VoiceCommandInterface />
        </TabsContent>

        <TabsContent value="whatif" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Scenario Simulation
              </CardTitle>
              <CardDescription>
                Test different operational scenarios and their impact on fleet allocation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {whatIfScenarios.map((scenario) => (
                  <Card key={scenario.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{scenario.name}</h4>
                          <p className="text-sm text-gray-600">{scenario.description}</p>
                        </div>
                        <Button
                          onClick={() => handleSimulate(scenario)}
                          disabled={isSimulating}
                          className="gap-2"
                        >
                          {isSimulating && activeScenario?.id === scenario.id ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Zap className="w-4 h-4" />
                          )}
                          Simulate
                        </Button>
                      </div>

                      {activeScenario?.id === scenario.id && !isSimulating && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg">
                          <div className="text-center">
                            <p className="text-2xl font-semibold text-blue-600">{scenario.impact.serviceTakes}</p>
                            <p className="text-xs text-blue-700">Service Trainsets</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-semibold text-yellow-600">{scenario.impact.standbyNeeded}</p>
                            <p className="text-xs text-yellow-700">Standby Required</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-semibold text-purple-600">{scenario.impact.maintenanceDeferred}</p>
                            <p className="text-xs text-purple-700">Maintenance Deferred</p>
                          </div>
                          <div className="text-center">
                            <p className={`text-2xl font-semibold ${getRiskColor(scenario.impact.punctualityRisk)}`}>
                              {scenario.impact.punctualityRisk}
                            </p>
                            <p className="text-xs text-gray-600">Punctuality Risk</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Multi-Objective Optimization
              </CardTitle>
              <CardDescription>
                Compare current plan vs. AI-recommended optimal allocation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.keys(optimizationMetrics.currentPlan).map((metric) => {
                  const current = optimizationMetrics.currentPlan[metric];
                  const recommended = optimizationMetrics.recommendedPlan[metric];
                  const improvement = recommended - current;
                  
                  return (
                    <div key={metric} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium capitalize">
                          {metric.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">Current: {current}%</span>
                          <span className="text-sm text-blue-600">Optimized: {recommended}%</span>
                          {improvement > 0 && (
                            <Badge variant="outline" className="text-green-600">
                              +{improvement}%
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="relative">
                        <Progress value={current} className="h-2 bg-gray-200" />
                        <div 
                          className="absolute top-0 h-2 bg-blue-500 rounded-full opacity-60"
                          style={{ width: `${recommended}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <motion.div 
                    className="text-center p-4 bg-green-50 rounded-lg border border-green-200 hover:border-green-300 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-semibold text-green-700">+4.2%</p>
                    <p className="text-sm text-green-600">Overall Efficiency Gain</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-green-600">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        Improved
                      </Badge>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-semibold text-blue-700">-15min</p>
                    <p className="text-sm text-blue-600">Reduced Planning Time</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-blue-600">
                        <ArrowDown className="w-3 h-3 mr-1" />
                        Faster
                      </Badge>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200 hover:border-purple-300 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Settings className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-semibold text-purple-700">99.7%</p>
                    <p className="text-sm text-purple-600">Predicted Punctuality</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-purple-600">
                        <Shield className="w-3 h-3 mr-1" />
                        Reliable
                      </Badge>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200 hover:border-orange-300 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-2xl font-semibold text-orange-700">{realTimeData.energyEfficiency}%</p>
                    <p className="text-sm text-orange-600">Energy Efficiency</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-orange-600">
                        <Activity className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    </div>
                  </motion.div>
                </div>
                
                {/* Action buttons for optimization */}
                <div className="mt-6 flex justify-center gap-4">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => toast.info("Generating optimization report", { description: "This may take a few moments..." })}
                  >
                    <BarChart3 className="w-4 h-4" />
                    Generate Report
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => toast.info("Exporting data", { description: "Preparing CSV download..." })}
                  >
                    <ArrowDown className="w-4 h-4" />
                    Export Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
