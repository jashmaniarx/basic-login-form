
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Index = () => {
  const features = [
    {
      title: "Quick Review",
      description: "Swipe through flashcards with smooth, focused learning",
      link: "/flashcards",
      icon: "🎯",
      color: "bg-gradient-to-br from-tellect-accent-soft to-tellect-primary-light"
    },
    {
      title: "Lessons",
      description: "Interactive content designed for calm, deep understanding",
      link: "/lessons",
      icon: "📚",
      color: "bg-gradient-to-br from-tellect-primary-light to-tellect-accent-soft"
    },
    {
      title: "Mind Map",
      description: "Visualize connections between concepts intuitively",
      link: "/mindmap",
      icon: "🧠",
      color: "bg-gradient-to-br from-tellect-accent-soft via-white to-tellect-primary-light"
    },
    {
      title: "Progress",
      description: "Gentle insights into your learning journey",
      link: "/progress",
      icon: "📈",
      color: "bg-gradient-to-br from-tellect-primary-light to-white"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-tellect-accent-soft to-tellect-primary-light">
      <Navigation />
      
      <main className="container mx-auto px-tellect py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-tellect-primary mb-4 animate-gentle-bounce">
              Tellect
            </h1>
            <p className="text-xl text-tellect-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Your calm companion for effortless learning. Make revision a habit you'll actually enjoy.
            </p>
          </div>
          
          <div className="flex justify-center space-x-4 mb-12">
            <Link 
              to="/flashcards" 
              className="tellect-button-primary animate-scale-in"
              style={{ animationDelay: '0.2s' }}
            >
              Start Learning
            </Link>
            <Link 
              to="/progress" 
              className="tellect-button-secondary animate-scale-in"
              style={{ animationDelay: '0.4s' }}
            >
              View Progress
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Link 
              key={feature.title} 
              to={feature.link}
              className="group animate-slide-in"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <Card className="tellect-card group-hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className={`p-8 ${feature.color} rounded-tellect h-full flex flex-col justify-between`}>
                  <div>
                    <div className="text-4xl mb-4 group-hover:animate-gentle-bounce">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-tellect-primary mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-tellect-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="mt-6 text-tellect-accent font-medium group-hover:text-tellect-primary transition-colors">
                    Explore →
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div>
              <div className="text-2xl font-semibold text-tellect-primary">12</div>
              <div className="text-sm text-tellect-neutral-500">Cards today</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-tellect-primary">3</div>
              <div className="text-sm text-tellect-neutral-500">Lessons</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-tellect-primary">85%</div>
              <div className="text-sm text-tellect-neutral-500">Mastery</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
