
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Progress = () => {
  const weeklyData = [
    { day: "Mon", minutes: 45, cards: 12 },
    { day: "Tue", minutes: 30, cards: 8 },
    { day: "Wed", minutes: 60, cards: 18 },
    { day: "Thu", minutes: 25, cards: 7 },
    { day: "Fri", minutes: 50, cards: 15 },
    { day: "Sat", minutes: 35, cards: 10 },
    { day: "Sun", minutes: 40, cards: 12 }
  ];

  const topics = [
    { name: "Photosynthesis", mastery: 85, trend: "up", recentActivity: "2 days ago" },
    { name: "Cellular Respiration", mastery: 72, trend: "up", recentActivity: "1 day ago" },
    { name: "DNA Structure", mastery: 68, trend: "stable", recentActivity: "3 days ago" },
    { name: "Mitosis", mastery: 45, trend: "down", recentActivity: "5 days ago" },
    { name: "Protein Synthesis", mastery: 55, trend: "up", recentActivity: "1 day ago" }
  ];

  const maxMinutes = Math.max(...weeklyData.map(d => d.minutes));

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-tellect-accent-soft to-tellect-primary-light">
      <Navigation />
      
      <main className="container mx-auto px-tellect py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl font-semibold text-tellect-primary mb-2">
              Your Learning Journey
            </h1>
            <p className="text-tellect-neutral-600">
              Gentle insights into your progress and growth
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Overview Cards */}
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-6 mb-8">
              <Card className="tellect-card animate-scale-in">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-tellect-primary mb-2">287</div>
                  <div className="text-tellect-neutral-600 text-sm">Total Minutes</div>
                  <div className="text-xs text-green-600 mt-1">+12% this week</div>
                </CardContent>
              </Card>
              
              <Card className="tellect-card animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-tellect-primary mb-2">82</div>
                  <div className="text-tellect-neutral-600 text-sm">Cards Reviewed</div>
                  <div className="text-xs text-green-600 mt-1">+8% this week</div>
                </CardContent>
              </Card>
              
              <Card className="tellect-card animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-tellect-primary mb-2">73%</div>
                  <div className="text-tellect-neutral-600 text-sm">Average Mastery</div>
                  <div className="text-xs text-tellect-accent-hover mt-1">Steady progress</div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Activity */}
            <Card className="tellect-card lg:col-span-2 animate-slide-in">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-tellect-primary mb-6">
                  This Week's Activity
                </h3>
                
                <div className="space-y-4">
                  {weeklyData.map((day, index) => (
                    <div key={day.day} className="flex items-center space-x-4">
                      <div className="w-12 text-sm text-tellect-neutral-600 font-medium">
                        {day.day}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="flex-1 h-8 bg-tellect-neutral-200 rounded-tellect overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-tellect-accent to-tellect-accent-hover transition-all duration-1000 flex items-center justify-end pr-2"
                              style={{ 
                                width: `${(day.minutes / maxMinutes) * 100}%`,
                                transitionDelay: `${index * 0.1}s`
                              }}
                            >
                              <span className="text-xs text-tellect-primary font-medium">
                                {day.minutes}m
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-tellect-neutral-500 w-16">
                            {day.cards} cards
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Focus Areas */}
            <Card className="tellect-card animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-tellect-primary mb-6">
                  Focus Areas
                </h3>
                
                <div className="space-y-4">
                  {topics.filter(topic => topic.mastery < 70).map((topic, index) => (
                    <div key={topic.name} className="p-4 bg-tellect-accent-soft rounded-tellect">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-tellect-primary text-sm">
                          {topic.name}
                        </h4>
                        <span className="text-xs text-tellect-neutral-500">
                          {topic.mastery}%
                        </span>
                      </div>
                      <div className="tellect-progress-bar mb-2">
                        <div 
                          className="tellect-progress-fill"
                          style={{ width: `${topic.mastery}%` }}
                        />
                      </div>
                      <div className="text-xs text-tellect-neutral-600">
                        Last studied {topic.recentActivity}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="tellect-button-primary w-full mt-6 text-sm py-2">
                  Practice Weak Topics
                </button>
              </CardContent>
            </Card>

            {/* Topic Mastery */}
            <Card className="tellect-card lg:col-span-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-tellect-primary mb-6">
                  Topic Mastery Overview
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topics.map((topic, index) => (
                    <div key={topic.name} className="p-4 bg-white rounded-tellect border border-tellect-neutral-200">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-tellect-primary">
                          {topic.name}
                        </h4>
                        <div className="flex items-center space-x-1">
                          <span className={`text-xs ${
                            topic.trend === 'up' ? 'text-green-600' : 
                            topic.trend === 'down' ? 'text-red-500' : 'text-tellect-neutral-500'
                          }`}>
                            {topic.trend === 'up' ? '↗' : topic.trend === 'down' ? '↘' : '→'}
                          </span>
                          <span className="text-sm font-semibold text-tellect-primary">
                            {topic.mastery}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="tellect-progress-bar mb-2">
                        <div 
                          className="tellect-progress-fill"
                          style={{ 
                            width: `${topic.mastery}%`,
                            transitionDelay: `${index * 0.1}s`
                          }}
                        />
                      </div>
                      
                      <div className="text-xs text-tellect-neutral-600 mb-3">
                        {topic.recentActivity}
                      </div>
                      
                      <button className="tellect-button-secondary w-full text-xs py-1">
                        Review
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Progress;
