import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Award, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  Crown,
  Gift,
  Medal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  earned: boolean;
  earnedDate?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface GamificationData {
  level: number;
  xp: number;
  xpToNext: number;
  totalTasks: number;
  completedTasks: number;
  streak: number;
  perfectDays: number;
  achievements: Achievement[];
  weeklyGoal: number;
  weeklyProgress: number;
}

interface GamificationPanelProps {
  userCategory: string;
  onRewardClaim?: (reward: string) => void;
}

export const GamificationPanel: React.FC<GamificationPanelProps> = ({ 
  userCategory,
  onRewardClaim 
}) => {
  const { t } = useLanguage();
  const [data, setData] = useState<GamificationData>({
    level: 12,
    xp: 2840,
    xpToNext: 3000,
    totalTasks: 156,
    completedTasks: 142,
    streak: 7,
    perfectDays: 23,
    weeklyGoal: 25,
    weeklyProgress: 18,
    achievements: [
      {
        id: '1',
        title: 'Perfect Week',
        description: 'Complete all tasks for 7 consecutive days',
        icon: Crown,
        earned: true,
        earnedDate: new Date('2024-01-10'),
        rarity: 'legendary'
      },
      {
        id: '2',
        title: 'Speed Demon',
        description: 'Complete 10 tasks in one day',
        icon: Zap,
        earned: true,
        earnedDate: new Date('2024-01-08'),
        rarity: 'epic'
      },
      {
        id: '3',
        title: 'Safety First',
        description: 'Zero safety incidents for 30 days',
        icon: Award,
        earned: true,
        earnedDate: new Date('2024-01-05'),
        rarity: 'rare'
      },
      {
        id: '4',
        title: 'Team Player',
        description: 'Help 5 colleagues complete their tasks',
        icon: Trophy,
        earned: false,
        rarity: 'common'
      },
      {
        id: '5',
        title: 'Innovation Master',
        description: 'Suggest 3 process improvements',
        icon: Star,
        earned: false,
        rarity: 'epic'
      }
    ]
  });

  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [showRewards, setShowRewards] = useState(false);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        xp: prev.xp + Math.floor(Math.random() * 5),
        weeklyProgress: Math.min(prev.weeklyGoal, prev.weeklyProgress + Math.random() * 0.1)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelProgress = () => {
    return ((data.xp % 1000) / 1000) * 100;
  };

  const getCompletionRate = () => {
    return (data.completedTasks / data.totalTasks) * 100;
  };

  const getWeeklyProgress = () => {
    return (data.weeklyProgress / data.weeklyGoal) * 100;
  };

  const claimReward = (reward: string) => {
    onRewardClaim?.(reward);
    setShowRewards(false);
  };

  return (
    <div className="space-y-4">
      {/* Level & XP Progress */}
      <Card className="bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            {t('performance.level', { level: data.level })}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">XP Progress</span>
            <span className="text-sm text-muted-foreground">
              {data.xp.toLocaleString()} / {data.xpToNext.toLocaleString()}
            </span>
          </div>
          <Progress value={getLevelProgress()} className="h-3" />
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{data.streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{data.perfectDays}</div>
              <div className="text-xs text-muted-foreground">Perfect Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(getCompletionRate())}%
              </div>
              <div className="text-xs text-muted-foreground">Completion</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goal */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-600" />
            Weekly Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Tasks This Week</span>
            <span className="text-sm text-muted-foreground">
              {Math.floor(data.weeklyProgress)} / {data.weeklyGoal}
            </span>
          </div>
          <Progress value={getWeeklyProgress()} className="h-2" />
          {getWeeklyProgress() >= 100 && (
            <div className="mt-2 text-center">
              <Badge variant="default" className="bg-emerald-500">
                <Gift className="h-3 w-3 mr-1" />
                Goal Achieved! Claim Reward
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-600" />
            {t('performance.achievements')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.achievements.slice(0, 3).map((achievement) => (
              <motion.div
                key={achievement.id}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                  achievement.earned 
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className={`p-2 rounded-full ${getRarityColor(achievement.rarity)}`}>
                  <achievement.icon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{achievement.title}</div>
                  <div className="text-xs text-muted-foreground">{achievement.description}</div>
                  {achievement.earned && achievement.earnedDate && (
                    <div className="text-xs text-emerald-600 mt-1">
                      Earned {achievement.earnedDate.toLocaleDateString()}
                    </div>
                  )}
                </div>
                {achievement.earned && (
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                )}
              </motion.div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-3"
            onClick={() => setShowRewards(!showRewards)}
          >
            View All Achievements
          </Button>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
              <span className="text-sm">Tasks completed this month</span>
              <Badge variant="secondary">{data.completedTasks}</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg">
              <span className="text-sm">Average completion time</span>
              <Badge variant="secondary">2.3 hrs</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
              <span className="text-sm">Quality score</span>
              <Badge variant="secondary">98.5%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivational Message */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-4 rounded-lg text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Medal className="h-6 w-6 mx-auto mb-2" />
        <p className="font-medium">Keep up the excellent work!</p>
        <p className="text-sm opacity-90">
          You're in the top 10% of performers this month.
        </p>
      </motion.div>

      {/* New Achievement Notification */}
      {newAchievement && (
        <motion.div
          className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-2xl"
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
        >
          <div className="flex items-center gap-3">
            <newAchievement.icon className="h-6 w-6" />
            <div>
              <div className="font-bold">New Achievement!</div>
              <div className="text-sm">{newAchievement.title}</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
