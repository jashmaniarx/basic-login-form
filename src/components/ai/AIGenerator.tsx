
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFlashcards } from '@/hooks/useFlashcards';
import { useMindmaps } from '@/hooks/useMindmaps';
import { useProfile } from '@/hooks/useProfile';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Sparkles, Brain, Zap } from 'lucide-react';

const AIGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [subject, setSubject] = useState('math');
  const [contentType, setContentType] = useState<'flashcards' | 'mindmap'>('flashcards');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  
  const { createFlashcard } = useFlashcards();
  const { createMindmap } = useMindmaps();
  const { updateXP } = useProfile();

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a topic to generate content for');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: {
          prompt: prompt.trim(),
          type: contentType,
          subject,
        },
      });

      if (error) throw error;
      
      setGeneratedContent(data);
      toast.success(`${contentType === 'flashcards' ? 'Flashcards' : 'Mindmap'} generated successfully!`);
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveGeneratedContent = async () => {
    if (!generatedContent) return;

    try {
      if (contentType === 'flashcards' && generatedContent.flashcards) {
        for (const flashcard of generatedContent.flashcards) {
          createFlashcard({
            question: flashcard.question,
            answer: flashcard.answer,
            subject,
            difficulty: 'medium',
          });
        }
        updateXP(50); // Award XP for creating flashcards
        toast.success('Flashcards saved successfully!');
      } else if (contentType === 'mindmap' && generatedContent.mindmap) {
        createMindmap({
          title: generatedContent.mindmap.title,
          nodes: generatedContent.mindmap.nodes,
          edges: generatedContent.mindmap.edges,
        });
        updateXP(75); // Award XP for creating mindmap
        toast.success('Mindmap saved successfully!');
      }
      
      setGeneratedContent(null);
      setPrompt('');
    } catch (error) {
      toast.error('Failed to save content');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-tellect-primary mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8" />
          AI Content Generator
        </h1>
        <p className="text-tellect-neutral-600">
          Generate flashcards and mindmaps instantly with AI
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Generate Learning Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={contentType} onValueChange={(value) => setContentType(value as 'flashcards' | 'mindmap')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              <TabsTrigger value="mindmap">Mindmap</TabsTrigger>
            </TabsList>
            
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="language">Language</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Topic or Study Material
                </label>
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Enter a topic for ${contentType}... e.g., "Quadratic equations" or "Photosynthesis"`}
                  className="min-h-[80px]"
                />
              </div>

              <Button 
                onClick={generateContent} 
                disabled={loading || !prompt.trim()}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Generate {contentType === 'flashcards' ? 'Flashcards' : 'Mindmap'}
                  </>
                )}
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Content Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {contentType === 'flashcards' && generatedContent.flashcards && (
              <div className="space-y-4">
                {generatedContent.flashcards.map((flashcard: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="font-medium text-tellect-primary mb-2">
                      Q: {flashcard.question}
                    </div>
                    <div className="text-tellect-neutral-600">
                      A: {flashcard.answer}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {contentType === 'mindmap' && generatedContent.mindmap && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{generatedContent.mindmap.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Nodes:</h4>
                    <ul className="space-y-1">
                      {generatedContent.mindmap.nodes.map((node: any) => (
                        <li key={node.id} className="text-sm">
                          {node.label} ({node.type})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Connections:</h4>
                    <ul className="space-y-1">
                      {generatedContent.mindmap.edges.map((edge: any) => (
                        <li key={edge.id} className="text-sm">
                          {edge.source} → {edge.target}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6 flex gap-2">
              <Button onClick={saveGeneratedContent} className="flex-1">
                Save to My {contentType === 'flashcards' ? 'Flashcards' : 'Mindmaps'}
              </Button>
              <Button variant="outline" onClick={() => setGeneratedContent(null)}>
                Discard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIGenerator;
