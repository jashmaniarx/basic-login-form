
import React from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useFlashcards } from '@/hooks/useFlashcards';
import { useMindmaps } from '@/hooks/useMindmaps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Trophy, BookOpen, Brain, Zap, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { profile, isLoading: profileLoading } = useProfile();
  const { flashcards } = useFlashcards();
  const { mindmaps } = useMindmaps();
  const navigate = useNavigate();

  if (profileLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const xpToNextLevel = 1000 - (profile?.xp || 0) % 1000;
  const levelProgress = ((profile?.xp || 0) % 1000) / 1000 * 100;

  const totalStudied = flashcards.reduce((sum, card) => sum + card.times_studied, 0);
  const averageAccuracy = flashcards.length > 0 
    ? flashcards.reduce((sum, card) => {
        return sum + (card.times_studied > 0 ? (card.times_correct / card.times_studied) : 0);
      }, 0) / flashcards.length * 100
    : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-tellect-primary mb-2">
          Welcome back, {profile?.username || 'Learner'}!
        </h1>
        <p className="text-tellect-neutral-600">
          Ready to continue your learning journey?
        </p>
      </div>

      {/* XP and Level Card */}
      <Card className="bg-gradient-to-r from-tellect-primary to-tellect-accent text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-6 h-6" />
                <span className="text-lg font-semibold">Level {profile?.level || 1}</span>
              </div>
              <div className="text-2xl font-bold mb-2">{profile?.xp || 0} XP</div>
              <div className="text-sm opacity-90">
                {xpToNextLevel} XP to next level
              </div>
            </div>
            <div className="text-right">
              <div className="w-32">
                <Progress value={levelProgress} className="bg-white/20" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flashcards</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flashcards.length}</div>
            <p className="text-xs text-muted-foreground">
              {totalStudied} times studied
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mindmaps</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mindmaps.length}</div>
            <p className="text-xs text-muted-foreground">
              Knowledge maps created
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(averageAccuracy)}%</div>
            <p className="text-xs text-muted-foreground">
              Average accuracy rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => navigate('/ai-generator')} 
              className="h-16 flex-col"
            >
              <Brain className="w-6 h-6 mb-2" />
              Generate with AI
            </Button>
            <Button 
              onClick={() => navigate('/flashcards')} 
              variant="outline" 
              className="h-16 flex-col"
            >
              <BookOpen className="w-6 h-6 mb-2" />
              Study Flashcards
            </Button>
            <Button 
              onClick={() => navigate('/mindmaps')} 
              variant="outline" 
              className="h-16 flex-col"
            >
              <Brain className="w-6 h-6 mb-2" />
              View Mindmaps
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      {flashcards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Flashcards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {flashcards.slice(0, 3).map((card) => (
                <div key={card.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{card.question}</div>
                    <div className="text-sm text-muted-foreground">{card.subject}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {card.times_studied > 0 
                      ? `${Math.round((card.times_correct / card.times_studied) * 100)}% accuracy`
                      : 'Not studied'
                    }
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
