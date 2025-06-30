import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Crown, TrendingUp, Shield, Clock } from "lucide-react";
import { useState } from "react";
import UpgradeModal from "./upgrade-modal";
import { useToast } from "@/hooks/use-toast";

interface RecommendedPart {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  condition: string;
  compatibility: string;
  urgency: "low" | "medium" | "high";
  savingsPercentage?: number;
  estimatedInstallTime: string;
  warrantyPeriod: string;
  aiConfidence: number;
  reason: string;
  imageUrl?: string;
}

export default function AIRecommendations() {
  const [userSubscription] = useState("basic"); // Would come from user context
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { toast } = useToast();
  
  const recommendations: RecommendedPart[] = [
    {
      id: 1,
      name: "Premium Brake Pad Set - Ceramic",
      description: "High-performance ceramic brake pads for enhanced stopping power",
      price: "$89.99",
      originalPrice: "$124.99",
      condition: "New",
      compatibility: "Perfect match for your 2020 BMW 3 Series",
      urgency: "high",
      savingsPercentage: 28,
      estimatedInstallTime: "45 minutes",
      warrantyPeriod: "24 months",
      aiConfidence: 96,
      reason: "Your brake pads are due for replacement based on 35,000 miles driven"
    },
    {
      id: 2,
      name: "Performance Air Filter",
      description: "High-flow air filter for improved engine performance",
      price: "$34.99",
      originalPrice: "$49.99",
      condition: "New",
      compatibility: "BMW 3 Series 2018-2022",
      urgency: "medium",
      savingsPercentage: 30,
      estimatedInstallTime: "15 minutes",
      warrantyPeriod: "12 months",
      aiConfidence: 89,
      reason: "Optimize fuel efficiency and engine performance with regular filter replacement"
    },
    {
      id: 3,
      name: "OEM Oil Filter & Drain Plug",
      description: "Genuine BMW oil filter with drain plug gasket",
      price: "$19.99",
      condition: "New",
      compatibility: "Exact OEM replacement",
      urgency: "low",
      estimatedInstallTime: "20 minutes",
      warrantyPeriod: "6 months",
      aiConfidence: 94,
      reason: "Maintain engine health with genuine OEM components"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'Replace Soon';
      case 'medium': return 'Consider Replacing';
      case 'low': return 'Maintenance Item';
      default: return 'Optional';
    }
  };

  if (userSubscription === "basic") {
    return (
      <Card className="bg-automotive-black-800 border-gold-600/20 mb-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-gold-500" />
            AI-Powered Part Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Crown className="w-16 h-16 text-gold-500 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-white mb-2">Premium Feature</h3>
            <p className="text-gray-400 mb-6">
              Get personalized part recommendations based on your vehicle's needs, 
              driving patterns, and maintenance history.
            </p>
            <Button 
              onClick={() => setShowUpgradeModal(true)}
              className="bg-gold-gradient text-automotive-black-900 font-bold"
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Premium - $29/mo
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleUpgrade = (plan: string) => {
    toast({
      title: "Upgrade Successful!",
      description: plan === 'premium' 
        ? "Welcome to Premium! Your AI recommendations are now active." 
        : "Thank you for your interest! Our sales team will contact you within 24 hours.",
    });
    setShowUpgradeModal(false);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Sparkles className="w-6 h-6 text-gold-500 mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-white">AI Recommendations</h2>
            <p className="text-gray-400">Personalized for your 2020 BMW 3 Series</p>
          </div>
        </div>
        <Badge className="bg-gold-500 text-automotive-black-900 font-bold">
          <Crown className="w-3 h-3 mr-1" />
          Premium Feature
        </Badge>
      </div>

      <div className="grid gap-6">
        {recommendations.map((part) => (
          <Card key={part.id} className="bg-automotive-black-800 border-gold-600/20 hover:border-gold-500/40 transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-bold text-white mr-3">{part.name}</h3>
                    <Badge className={`${getUrgencyColor(part.urgency)} text-white text-xs`}>
                      {getUrgencyText(part.urgency)}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{part.description}</p>
                  <p className="text-gold-400 text-sm font-medium">{part.compatibility}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    {part.originalPrice && (
                      <span className="text-gray-500 line-through text-sm mr-2">{part.originalPrice}</span>
                    )}
                    <span className="text-2xl font-bold text-gold-500">{part.price}</span>
                  </div>
                  {part.savingsPercentage && (
                    <Badge className="bg-green-500 text-white text-xs">
                      Save {part.savingsPercentage}%
                    </Badge>
                  )}
                </div>
              </div>

              <div className="bg-automotive-black-700 rounded-lg p-4 mb-4">
                <div className="flex items-start mb-2">
                  <Zap className="w-4 h-4 text-gold-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium">AI Insight</p>
                    <p className="text-gray-300 text-sm">{part.reason}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 mt-3">
                  <span className="flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {part.aiConfidence}% confidence
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {part.estimatedInstallTime}
                  </span>
                  <span className="flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    {part.warrantyPeriod} warranty
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-gold-gradient text-automotive-black-900 font-bold flex-1">
                  Add to Cart
                </Button>
                <Button variant="outline" className="border-gold-600/30 text-gold-500 hover:bg-gold-500 hover:text-automotive-black-900">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-automotive-black-800 to-gold-900/10 border-gold-600/30 mt-6">
        <CardContent className="p-6 text-center">
          <Sparkles className="w-8 h-8 text-gold-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Premium AI Benefits</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gold-500 font-semibold mb-1">Predictive Maintenance</div>
              <div className="text-gray-400">Know what to replace before it fails</div>
            </div>
            <div>
              <div className="text-gold-500 font-semibold mb-1">Cost Optimization</div>
              <div className="text-gray-400">Find the best deals automatically</div>
            </div>
            <div>
              <div className="text-gold-500 font-semibold mb-1">Perfect Compatibility</div>
              <div className="text-gray-400">Never order the wrong part again</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <UpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
}