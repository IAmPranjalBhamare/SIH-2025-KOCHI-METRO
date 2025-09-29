import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Train, 
  Shield, 
  Wrench, 
  Zap, 
  BarChart3, 
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Leaf,
  DollarSign,
  Clock,
  Brain,
  Star,
  Users,
  Target,
  Award,
  ChevronRight,
  Play,
  Trophy,
  Heart,
  Coffee,
  Gift
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const challenges = [
  {
    icon: Shield,
    title: 'Fitness Certificates',
    description: 'Safety compliance tracking',
    color: 'from-emerald-500 to-teal-600',
    delay: 0.1
  },
  {
    icon: Wrench,
    title: 'Job-Card Status',
    description: 'Maintenance workflow management',
    color: 'from-orange-500 to-red-600',
    delay: 0.2
  },
  {
    icon: Zap,
    title: 'Branding Priorities',
    description: 'Revenue optimization',
    color: 'from-purple-500 to-indigo-600',
    delay: 0.3
  },
  {
    icon: BarChart3,
    title: 'Mileage Balancing',
    description: 'Fleet utilization optimization',
    color: 'from-blue-500 to-cyan-600',
    delay: 0.4
  },
  {
    icon: Calendar,
    title: 'Cleaning & Detailing',
    description: 'Resource scheduling',
    color: 'from-green-500 to-lime-600',
    delay: 0.5
  },
  {
    icon: MapPin,
    title: 'Stabling Geometry',
    description: 'Physical space optimization',
    color: 'from-pink-500 to-rose-600',
    delay: 0.6
  }
];

const benefits = [
  {
    icon: Train,
    title: 'Higher Fleet Availability',
    description: 'Optimize train scheduling for maximum operational efficiency',
    value: '95%',
    metric: 'Uptime',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: DollarSign,
    title: 'Lower Maintenance',
    description: 'Predictive analytics reduce unexpected repairs',
    value: '40%',
    metric: 'Cost Reduction',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Leaf,
    title: 'Sustainable Operations',
    description: 'Environmental impact reduction through smart operations',
    value: '25%',
    metric: 'Carbon Savings',
    color: 'from-teal-500 to-green-500'
  }
];

const features = [
  'Real-time AI decision making',
  'Predictive maintenance alerts',
  'Multi-language support (മലയാളം)',
  'Voice command interface',
  '3D fleet visualization',
  'Mobile-responsive design'
];

