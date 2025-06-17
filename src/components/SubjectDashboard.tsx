
import { Card, CardContent } from "@/components/ui/card";

interface Topic {
  id: string;
  name: string;
  cardCount: number;
  mastery: number;
  icon: string;
}

interface SubjectDashboardProps {
  subject: string;
  icon: string;
  topics: Topic[];
  onStartStudy: () => void;
  onSelectTopics: () => void;
  onTopicSelect: (topicId: string) => void;
}

const SubjectDashboard = ({ 
  subject, 
  icon, 
  topics, 
  onStartStudy, 
  onSelectTopics, 
  onTopicSelect 
}: SubjectDashboardProps) => {
  const totalCards = topics.reduce((sum, topic) => sum + topic.cardCount, 0);
  const averageMastery = Math.round(topics.reduce((sum, topic) => sum + topic.mastery, 0) / topics.length);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4 animate-gentle-bounce">{icon}</div>
        <h1 className="text-4xl font-bold text-tellect-primary mb-4">{subject}</h1>
        <p className="text-xl text-tellect-neutral-600 max-w-2xl mx-auto">
          Master {subject.toLowerCase()} concepts through focused study sessions
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-6 mb-12 animate-scale-in">
        <Card className="tellect-card text-center">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-tellect-primary mb-2">{totalCards}</div>
            <div className="text-tellect-neutral-600">Total Cards</div>
          </CardContent>
        </Card>
        <Card className="tellect-card text-center">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-tellect-primary mb-2">{topics.length}</div>
            <div className="text-tellect-neutral-600">Topics</div>
          </CardContent>
        </Card>
        <Card className="tellect-card text-center">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-tellect-primary mb-2">{averageMastery}%</div>
            <div className="text-tellect-neutral-600">Mastery</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center space-x-4 mb-12 animate-slide-in">
        <button onClick={onStartStudy} className="tellect-button-primary">
          Start Studying
        </button>
        <button onClick={onSelectTopics} className="tellect-button-secondary">
          Choose Topics
        </button>
      </div>

      {/* Topics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {topics.map((topic, index) => (
          <Card 
            key={topic.id} 
            className="tellect-card cursor-pointer group hover:shadow-lg transition-all duration-300 animate-slide-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onTopicSelect(topic.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:animate-gentle-bounce">{topic.icon}</span>
                  <h3 className="text-lg font-semibold text-tellect-primary">{topic.name}</h3>
                </div>
                <span className="text-tellect-accent font-medium">→</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-tellect-primary">{topic.cardCount}</div>
                  <div className="text-tellect-neutral-500">Cards</div>
                </div>
                <div>
                  <div className="font-semibold text-tellect-primary">{topic.mastery}%</div>
                  <div className="text-tellect-neutral-500">Mastery</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 tellect-progress-bar">
                <div 
                  className="tellect-progress-fill"
                  style={{ width: `${topic.mastery}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectDashboard;
