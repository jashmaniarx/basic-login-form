
import { useState } from "react";
import Navigation from "@/components/Navigation";
import SubjectDashboard from "@/components/SubjectDashboard";
import FlashcardStudy from "@/components/FlashcardStudy";
import TopicSelector from "@/components/TopicSelector";

const Science = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'flashcards' | 'topics'>('dashboard');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const scienceTopics = [
    { id: 'physics', name: 'Physics', cardCount: 18, mastery: 78, icon: '⚛️' },
    { id: 'chemistry', name: 'Chemistry', cardCount: 14, mastery: 88, icon: '🧪' },
    { id: 'biology', name: 'Biology', cardCount: 16, mastery: 82, icon: '🧬' },
  ];

  const scienceFlashcards = [
    {
      id: '1',
      question: "What is Newton's second law of motion?",
      answer: "F = ma\n\nForce equals mass times acceleration. This fundamental law describes the relationship between the force applied to an object, its mass, and the resulting acceleration.",
      topic: "physics",
      difficulty: "medium"
    },
    {
      id: '2',
      question: "What is the chemical formula for water?",
      answer: "H₂O\n\nWater consists of two hydrogen atoms bonded to one oxygen atom.",
      topic: "chemistry",
      difficulty: "easy"
    },
    {
      id: '3',
      question: "What is the powerhouse of the cell?",
      answer: "Mitochondria\n\nMitochondria are organelles that produce ATP through cellular respiration, providing energy for cellular processes.",
      topic: "biology",
      difficulty: "easy"
    },
    {
      id: '4',
      question: "What is the speed of light in a vacuum?",
      answer: "299,792,458 meters per second (approximately 3 × 10⁸ m/s)\n\nThis is a fundamental physical constant denoted by 'c'.",
      topic: "physics",
      difficulty: "medium"
    }
  ];

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setCurrentView('flashcards');
  };

  const filteredFlashcards = selectedTopic 
    ? scienceFlashcards.filter(card => card.topic === selectedTopic)
    : scienceFlashcards;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-tellect-accent-soft to-tellect-primary-light">
      <Navigation />
      
      <main className="container mx-auto px-tellect py-12">
        {currentView === 'dashboard' && (
          <SubjectDashboard
            subject="Science"
            icon="🧪"
            topics={scienceTopics}
            onStartStudy={() => setCurrentView('flashcards')}
            onSelectTopics={() => setCurrentView('topics')}
            onTopicSelect={handleTopicSelect}
          />
        )}

        {currentView === 'topics' && (
          <TopicSelector
            subject="Science"
            topics={scienceTopics}
            onBack={() => setCurrentView('dashboard')}
            onTopicSelect={handleTopicSelect}
          />
        )}

        {currentView === 'flashcards' && (
          <FlashcardStudy
            subject="Science"
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

export default Science;
