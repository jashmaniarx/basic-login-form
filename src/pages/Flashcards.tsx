
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Flashcards = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState(0);

  const flashcards = [
    {
      question: "What is the primary function of mitochondria in cells?",
      answer: "Mitochondria are the powerhouses of the cell, responsible for producing ATP through cellular respiration.",
      subject: "Biology"
    },
    {
      question: "What is the derivative of x² + 3x + 2?",
      answer: "The derivative is 2x + 3",
      subject: "Mathematics"
    },
    {
      question: "Who wrote 'Pride and Prejudice'?",
      answer: "Jane Austen wrote Pride and Prejudice in 1813.",
      subject: "Literature"
    },
    {
      question: "What is the chemical symbol for gold?",
      answer: "Au (from the Latin 'aurum')",
      subject: "Chemistry"
    },
    {
      question: "In what year did World War II end?",
      answer: "World War II ended in 1945.",
      subject: "History"
    }
  ];

  const currentCard = flashcards[currentCardIndex];
  const progressPercentage = ((currentCardIndex + 1) / flashcards.length) * 100;

  const handleKnowIt = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
      setProgress(progress + 1);
    }
  };

  const handleReviewAgain = () => {
    // In a real app, this would add the card back to the review queue
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-tellect-accent-soft to-tellect-primary-light">
      <Navigation />
      
      <main className="container mx-auto px-tellect py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-semibold text-tellect-primary mb-2">
              Quick Review
            </h1>
            <p className="text-tellect-neutral-600">
              {currentCardIndex + 1} of {flashcards.length} cards
            </p>
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
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-tellect-accent text-tellect-primary text-sm font-medium rounded-full">
                        {currentCard.subject}
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
                      <p className="text-lg text-tellect-neutral-700 text-center leading-relaxed">
                        {currentCard.answer}
                      </p>
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
                Great job! 🎉
              </h3>
              <p className="text-tellect-neutral-600 mb-4">
                You've completed today's review session.
              </p>
              <button 
                onClick={() => {
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                  setProgress(0);
                }}
                className="tellect-button-primary"
              >
                Review Again
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Flashcards;
