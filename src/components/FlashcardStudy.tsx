
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topic: string;
  difficulty: string;
}

interface FlashcardStudyProps {
  subject: string;
  flashcards: Flashcard[];
  selectedTopic: string | null;
  onBack: () => void;
  onTopicChange: (topicId: string) => void;
}

const FlashcardStudy = ({ subject, flashcards, selectedTopic, onBack }: FlashcardStudyProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentCard = flashcards[currentCardIndex];
  const progressPercentage = flashcards.length > 0 ? ((currentCardIndex + 1) / flashcards.length) * 100 : 0;

  const handleKnowIt = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
      setProgress(progress + 1);
    }
  };

  const handleReviewAgain = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const resetSession = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setProgress(0);
  };

  if (flashcards.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center animate-fade-in">
        <div className="flex items-center mb-8">
          <button 
            onClick={onBack}
            className="mr-4 p-2 rounded-lg hover:bg-tellect-accent-soft transition-colors"
          >
            <svg className="w-6 h-6 text-tellect-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-tellect-primary">No Cards Available</h1>
        </div>
        <p className="text-tellect-neutral-600 mb-8">No flashcards found for the selected topic.</p>
        <button onClick={onBack} className="tellect-button-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
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
          <h1 className="text-3xl font-semibold text-tellect-primary">
            {subject} Study
          </h1>
          <p className="text-tellect-neutral-600">
            {selectedTopic ? `${selectedTopic.charAt(0).toUpperCase() + selectedTopic.slice(1)} • ` : ''}
            {currentCardIndex + 1} of {flashcards.length} cards
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="tellect-progress-bar mb-8 animate-scale-in">
        <div 
          className="tellect-progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Flashcard */}
      <div className="perspective-1000 mb-8">
        <Card 
          className={`tellect-card cursor-pointer transform transition-all duration-500 hover:shadow-xl min-h-[300px] ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={flipCard}
        >
          <CardContent className="p-8 h-full flex flex-col justify-between min-h-[300px]">
            {!isFlipped ? (
              <div className="animate-fade-in">
                <div className="mb-4 flex justify-between items-center">
                  <span className="inline-block px-3 py-1 bg-tellect-accent text-tellect-primary text-sm font-medium rounded-full">
                    {currentCard.topic}
                  </span>
                  <span className="inline-block px-3 py-1 bg-tellect-primary-light text-tellect-primary text-sm font-medium rounded-full">
                    {currentCard.difficulty}
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <h2 className="text-xl font-medium text-tellect-primary text-center leading-relaxed">
                    {currentCard.question}
                  </h2>
                </div>
                <div className="text-center text-tellect-neutral-500 text-sm mt-4">
                  Tap to reveal answer
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-tellect-primary-light text-tellect-primary text-sm font-medium rounded-full">
                    Answer
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-lg text-tellect-neutral-700 text-center leading-relaxed whitespace-pre-line">
                    {currentCard.answer}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      {isFlipped && (
        <div className="flex space-x-4 justify-center animate-slide-in">
          <button
            onClick={handleReviewAgain}
            className="tellect-button-secondary flex-1 max-w-xs"
          >
            Review Again
          </button>
          <button
            onClick={handleKnowIt}
            className="tellect-button-primary flex-1 max-w-xs"
          >
            Know It ✓
          </button>
        </div>
      )}

      {/* Completion Message */}
      {currentCardIndex >= flashcards.length - 1 && isFlipped && (
        <div className="text-center mt-8 animate-fade-in">
          <h3 className="text-xl font-medium text-tellect-primary mb-2">
            Excellent work! 🎉
          </h3>
          <p className="text-tellect-neutral-600 mb-4">
            You've completed this study session. Keep up the great progress!
          </p>
          <div className="flex space-x-4 justify-center">
            <button onClick={resetSession} className="tellect-button-secondary">
              Study Again
            </button>
            <button onClick={onBack} className="tellect-button-primary">
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardStudy;
