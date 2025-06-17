
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, type, subject } = await req.json();

    let systemPrompt = '';
    if (type === 'flashcards') {
      systemPrompt = `You are an educational content creator. Generate flashcards for the topic "${prompt}" in the subject "${subject}". 
      Return exactly 5 flashcards in this JSON format:
      {
        "flashcards": [
          {"question": "Question text", "answer": "Answer text"},
          {"question": "Question text", "answer": "Answer text"}
        ]
      }
      Make questions clear and answers concise but complete.`;
    } else if (type === 'mindmap') {
      systemPrompt = `You are an educational content creator. Generate a mindmap structure for the topic "${prompt}" in the subject "${subject}".
      Return a mindmap in this JSON format:
      {
        "mindmap": {
          "title": "${prompt}",
          "nodes": [
            {"id": "1", "label": "Central Topic", "position": {"x": 0, "y": 0}, "type": "central"},
            {"id": "2", "label": "Subtopic 1", "position": {"x": -200, "y": -100}, "type": "branch"},
            {"id": "3", "label": "Subtopic 2", "position": {"x": 200, "y": -100}, "type": "branch"}
          ],
          "edges": [
            {"id": "e1-2", "source": "1", "target": "2"},
            {"id": "e1-3", "source": "1", "target": "3"}
          ]
        }
      }
      Create 5-8 nodes with meaningful connections. Position nodes logically around the central topic.`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const parsedContent = JSON.parse(content);
      return new Response(JSON.stringify(parsedContent), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      return new Response(JSON.stringify({ error: 'Failed to parse AI response' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in generate-content function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
