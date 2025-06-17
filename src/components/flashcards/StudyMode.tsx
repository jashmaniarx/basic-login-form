
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useFlashcards } from '@/hooks/useFlashcards';
import { useProfile } from '@/hooks/useProfile';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { toast } from 'sonner';

const StudyMode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateFlashcard } = useFlashcards();
  const { updateXP } = useProfile();
  
  const flashcards = location.state?.flashcards || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    total: flashcards.length,
  });

  useEffect(() => {
    if (flashcards.length === 0) {
      navigate('/flashcards');
    }
  }, [flashcards, navigate]);

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + (showAnswer ? 0.5 : 0)) / flashcards.length) * 100;

  const handleAnswer = (isCorrect: boolean) => {
    const newStats = {
      ...sessionStats,
      correct: sessionStats.correct + (isCorrect ? 1 : 0),
      incorrect: sessionStats.incorrect + (isCorrect ? 0 : 1),
    };
    setSessionStats(newStats);

    // Update flashcard statistics
    updateFlashcard({
      id: currentCard.id,
      updates: {
        times_studied: currentCard.times_studied + 1,
        times_correct: currentCard.times_correct + (isCorrect ? 1 : 0),
      },
    });

    // Award XP for correct answers
    if (isCorrect) {
      updateXP(10);
    }

    // Move to next card or end session
    if (currentIndex + 1 < flashcards.length) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      // Session completed
      const totalXP = newStats.correct * 10;
      updateXP(totalXP);
      toast.success(`Session completed! Earned ${totalXP} XP`);
      navigate('/flashcards/results', { state: { stats: newStats } });
    }
  };

  const flipCard = () => {
    setShowAnswer(!showAnswer);
  };

  if (flashcards.length === 0) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-tellect-primary mb-2">Study Session</h1>
        <p className="text-tellect-neutral-600">
          Card {currentIndex + 1} of {flashcards.length}
        </p>
        <Progress value={progress} className="mt-4" />
      </div>

      <Card className="min-h-[400px] cursor-pointer" onClick={flipCard}>
        <CardContent className="p-8 flex flex-col justify-center items-center text-center h-full">
          {!showAnswer ? (
            <div>
              <div className="text-sm text-tellect-neutral-500 mb-4">QUESTION</div>
              <h2 className="text-2xl font-semibold text-tellect-primary mb-6">
                {currentCard.question}
              </h2>
              <p className="text-tellect-neutral-600">Click to reveal answer</p>
            </div>
          ) : (
            <div>
              <div className="text-sm text-tellect-neutral-500 mb-4">ANSWER</div>
              <h2 className="text-xl text-tellect-neutral-700 mb-6">
                {currentCard.answer}
              </h2>
              <p className="text-tellect-neutral-600">How did you do?</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        {!showAnswer ? (
          <Button onClick={flipCard} variant="outline" className="flex-1 max-w-xs">
            <RotateCcw className="w-4 h-4 mr-2" />
            Show Answer
          </Button>
        ) : (
          <>
            <Button 
              onClick={() => handleAnswer(false)} 
              variant="outline" 
              className="flex-1 max-w-xs text-red-600 border-red-200"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Need Review
            </Button>
            <Button 
              onClick={() => handleAnswer(true)} 
              className="flex-1 max-w-xs bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Got It!
            </Button>
          </>
        )}
      </div>

      <div className="flex justify-center gap-8 text-center">
        <div>
          <div className="text-2xl font-bold text-green-600">{sessionStats.correct}</div>
          <div className="text-sm text-tellect-neutral-500">Correct</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-red-600">{sessionStats.incorrect}</div>
          <div className="text-sm text-tellect-neutral-500">Review</div>
        </div>
      </div>
    </div>
  );
};

export default StudyMode;
