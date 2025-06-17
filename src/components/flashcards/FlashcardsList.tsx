
import React, { useState } from 'react';
import { useFlashcards } from '@/hooks/useFlashcards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Play, Edit, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FlashcardsList = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const { flashcards, isLoading, deleteFlashcard } = useFlashcards(selectedSubject);
  const navigate = useNavigate();

  const subjects = ['all', 'math', 'science', 'history', 'language', 'general'];

  const startStudySession = () => {
    if (flashcards.length === 0) return;
    navigate('/flashcards/study', { state: { flashcards } });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-tellect-primary">My Flashcards</h1>
          <p className="text-tellect-neutral-600">
            {flashcards.length} flashcard{flashcards.length !== 1 ? 's' : ''} ready for study
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/ai-generator')} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Create New
          </Button>
          {flashcards.length > 0 && (
            <Button onClick={startStudySession}>
              <Play className="w-4 h-4 mr-2" />
              Start Study Session
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <label className="text-sm font-medium">Filter by subject:</label>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject.charAt(0).toUpperCase() + subject.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {flashcards.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-tellect-neutral-500 mb-4">No flashcards found</p>
            <Button onClick={() => navigate('/ai-generator')}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Flashcards
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {flashcards.map((flashcard) => (
            <Card key={flashcard.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{flashcard.subject}</Badge>
                      <Badge variant="outline">{flashcard.difficulty}</Badge>
                    </div>
                    <h3 className="font-semibold text-lg text-tellect-primary mb-2">
                      {flashcard.question}
                    </h3>
                    <p className="text-tellect-neutral-600 line-clamp-2">
                      {flashcard.answer}
                    </p>
                    <div className="mt-3 text-sm text-tellect-neutral-500">
                      Studied {flashcard.times_studied} times • 
                      {flashcard.times_studied > 0 
                        ? ` ${Math.round((flashcard.times_correct / flashcard.times_studied) * 100)}% accuracy`
                        : ' Not studied yet'
                      }
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => deleteFlashcard(flashcard.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlashcardsList;
