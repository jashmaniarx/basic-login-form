
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const MindMap = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const nodes = [
    {
      id: "photosynthesis",
      title: "Photosynthesis",
      x: 50,
      y: 50,
      mastery: 85,
      connections: ["chloroplasts", "sunlight", "glucose"],
      description: "The process by which plants convert light energy into chemical energy."
    },
    {
      id: "chloroplasts",
      title: "Chloroplasts",
      x: 20,
      y: 30,
      mastery: 70,
      connections: ["photosynthesis"],
      description: "Organelles where photosynthesis occurs in plant cells."
    },
    {
      id: "sunlight",
      title: "Sunlight",
      x: 80,
      y: 30,
      mastery: 90,
      connections: ["photosynthesis", "energy"],
      description: "The source of energy for photosynthesis."
    },
    {
      id: "glucose",
      title: "Glucose",
      x: 50,
      y: 80,
      mastery: 75,
      connections: ["photosynthesis", "cellular-respiration"],
      description: "Sugar molecule produced during photosynthesis."
    },
    {
      id: "energy",
      title: "Energy",
      x: 80,
      y: 70,
      mastery: 65,
      connections: ["sunlight", "cellular-respiration"],
      description: "The capacity to do work, transferred through biological processes."
    },
    {
      id: "cellular-respiration",
      title: "Cellular Respiration",
      x: 20,
      y: 80,
      mastery: 60,
      connections: ["glucose", "energy"],
      description: "Process that breaks down glucose to release energy."
    }
  ];

  const getNodeColor = (mastery: number) => {
    if (mastery >= 80) return "bg-tellect-accent";
    if (mastery >= 60) return "bg-yellow-200";
    return "bg-red-200";
  };

  const getConnectionPath = (node1: any, node2: any) => {
    const x1 = node1.x;
    const y1 = node1.y;
    const x2 = node2.x;
    const y2 = node2.y;
    
    return `M${x1},${y1} Q${(x1 + x2) / 2},${(y1 + y2) / 2 - 10} ${x2},${y2}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-tellect-accent-soft to-tellect-primary-light">
      <Navigation />
      
      <main className="container mx-auto px-tellect py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-semibold text-tellect-primary mb-2">
              Mind Map
            </h1>
            <p className="text-tellect-neutral-600 mb-6">
              Explore connections between concepts visually
            </p>
            
            {/* Controls */}
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                className="tellect-button-secondary px-4 py-2 text-sm"
              >
                Zoom Out
              </button>
              <span className="flex items-center text-tellect-neutral-600">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}
                className="tellect-button-secondary px-4 py-2 text-sm"
              >
                Zoom In
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Mind Map Canvas */}
            <Card className="tellect-card flex-1 h-[600px] overflow-hidden animate-scale-in">
              <CardContent className="p-0 h-full relative">
                <div 
                  className="w-full h-full relative bg-gradient-to-br from-white to-tellect-accent-soft"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
                >
                  {/* Connections */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {nodes.map(node => 
                      node.connections.map(connectionId => {
                        const connectedNode = nodes.find(n => n.id === connectionId);
                        if (!connectedNode) return null;
                        
                        return (
                          <path
                            key={`${node.id}-${connectionId}`}
                            d={getConnectionPath(node, connectedNode)}
                            stroke="rgba(186, 240, 223, 0.6)"
                            strokeWidth="2"
                            fill="none"
                            className="animate-fade-in"
                          />
                        );
                      })
                    )}
                  </svg>

                  {/* Nodes */}
                  {nodes.map((node, index) => (
                    <div
                      key={node.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer animate-scale-in`}
                      style={{ 
                        left: `${node.x}%`, 
                        top: `${node.y}%`,
                        animationDelay: `${index * 0.1}s`
                      }}
                      onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                    >
                      <div className={`
                        w-20 h-20 rounded-full ${getNodeColor(node.mastery)} 
                        flex items-center justify-center text-tellect-primary font-medium text-sm
                        shadow-md hover:shadow-lg transition-all duration-300 border-2 border-white
                        ${selectedNode === node.id ? 'ring-4 ring-tellect-accent scale-110' : 'hover:scale-105'}
                      `}>
                        <div className="text-center">
                          <div className="font-semibold text-xs leading-tight">
                            {node.title.split(' ').map((word, i) => (
                              <div key={i}>{word}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Mastery indicator */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="w-12 h-1 bg-tellect-neutral-300 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-tellect-accent transition-all duration-500"
                            style={{ width: `${node.mastery}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Node Details Panel */}
            <div className="w-80">
              {selectedNode ? (
                <Card className="tellect-card animate-slide-in">
                  <CardContent className="p-6">
                    {(() => {
                      const node = nodes.find(n => n.id === selectedNode);
                      if (!node) return null;
                      
                      return (
                        <div>
                          <h3 className="text-xl font-semibold text-tellect-primary mb-4">
                            {node.title}
                          </h3>
                          
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-tellect-neutral-600">Mastery</span>
                              <span className="text-sm font-medium text-tellect-primary">{node.mastery}%</span>
                            </div>
                            <div className="tellect-progress-bar">
                              <div 
                                className="tellect-progress-fill"
                                style={{ width: `${node.mastery}%` }}
                              />
                            </div>
                          </div>

                          <p className="text-tellect-neutral-700 mb-6 leading-relaxed">
                            {node.description}
                          </p>

                          <div className="mb-6">
                            <h4 className="font-medium text-tellect-primary mb-2">Connected to:</h4>
                            <div className="space-y-1">
                              {node.connections.map(connectionId => {
                                const connectedNode = nodes.find(n => n.id === connectionId);
                                if (!connectedNode) return null;
                                
                                return (
                                  <button
                                    key={connectionId}
                                    onClick={() => setSelectedNode(connectionId)}
                                    className="block w-full text-left px-3 py-2 text-sm text-tellect-neutral-600 hover:text-tellect-primary hover:bg-tellect-accent-soft rounded-lg transition-colors"
                                  >
                                    → {connectedNode.title}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <button className="tellect-button-primary w-full text-sm py-2">
                              Study This Topic
                            </button>
                            <button className="tellect-button-secondary w-full text-sm py-2">
                              Practice Questions
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              ) : (
                <Card className="tellect-card animate-fade-in">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">🧠</div>
                    <h3 className="text-lg font-medium text-tellect-primary mb-2">
                      Explore Your Knowledge
                    </h3>
                    <p className="text-tellect-neutral-600 text-sm">
                      Click on any concept to see connections and dive deeper into your learning.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MindMap;
