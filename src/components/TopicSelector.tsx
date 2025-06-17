
import { Card, CardContent } from "@/components/ui/card";

interface Topic {
  id: string;
  name: string;
  cardCount: number;
  mastery: number;
  icon: string;
}

interface TopicSelectorProps {
  subject: string;
  topics: Topic[];
  onBack: () => void;
  onTopicSelect: (topicId: string) => void;
}

const TopicSelector = ({ subject, topics, onBack, onTopicSelect }: TopicSelectorProps) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack}
          className="mr-4 p-2 rounded-lg hover:bg-tellect-accent-soft transition-colors"
        >
          <svg className="w-6 h-6 text-tellect-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-tellect-primary">{subject} Topics</h1>
          <p className="text-tellect-neutral-600">Choose a topic to focus your study session</p>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {topics.map((topic, index) => (
          <Card 
            key={topic.id} 
            className="tellect-card cursor-pointer group hover:shadow-lg transition-all duration-300 animate-slide-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onTopicSelect(topic.id)}
          >
            <CardContent className="p-8">
              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:animate-gentle-bounce">{topic.icon}</div>
                <h3 className="text-xl font-semibold text-tellect-primary mb-2">{topic.name}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-tellect-primary">{topic.cardCount}</div>
                    <div className="text-tellect-neutral-500">Cards</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-tellect-primary">{topic.mastery}%</div>
                    <div className="text-tellect-neutral-500">Mastery</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="tellect-progress-bar mb-4">
                  <div 
                    className="tellect-progress-fill"
                    style={{ width: `${topic.mastery}%` }}
                  />
                </div>

                <div className="text-tellect-accent font-medium group-hover:text-tellect-primary transition-colors">
                  Start Topic →
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;
