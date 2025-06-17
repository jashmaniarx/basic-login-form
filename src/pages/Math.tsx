
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import SubjectDashboard from "@/components/SubjectDashboard";
import FlashcardStudy from "@/components/FlashcardStudy";
import TopicSelector from "@/components/TopicSelector";

const Math = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'flashcards' | 'topics'>('dashboard');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const mathTopics = [
    { id: 'algebra', name: 'Algebra', cardCount: 15, mastery: 85, icon: '🔤' },
    { id: 'calculus', name: 'Calculus', cardCount: 12, mastery: 72, icon: '∫' },
    { id: 'geometry', name: 'Geometry', cardCount: 10, mastery: 90, icon: '📐' },
    { id: 'statistics', name: 'Statistics', cardCount: 8, mastery: 65, icon: '📊' },
  ];

  const mathFlashcards = [
    {
      id: '1',
      question: "What is the derivative of x²?",
      answer: "The derivative of x² is 2x",
      topic: "calculus",
      difficulty: "easy"
    },
    {
      id: '2',
      question: "Solve for x: 2x + 5 = 15",
      answer: "x = 5\n\nStep-by-step:\n2x + 5 = 15\n2x = 15 - 5\n2x = 10\nx = 5",
      topic: "algebra",
      difficulty: "easy"
    },
    {
      id: '3',
      question: "What is the area of a circle with radius r?",
      answer: "A = πr²\n\nThe area of a circle is π (pi) times the radius squared.",
      topic: "geometry",
      difficulty: "medium"
    },
    {
      id: '4',
      question: "What is the mean of the dataset: 2, 4, 6, 8, 10?",
      answer: "Mean = 6\n\nCalculation: (2 + 4 + 6 + 8 + 10) ÷ 5 = 30 ÷ 5 = 6",
      topic: "statistics",
      difficulty: "easy"
    }
  ];

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setCurrentView('flashcards');
  };

  const filteredFlashcards = selectedTopic 
    ? mathFlashcards.filter(card => card.topic === selectedTopic)
    : mathFlashcards;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-tellect-accent-soft to-tellect-primary-light">
      <Navigation />
      
      <main className="container mx-auto px-tellect py-12">
        {currentView === 'dashboard' && (
          <SubjectDashboard
            subject="Mathematics"
            icon="🔢"
            topics={mathTopics}
            onStartStudy={() => setCurrentView('flashcards')}
            onSelectTopics={() => setCurrentView('topics')}
            onTopicSelect={handleTopicSelect}
          />
        )}

        {currentView === 'topics' && (
          <TopicSelector
            subject="Mathematics"
            topics={mathTopics}
            onBack={() => setCurrentView('dashboard')}
            onTopicSelect={handleTopicSelect}
          />
        )}

        {currentView === 'flashcards' && (
          <FlashcardStudy
            subject="Mathematics"
            flashcards={filteredFlashcards}
            selectedTopic={selectedTopic}
            onBack={() => setCurrentView('dashboard')}
            onTopicChange={(topicId) => {
              setSelectedTopic(topicId);
              setCurrentView('flashcards');
            }}
          />
        )}
      </main>
    </div>
  );
};

export default Math;
