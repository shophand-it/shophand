import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Search, MessageCircle, Sparkles, Cpu, Eye, Mic } from 'lucide-react';

interface AIAssistantProps {
  mode?: 'customer' | 'driver' | 'business';
}

interface AIResponse {
  message: string;
  suggestions?: string[];
  confidence: number;
  type: 'recommendation' | 'analysis' | 'prediction' | 'search';
}

export function AIAssistant({ mode = 'customer' }: AIAssistantProps) {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [aiCapabilities, setAiCapabilities] = useState({
    partRecognition: true,
    predictiveAnalysis: true,
    naturalLanguage: true,
    visualInspection: true,
    voiceCommands: true,
    smartRecommendations: true
  });

  // Simulate AI responses based on mode
  const generateAIResponse = async (userQuery: string): Promise<AIResponse> => {
    setIsThinking(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let response: AIResponse;
    
    if (mode === 'customer') {
      if (userQuery.toLowerCase().includes('brake')) {
        response = {
          message: "Based on your 2020 BMW 3 Series, I recommend premium ceramic brake pads for optimal performance. Found 3 suppliers with same-day delivery.",
          suggestions: [
            "View compatible brake pads",
            "Compare supplier prices",
            "Schedule installation"
          ],
          confidence: 0.94,
          type: 'recommendation'
        };
      } else if (userQuery.toLowerCase().includes('engine')) {
        response = {
          message: "Neural analysis suggests checking your engine mount. AI-detected vibration patterns indicate potential wear. Predicted replacement in 2-3 months.",
          suggestions: [
            "Order engine mount now",
            "Schedule diagnostic",
            "View maintenance timeline"
          ],
          confidence: 0.87,
          type: 'prediction'
        };
      } else {
        response = {
          message: "AI searching across 15,000+ parts database... Found optimal matches for your vehicle using quantum search algorithms.",
          suggestions: [
            "View all results",
            "Filter by price",
            "Sort by delivery time"
          ],
          confidence: 0.91,
          type: 'search'
        };
      }
    } else if (mode === 'driver') {
      response = {
        message: "AI route optimization active. Detected high-demand area with 5 premium aircraft part deliveries. Predicted earnings: $380 in next 3 hours.",
        suggestions: [
          "Accept optimal route",
          "View detailed breakdown",
          "Set delivery preferences"
        ],
        confidence: 0.96,
        type: 'analysis'
      };
    } else {
      response = {
        message: "Predictive analytics show 23% increase in marine part demand. AI recommends stocking watercraft engines and propellers for summer season.",
        suggestions: [
          "View inventory recommendations",
          "Analyze market trends",
          "Set automated ordering"
        ],
        confidence: 0.89,
        type: 'prediction'
      };
    }
    
    setIsThinking(false);
    return response;
  };

  const handleQuery = async () => {
    if (!query.trim()) return;
    
    const response = await generateAIResponse(query);
    setResponses(prev => [response, ...prev]);
    setQuery('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleQuery();
    }
  };

  const getAIStatusColor = () => {
    if (isThinking) return 'text-luxury-gold';
    if (isActive) return 'text-neon-green';
    return 'text-cyber-cyan';
  };

  const getAICapabilityDescription = () => {
    switch (mode) {
      case 'customer':
        return 'Smart Part Recognition • Predictive Maintenance • Visual Search';
      case 'driver':
        return 'Route Optimization • Earnings Prediction • Traffic Analysis';
      case 'business':
        return 'Market Intelligence • Inventory AI • Demand Forecasting';
      default:
        return 'AI-Powered Intelligence Platform';
    }
  };

  return (
    <div className="futuristic-card ai-float">
      <div className="futuristic-card-content">
        {/* AI Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Brain 
                className={`w-6 h-6 ${getAIStatusColor()} transition-colors duration-300`}
              />
              {isActive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-green rounded-full animate-pulse" />
              )}
            </div>
            <div>
              <h3 className="ai-heading text-lg">ShopHand AI™</h3>
              <p className="cyber-text text-xs">{getAICapabilityDescription()}</p>
            </div>
          </div>
          
          <Button
            onClick={() => setIsActive(!isActive)}
            className={`ai-button text-xs px-3 py-1 ${isActive ? 'ai-quantum-glow' : ''}`}
          >
            {isActive ? 'ACTIVE' : 'ACTIVATE'}
          </Button>
        </div>

        {/* AI Capabilities */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Badge variant="outline" className="glass-morphism text-xs p-1">
            <Eye className="w-3 h-3 mr-1" />
            Vision
          </Badge>
          <Badge variant="outline" className="glass-morphism text-xs p-1">
            <Cpu className="w-3 h-3 mr-1" />
            Neural
          </Badge>
          <Badge variant="outline" className="glass-morphism text-xs p-1">
            <Mic className="w-3 h-3 mr-1" />
            Voice
          </Badge>
        </div>

        {isActive && (
          <>
            {/* AI Query Input */}
            <div className="relative mb-4">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask AI anything about parts, routes, or analytics..."
                className="futuristic-input pr-12 ai-cyber-scan"
              />
              <Button
                onClick={handleQuery}
                disabled={isThinking}
                className="absolute right-1 top-1 bottom-1 px-3 ai-button"
              >
                {isThinking ? (
                  <div className="quantum-spinner w-4 h-4" />
                ) : (
                  <Zap className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* AI Responses */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {responses.map((response, index) => (
                <div key={index} className="ai-hologram rounded-lg p-3 border border-neural-primary/20">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-neural-primary" />
                      <span className="cyber-text text-xs capitalize">{response.type}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(response.confidence * 100)}% confidence
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-foreground mb-3">{response.message}</p>
                  
                  {response.suggestions && (
                    <div className="space-y-1">
                      {response.suggestions.map((suggestion, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="w-full text-xs justify-start glass-morphism hover:bg-neural-primary/20"
                        >
                          <MessageCircle className="w-3 h-3 mr-2" />
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* AI Quick Actions */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button variant="outline" className="text-xs glass-morphism">
                <Search className="w-3 h-3 mr-1" />
                Smart Search
              </Button>
              <Button variant="outline" className="text-xs glass-morphism">
                <Brain className="w-3 h-3 mr-1" />
                Analyze
              </Button>
            </div>
          </>
        )}

        {!isActive && (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-neural-gradient flex items-center justify-center ai-neural-network">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm text-muted-foreground">
              Activate AI to unlock intelligent recommendations, predictive analytics, and automated insights.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}