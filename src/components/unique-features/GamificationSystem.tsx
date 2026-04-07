import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap,
  Award,
  Medal,
  Crown,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Gift,
  Flame
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
  points: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
  unlockedAt?: Date;
}

interface WorkerStats {
  name: string;
  level: number;
  experience: number;
  experienceToNext: number;
  totalPoints: number;
  streak: number;
  rank: number;
  totalWorkers: number;
  tasksCompleted: number;
  achievements: Achievement[];
}

const achievements: Achievement[] = [
  {
    id: 'first-task',
    title: 'Getting Started',
    description: 'Complete your first task',
    icon: CheckCircle,
    category: 'Milestone',
    points: 10,
    rarity: 'Common',
    progress: 1,
    maxProgress: 1,
    isUnlocked: true,
    unlockedAt: new Date('2024-02-01')
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Complete 10 tasks in one day',
    icon: Zap,
    category: 'Efficiency',
    points: 50,
    rarity: 'Rare',
    progress: 7,
    maxProgress: 10,
    isUnlocked: false
  },
  {
    id: 'perfect-week',
    title: 'Perfect Week',
    description: 'Complete all tasks for 7 consecutive days',
    icon: Star,
    category: 'Consistency',
    points: 100,
    rarity: 'Epic',
    progress: 5,
    maxProgress: 7,
    isUnlocked: false
  },
  {
    id: 'safety-champion',
    title: 'Safety Champion',
    description: 'Complete 100 safety-related tasks',
    icon: Award,
    category: 'Safety',
    points: 200,
    rarity: 'Legendary',
    progress: 78,
    maxProgress: 100,
    isUnlocked: false
  },
  {
    id: 'team-player',
    title: 'Team Player',
    description: 'Help colleagues complete 25 tasks',
    icon: Users,
    category: 'Collaboration',
    points: 75,
    rarity: 'Rare',
    progress: 15,
    maxProgress: 25,
    isUnlocked: false
  },
  {
    id: 'early-bird',
    title: 'Early Bird',
    description: 'Complete morning shift tasks 30 times',
    icon: Clock,
    category: 'Dedication',
    points: 60,
    rarity: 'Rare',
    progress: 22,
    maxProgress: 30,
    isUnlocked: false
  }
];

const leaderboard = [
  { rank: 1, name: 'Rajesh Kumar', points: 2850, level: 12, category: 'Maintenance' },
  { rank: 2, name: 'Priya Nair', points: 2720, level: 11, category: 'Safety' },
  { rank: 3, name: 'Anil Menon', points: 2650, level: 11, category: 'Operations' },
  { rank: 4, name: 'You', points: 2580, level: 10, category: 'Fitness Certificates' },
  { rank: 5, name: 'Suresh Pillai', points: 2420, level: 10, category: 'Cleaning' }
];

