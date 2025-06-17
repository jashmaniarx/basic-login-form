
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Index = () => {
  const subjects = [
    {
      title: "Mathematics",
      description: "Algebra, Calculus, Geometry, and more mathematical concepts",
      link: "/math",
      icon: "🔢",
      color: "bg-gradient-to-br from-tellect-accent-soft to-tellect-primary-light",
      stats: { flashcards: 45, topics: 8, mastery: 78 }
    },
    {
      title: "Science",
      description: "Physics, Chemistry, Biology, and scientific principles",
      link: "/science",
      icon: "🧪",
      color: "bg-gradient-to-br from-tellect-primary-light to-tellect-accent-soft",
      stats: { flashcards: 38, topics: 6, mastery: 85 }
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
              Your calm companion for effortless learning. Master Math and Science through focused, engaging study sessions.
            </p>
          </div>
          
          <div className="flex justify-center space-x-4 mb-12">
            <Link 
              to="/math" 
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

        {/* Subject Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {subjects.map((subject, index) => (
            <Link 
              key={subject.title} 
              to={subject.link}
              className="group animate-slide-in"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <Card className="tellect-card group-hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className={`p-8 ${subject.color} rounded-tellect h-full`}>
                  <div className="text-4xl mb-4 group-hover:animate-gentle-bounce">
                    {subject.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-tellect-primary mb-3">
                    {subject.title}
                  </h3>
                  <p className="text-tellect-neutral-600 leading-relaxed mb-6">
                    {subject.description}
                  </p>
                  
                  {/* Subject Stats */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-tellect-primary">{subject.stats.flashcards}</div>
                      <div className="text-tellect-neutral-500">Cards</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-tellect-primary">{subject.stats.topics}</div>
                      <div className="text-tellect-neutral-500">Topics</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-tellect-primary">{subject.stats.mastery}%</div>
                      <div className="text-tellect-neutral-500">Mastery</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-tellect-accent font-medium group-hover:text-tellect-primary transition-colors">
                    Explore →
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Overall Stats */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div>
              <div className="text-2xl font-semibold text-tellect-primary">83</div>
              <div className="text-sm text-tellect-neutral-500">Total Cards</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-tellect-primary">14</div>
              <div className="text-sm text-tellect-neutral-500">Topics</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-tellect-primary">81%</div>
              <div className="text-sm text-tellect-neutral-500">Overall</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
