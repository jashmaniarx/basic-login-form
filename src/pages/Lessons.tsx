
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Lessons = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  const lessons = [
    {
      title: "Introduction to Photosynthesis",
      subject: "Biology",
      sections: [
        {
          type: "content",
          title: "What is Photosynthesis?",
          content: "Photosynthesis is the process by which plants convert sunlight, carbon dioxide, and water into glucose and oxygen. This fundamental process sustains most life on Earth."
        },
        {
          type: "expandable",
          title: "The Chemical Equation",
          content: "6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂",
          hint: "This equation shows the inputs and outputs of photosynthesis."
        },
        {
          type: "quiz",
          question: "Where does photosynthesis primarily occur in plants?",
          options: ["Roots", "Stems", "Leaves", "Flowers"],
          correct: "Leaves"
        },
        {
          type: "content",
          title: "Why Photosynthesis Matters",
          content: "Photosynthesis not only feeds plants but also produces the oxygen we breathe and forms the base of most food chains on Earth."
        }
      ]
    }
  ];

  const lesson = lessons[currentLesson];

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const handleQuizAnswer = (questionId: string, answer: string) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answer });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-tellect-accent-soft to-tellect-primary-light">
      <Navigation />
      
      <main className="container mx-auto px-tellect py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <span className="inline-block px-3 py-1 bg-tellect-accent text-tellect-primary text-sm font-medium rounded-full mb-4">
              {lesson.subject}
            </span>
            <h1 className="text-3xl font-semibold text-tellect-primary mb-4">
              {lesson.title}
            </h1>
            <div className="tellect-progress-bar max-w-md mx-auto">
              <div 
                className="tellect-progress-fill"
                style={{ width: '30%' }}
              />
            </div>
          </div>

          {/* Lesson Content */}
          <div className="space-y-6">
            {lesson.sections.map((section, index) => (
              <Card 
                key={index} 
                className="tellect-card animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  {section.type === 'content' && (
                    <div>
                      <h3 className="text-xl font-medium text-tellect-primary mb-4">
                        {section.title}
                      </h3>
                      <p className="text-tellect-neutral-700 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  )}

                  {section.type === 'expandable' && (
                    <div>
                      <button
                        onClick={() => toggleSection(index)}
                        className="w-full text-left flex items-center justify-between p-4 bg-tellect-accent-soft rounded-tellect hover:bg-tellect-accent transition-colors"
                      >
                        <h3 className="text-lg font-medium text-tellect-primary">
                          {section.title}
                        </h3>
                        <span className={`transform transition-transform ${expandedSections.has(index) ? 'rotate-180' : ''}`}>
                          ↓
                        </span>
                      </button>
                      
                      {expandedSections.has(index) && (
                        <div className="mt-4 p-4 bg-white rounded-tellect animate-fade-in">
                          <div className="font-mono text-lg text-center text-tellect-primary mb-2">
                            {section.content}
                          </div>
                          {section.hint && (
                            <p className="text-sm text-tellect-neutral-600 text-center">
                              💡 {section.hint}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {section.type === 'quiz' && (
                    <div>
                      <h3 className="text-lg font-medium text-tellect-primary mb-4">
                        Quick Check
                      </h3>
                      <p className="text-tellect-neutral-700 mb-4">
                        {section.question}
                      </p>
                      <div className="space-y-2">
                        {section.options?.map((option, optionIndex) => (
                          <button
                            key={optionIndex}
                            onClick={() => handleQuizAnswer(`${index}`, option)}
                            className={`w-full text-left p-3 rounded-tellect border-2 transition-all ${
                              quizAnswers[`${index}`] === option
                                ? option === section.correct
                                  ? 'border-green-400 bg-green-50 text-green-700'
                                  : 'border-red-400 bg-red-50 text-red-700'
                                : 'border-tellect-neutral-300 hover:border-tellect-accent hover:bg-tellect-accent-soft'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {quizAnswers[`${index}`] && quizAnswers[`${index}`] === section.correct && (
                        <p className="text-green-600 text-sm mt-2 animate-fade-in">
                          ✓ Correct! Great understanding.
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 animate-fade-in">
            <button className="tellect-button-secondary" disabled>
              ← Previous
            </button>
            <div className="text-tellect-neutral-500 text-sm">
              Lesson {currentLesson + 1} of {lessons.length}
            </div>
            <button className="tellect-button-primary">
              Next →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Lessons;