const stats = [
  { value: '25', label: 'Trainsets', icon: Train },
  { value: '2M+', label: 'Passengers/Month', icon: Users },
  { value: '99.5%', label: 'Target Punctuality', icon: Target },
  { value: '24/7', label: 'Operations', icon: Clock }
];

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const { t } = useLanguage();
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        />
        
        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            className={`absolute w-${4 + i * 2} h-${4 + i * 2} border-2 border-blue-400/20 rounded-full`}
            style={{
              top: `${10 + i * 10}%`,
              left: `${5 + i * 11}%`,
            }}
          />
        ))}

        {/* Metro Rail Lines */}
        <motion.div
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"
        />
        <motion.div
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
        />
      </div>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 px-6 pt-16 pb-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg"
              >
                <Train className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-3xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                >
                  {t('landing.title')}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="text-sm text-emerald-600"
                >
                  കൊച്ചി മെട്രോ റെയിൽ ലിമിറ്റഡ്
                </motion.p>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center gap-3"
            >
              <LanguageSelector variant="header" />
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                <Trophy className="w-3 h-3 mr-1" />
                Professional System
              </Badge>
              <Badge variant="outline" className="border-emerald-300 text-emerald-700">
                <Award className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </motion.div>
          </motion.div>

          {/* Main Hero Content */}
          <div className="max-w-4xl mx-auto">
            {/* Main Content */}
            <div className="space-y-8 text-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
                  <Brain className="w-3 h-3 mr-1" />
                  AI-Powered Solution
                </Badge>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="text-5xl mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-emerald-700 bg-clip-text text-transparent leading-tight"
                >
                  {t('landing.title')}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="text-xl text-gray-600 mb-2"
                >
                  {t('landing.subtitle')}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="text-lg text-gray-700 mb-8 leading-relaxed"
                >
                  Empowering our workforce with intelligent tools for better efficiency, safety, and job satisfaction.
                  Your daily operations, simplified and enhanced with AI.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={onGetStarted}
                      size="lg" 
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl px-8 py-6 text-lg group"
                    >
                      {t('landing.getStarted')}
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-8 py-6 text-lg"
                      onClick={() => setIsVideoPlaying(true)}
                    >
                      <Play className="mr-2 w-5 h-5" />
                      Watch Demo
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Stats Row */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto"
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`text-center p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg ${
                        index === currentStatIndex ? 'ring-2 ring-emerald-400' : ''
                      }`}
                    >
                      <motion.div
                        animate={index === currentStatIndex ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <stat.icon className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                      </motion.div>
                      <div className="text-2xl text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>


          </div>
        </div>
      </motion.section>

      {/* 6 Key Challenges Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 px-6 py-16 bg-white/60 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
              <Target className="w-3 h-3 mr-1" />
              Problem Solving
            </Badge>
            <h3 className="text-4xl mb-6 bg-gradient-to-r from-gray-900 to-purple-700 bg-clip-text text-transparent">
              6 Key Challenges We Solve
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI system addresses the complex interdependencies in metro operations, 
              transforming manual processes into intelligent automation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => {
              const [showDetails, setShowDetails] = useState(false);
              
              const challengeDetails = {
                'Fitness Certificates': {
                  problem: 'Manual tracking of safety certificates leads to expired documents, compliance risks, and potential service disruptions.',
                  solution: 'AI automatically monitors certificate expiry dates, predicts renewal schedules, and ensures 100% compliance.',
                  benefits: ['Zero safety violations', 'Automated renewal alerts', 'Compliance reporting', 'Risk mitigation'],
                  impact: 'Reduces safety incidents by 95% and ensures uninterrupted service'
                },
                'Job-Card Status': {
                  problem: 'Paper-based maintenance workflows cause delays, miscommunication, and incomplete task tracking.',
                  solution: 'Digital job cards with real-time status updates, automated workflows, and predictive maintenance scheduling.',
                  benefits: ['Real-time tracking', 'Automated workflows', 'Digital documentation', 'Performance analytics'],
                  impact: 'Reduces maintenance time by 30% and improves task completion rate to 98%'
                },
                'Branding Priorities': {
                  problem: 'Ad revenue optimization requires manual coordination between multiple departments and advertisers.',
                  solution: 'AI optimizes branding placement based on ridership patterns, route popularity, and revenue potential.',
                  benefits: ['Revenue optimization', 'Automated scheduling', 'Performance tracking', 'Client management'],
                  impact: 'Increases advertising revenue by 25% through intelligent placement strategies'
                },
                'Mileage Balancing': {
                  problem: 'Uneven train usage leads to premature wear on some trains while others remain underutilized.',
                  solution: 'AI balances mileage across the fleet by optimizing train rotation and service assignments.',
                  benefits: ['Extended train life', 'Uniform wear patterns', 'Cost optimization', 'Predictive planning'],
                  impact: 'Extends fleet lifespan by 20% and reduces replacement costs significantly'
                },
                'Cleaning & Detailing': {
                  problem: 'Manual scheduling of cleaning crews leads to missed services, inefficient resource allocation, and passenger complaints.',
                  solution: 'Smart scheduling system optimizes cleaning crew assignments based on usage patterns and priority.',
                  benefits: ['Optimized scheduling', 'Resource efficiency', 'Quality tracking', 'Performance monitoring'],
                  impact: 'Improves passenger satisfaction by 40% and reduces cleaning costs by 15%'
                },
                'Stabling Geometry': {
                  problem: 'Inefficient yard space utilization and manual train positioning causes delays and operational bottlenecks.',
                  solution: 'AI optimizes train positioning in yards using 3D geometry analysis and movement predictions.',
                  benefits: ['Space optimization', '3D visualization', 'Movement efficiency', 'Conflict prevention'],
                  impact: 'Reduces stabling time by 35% and increases yard capacity utilization to 92%'
                }
              };

              const details = challengeDetails[challenge.title as keyof typeof challengeDetails];

              return (
                <motion.div
                  key={challenge.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: challenge.delay }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative h-full">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${challenge.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />
                    <CardContent className="p-8 relative">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`p-4 bg-gradient-to-r ${challenge.color} rounded-xl w-fit mb-6 shadow-lg`}
                      >
                        <challenge.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h4 className="text-xl mb-3 text-gray-900">{challenge.title}</h4>
                      <p className="text-gray-600 mb-4">{challenge.description}</p>
                      
                      <AnimatePresence>
                        {showDetails && details && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-4 space-y-4"
                          >
                            <div className="border-t border-gray-200 pt-4">
                              <div className="space-y-3">
                                <div>
                                  <h6 className="text-sm text-red-600 mb-1">Problem:</h6>
                                  <p className="text-sm text-gray-700">{details.problem}</p>
                                </div>
                                <div>
                                  <h6 className="text-sm text-blue-600 mb-1">AI Solution:</h6>
                                  <p className="text-sm text-gray-700">{details.solution}</p>
                                </div>
                                <div>
                                  <h6 className="text-sm text-emerald-600 mb-1">Key Benefits:</h6>
                                  <ul className="text-sm text-gray-700 space-y-1">
                                    {details.benefits.map((benefit, idx) => (
                                      <li key={idx} className="flex items-center gap-2">
                                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                                        {benefit}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg">
                                  <h6 className="text-sm text-purple-600 mb-1">Impact:</h6>
                                  <p className="text-sm text-gray-800">{details.impact}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center text-emerald-600 cursor-pointer"
                        onClick={() => setShowDetails(!showDetails)}
                      >
                        <span className="text-sm mr-2">{showDetails ? 'Show less' : 'Learn more'}</span>
                        <motion.div
                          animate={{ rotate: showDetails ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* AI Transformation Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 px-6 py-16"
      >

      </motion.section>

      {/* Benefits Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 px-6 py-16 bg-white/60 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">
              <TrendingUp className="w-3 h-3 mr-1" />
              Key Benefits
            </Badge>
            <h3 className="text-4xl mb-6 bg-gradient-to-r from-gray-900 to-green-700 bg-clip-text text-transparent">
              Measurable Impact on Operations
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative h-full">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  <CardContent className="p-8 relative text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`p-4 bg-gradient-to-r ${benefit.color} rounded-full w-fit mx-auto mb-6 shadow-lg`}
                    >
                      <benefit.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="text-4xl mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {benefit.value}
                    </div>
                    <div className="text-sm text-gray-500 mb-4">{benefit.metric}</div>
                    <h4 className="text-xl mb-3 text-gray-900">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 px-6 py-16"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
              <Star className="w-3 h-3 mr-1" />
              Advanced Features
            </Badge>
            <h3 className="text-4xl mb-6 bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              Cutting-Edge Technology Stack
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/30"
              >
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Worker Appreciation Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 px-6 py-16 bg-gradient-to-br from-purple-50 to-pink-50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
              <Heart className="w-3 h-3 mr-1" />
              Worker Appreciation
            </Badge>
            <h3 className="text-4xl mb-6 bg-gradient-to-r from-gray-900 to-purple-700 bg-clip-text text-transparent">
              Built for Our Heroes
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every feature designed to make your workday better, safer, and more rewarding.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-fit mx-auto mb-6 shadow-lg"
              >
                <Trophy className="w-12 h-12 text-white" />
              </motion.div>
              <h4 className="text-xl mb-3 text-gray-900">Recognition & Rewards</h4>
              <p className="text-gray-600">
                Earn points, unlock achievements, and get recognized for your excellent work. 
                Your contributions matter and are celebrated.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-fit mx-auto mb-6 shadow-lg"
              >
                <Coffee className="w-12 h-12 text-white" />
              </motion.div>
              <h4 className="text-xl mb-3 text-gray-900">Work-Life Balance</h4>
              <p className="text-gray-600">
                Smart scheduling and AI assistance reduce stress and overtime. 
                Spend more quality time with your family.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-fit mx-auto mb-6 shadow-lg"
              >
                <Gift className="w-12 h-12 text-white" />
              </motion.div>
              <h4 className="text-xl mb-3 text-gray-900">Skill Development</h4>
              <p className="text-gray-600">
                Learn new technologies, improve your expertise, and advance your career 
                with AI-powered training recommendations.
              </p>
            </motion.div>
          </div>

          {/* Worker Testimonial */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl"
          >
            <div className="text-6xl mb-4">👷‍♂️</div>
            <blockquote className="text-xl text-gray-700 mb-4 italic">
              "This system makes my job so much easier. I can focus on what I do best 
              while the AI handles the complex scheduling. My work satisfaction has improved significantly!"
            </blockquote>
            <p className="text-emerald-600 font-medium">- Rajesh Kumar, Senior Maintenance Technician</p>
            <p className="text-sm text-gray-500">കൊച്ചി മെട്രോ - 8 years of service</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer CTA */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 px-6 py-16 bg-gradient-to-r from-emerald-600 to-teal-600"
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl mb-6"
          >
            Join Our Smart Metro Family
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 text-emerald-100"
          >
            Experience the future of metro operations - where technology serves people, not the other way around.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onGetStarted}
                size="lg" 
                className="bg-white text-emerald-600 hover:bg-gray-100 shadow-xl px-8 py-6 text-lg"
              >
                {t('landing.getStarted')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-sm text-emerald-200"
          >
            <p>© 2025 Kochi Metro Rail Limited. Professional Fleet Management System.</p>
            <p className="mt-2">കേരളത്തിന്റെ അഭിമാനം • ഇന്ത്യയുടെ ഭാവി</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-2xl mb-4 text-gray-900">Demo Video Coming Soon</h4>
              <p className="text-gray-600 mb-6">Our interactive demo will showcase the full capabilities of the MetroOps AI system.</p>
              <Button onClick={() => setIsVideoPlaying(false)}>
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}