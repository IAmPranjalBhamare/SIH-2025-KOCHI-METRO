import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Coffee, 
  Star, 
  Trophy,
  Clock,
  Target,
  Users,
  TrendingUp,
  Zap,
  Gift
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useLanguage } from '../contexts/LanguageContext';

interface WorkerMotivationProps {
  category: string;
}

const motivationalMessages = [
  "Your dedication keeps Kochi Metro running smoothly! 🚇",
  "Every task you complete makes thousands of passengers' journeys better! ✨", 
  "You're an essential part of Kerala's pride! 🌴",
  "Your expertise and care ensure safe travels for everyone! 🛡️",
  "Thank you for being a Metro Hero! 🦸‍♂️",
  "Your hard work is the backbone of our operations! 💪"
];

const achievements = [
  { icon: Trophy, title: "Perfect Week", description: "7 days of excellent work", earned: true },
  { icon: Star, title: "Safety Champion", description: "30 days incident-free", earned: true },
  { icon: Target, title: "Efficiency Expert", description: "Tasks completed ahead of schedule", earned: false },
  { icon: Heart, title: "Team Player", description: "Helped 5+ colleagues this month", earned: true }
];

export const WorkerMotivation: React.FC<WorkerMotivationProps> = ({ category }) => {
  const { t } = useLanguage();
  const [currentMessage, setCurrentMessage] = useState(0);
  const [todayScore, setTodayScore] = useState(85);
  const [weeklyGoal, setWeeklyGoal] = useState(78);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % motivationalMessages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Daily Motivation */}
      <motion.div
        key={currentMessage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="h-6 w-6 text-red-200" />
              </motion.div>
              <p className="text-sm font-medium">{motivationalMessages[currentMessage]}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            Today's Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Overall Score</span>
              <span className="text-sm font-medium">{todayScore}%</span>
            </div>
            <Progress value={todayScore} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">12</div>
              <div className="text-xs text-blue-800">Tasks Done</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">0</div>
              <div className="text-xs text-green-800">Issues Today</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goal */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-4 w-4 text-purple-600" />
            Weekly Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Progress</span>
              <span className="text-sm font-medium">{weeklyGoal}%</span>
            </div>
            <Progress value={weeklyGoal} className="h-2" />
            <p className="text-xs text-muted-foreground">
              You're doing great! Just 22% more to reach this week's target.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Achievements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Trophy className="h-4 w-4 text-yellow-600" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {achievements.slice(0, 3).map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  achievement.earned 
                    ? 'bg-yellow-50 border border-yellow-200' 
                    : 'bg-gray-50 border border-gray-200 opacity-60'
                }`}
              >
                <achievement.icon className={`h-4 w-4 ${
                  achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                }`} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{achievement.title}</div>
                  <div className="text-xs text-muted-foreground">{achievement.description}</div>
                </div>
                {achievement.earned && (
                  <Badge variant="secondary" className="text-xs">Earned</Badge>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Work-Life Balance Tip */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Coffee className="h-5 w-5 text-purple-600" />
            <div>
              <div className="text-sm font-medium text-purple-800">Break Reminder</div>
              <div className="text-xs text-purple-600">
                You've been working for 2 hours. Take a 10-minute break! ☕
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Spirit */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <div className="text-sm font-medium text-blue-800">Team Update</div>
              <div className="text-xs text-blue-600">
                Your team completed 96% of daily targets! Excellent teamwork! 🎉
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
