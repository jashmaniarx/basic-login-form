
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Flashcard {
  id: string;
  user_id: string;
  question: string;
  answer: string;
  subject: string;
  difficulty: string;
  times_studied: number;
  times_correct: number;
  created_at: string;
  updated_at: string;
}

export const useFlashcards = (subject?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: flashcards = [], isLoading } = useQuery({
    queryKey: ['flashcards', user?.id, subject],
    queryFn: async () => {
      if (!user) return [];
      
      let query = supabase
        .from('flashcards')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (subject && subject !== 'all') {
        query = query.eq('subject', subject);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Flashcard[];
    },
    enabled: !!user,
  });

  const createFlashcard = useMutation({
    mutationFn: async (flashcard: Omit<Flashcard, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'times_studied' | 'times_correct'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('flashcards')
        .insert({
          ...flashcard,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcards', user?.id] });
    },
  });

  const updateFlashcard = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Flashcard> }) => {
      const { data, error } = await supabase
        .from('flashcards')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcards', user?.id] });
    },
  });

  const deleteFlashcard = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('flashcards')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcards', user?.id] });
    },
  });

  return {
    flashcards,
    isLoading,
    createFlashcard: createFlashcard.mutate,
    updateFlashcard: updateFlashcard.mutate,
    deleteFlashcard: deleteFlashcard.mutate,
  };
};
