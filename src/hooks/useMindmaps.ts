
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface MindmapNode {
  id: string;
  label: string;
  position: { x: number; y: number };
  type: string;
}

interface MindmapEdge {
  id: string;
  source: string;
  target: string;
}

interface Mindmap {
  id: string;
  user_id: string;
  title: string;
  nodes: MindmapNode[];
  edges: MindmapEdge[];
  created_at: string;
  updated_at: string;
}

export const useMindmaps = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: mindmaps = [], isLoading } = useQuery({
    queryKey: ['mindmaps', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('mindmaps')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Mindmap[];
    },
    enabled: !!user,
  });

  const createMindmap = useMutation({
    mutationFn: async (mindmap: Omit<Mindmap, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('mindmaps')
        .insert({
          ...mindmap,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mindmaps', user?.id] });
    },
  });

  const updateMindmap = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Mindmap> }) => {
      const { data, error } = await supabase
        .from('mindmaps')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mindmaps', user?.id] });
    },
  });

  const deleteMindmap = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('mindmaps')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mindmaps', user?.id] });
    },
  });

  return {
    mindmaps,
    isLoading,
    createMindmap: createMindmap.mutate,
    updateMindmap: updateMindmap.mutate,
    deleteMindmap: deleteMindmap.mutate,
  };
};