export function GamificationSystem() {
  const [workerStats] = useState<WorkerStats>({
    name: 'Current User',
    level: 10,
    experience: 2580,
    experienceToNext: 2750,
    totalPoints: 2580,
    streak: 12,
    rank: 4,
    totalWorkers: 156,
    tasksCompleted: 247,
    achievements: achievements
  });

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Simulate level up animation
    const timer = setTimeout(() => {
      if (Math.random() > 0.7) {
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-600 bg-gray-100 border-gray-300';
      case 'Rare': return 'text-blue-600 bg-blue-100 border-blue-300';
      case 'Epic': return 'text-purple-600 bg-purple-100 border-purple-300';
      case 'Legendary': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  const categories = ['All', ...new Set(achievements.map(a => a.category))];
  const filteredAchievements = selectedCategory === 'All' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const experiencePercentage = ((workerStats.experience - (workerStats.level - 1) * 250) / 250) * 100;

  return (
    <div className="space-y-6">
      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-center text-white shadow-2xl"
            >
              <Crown className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-2">LEVEL UP!</h2>
              <p className="text-xl">You've reached Level {workerStats.level + 1}!</p>
              <div className="flex justify-center gap-2 mt-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                  >
                    <Star className="w-6 h-6 text-yellow-200" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Player Stats Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <Trophy className="w-10 h-10 text-yellow-400" />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                  >
                    <span className="text-xs font-bold text-black">{workerStats.level}</span>
                  </motion.div>
                </motion.div>
                
                <div>
                  <h2 className="text-2xl font-bold">Level {workerStats.level} Worker</h2>
                  <p className="text-indigo-200">Rank #{workerStats.rank} of {workerStats.totalWorkers}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span className="text-sm">{workerStats.streak} day streak</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{workerStats.tasksCompleted} tasks completed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold">{workerStats.totalPoints.toLocaleString()}</div>
                <div className="text-indigo-200">Total Points</div>
                <div className="mt-4 w-48">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Level {workerStats.level}</span>
                    <span>Level {workerStats.level + 1}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${experiencePercentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                    />
                  </div>
                  <div className="text-xs text-center mt-1">
                    {workerStats.experienceToNext - workerStats.experience} XP to next level
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements and Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  Achievements
                </CardTitle>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 border rounded-lg ${
                      achievement.isUnlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`p-2 rounded-lg ${
                            achievement.isUnlocked ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                          }`}
                        >
                          <achievement.icon className="w-5 h-5" />
                        </motion.div>
                        <div>
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          {!achievement.isUnlocked && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{achievement.progress}/{achievement.maxProgress}</span>
                              </div>
                              <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getRarityColor(achievement.rarity)} border mb-2`}>
                          {achievement.rarity}
                        </Badge>
                        <div className="text-sm font-medium">{achievement.points} XP</div>
                        {achievement.isUnlocked && achievement.unlockedAt && (
                          <div className="text-xs text-gray-500">
                            {achievement.unlockedAt.toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Leaderboard
              </CardTitle>
              <CardDescription>Top performers this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className={`p-3 rounded-lg border ${
                      player.name === 'You' 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            player.rank === 1 ? 'bg-yellow-500' :
                            player.rank === 2 ? 'bg-gray-400' :
                            player.rank === 3 ? 'bg-amber-600' :
                            'bg-blue-500'
                          }`}
                        >
                          {player.rank === 1 ? <Crown className="w-4 h-4" /> :
                           player.rank === 2 ? <Medal className="w-4 h-4" /> :
                           player.rank === 3 ? <Award className="w-4 h-4" /> :
                           player.rank}
                        </motion.div>
                        <div>
                          <div className={`font-medium ${player.name === 'You' ? 'text-blue-600' : ''}`}>
                            {player.name}
                          </div>
                          <div className="text-xs text-gray-500">{player.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{player.points.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Level {player.level}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mt-4 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-center"
              >
                <Gift className="w-5 h-5 mx-auto mb-1" />
                <div className="text-sm font-medium">Weekly Bonus</div>
                <div className="text-xs">Complete 25 more tasks to unlock 500 bonus XP!</div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Daily Challenges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Daily Challenges
            </CardTitle>
            <CardDescription>Complete these for bonus XP and rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Speed Runner', desc: 'Complete 5 tasks in 2 hours', progress: 3, max: 5, reward: 50 },
                { title: 'Perfect Score', desc: 'Complete all tasks without errors', progress: 1, max: 1, reward: 75 },
                { title: 'Team Helper', desc: 'Help 3 colleagues with their tasks', progress: 1, max: 3, reward: 40 }
              ].map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 border rounded-lg bg-gradient-to-br from-green-50 to-blue-50"
                >
                  <h4 className="font-medium mb-2">{challenge.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{challenge.desc}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{challenge.progress}/{challenge.max}</span>
                    </div>
                    <Progress value={(challenge.progress / challenge.max) * 100} className="h-2" />
                    <div className="text-center">
                      <Badge className="bg-green-100 text-green-600">
                        +{challenge.reward} XP
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
