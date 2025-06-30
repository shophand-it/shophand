import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, Crown, Sparkles, Zap, Shield, Clock, Users, TrendingUp } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: string) => void;
}

export default function UpgradeModal({ isOpen, onClose, onUpgrade }: UpgradeModalProps) {
  const premiumBenefits = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "AI Part Recommendations",
      description: "Personalized suggestions based on your vehicle and driving patterns"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Priority Delivery",
      description: "30% faster delivery times and first pick on driver routes"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Extended Warranties",
      description: "Up to 24-month warranties on premium parts"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "24/7 Premium Support",
      description: "Dedicated support line with automotive experts"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Volume Discounts",
      description: "Bulk ordering discounts and early access to sales"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Free Installation Referrals",
      description: "Connect with certified mechanics in your area"
    }
  ];

  const businessBenefits = [
    "Everything in Premium",
    "Business account management",
    "Volume pricing (up to 25% off)",
    "Dedicated account manager",
    "API access for integration",
    "Custom invoicing and billing",
    "Fleet management dashboard",
    "Multi-location support"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-automotive-black-800 border-gold-600/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center">
            <Crown className="w-6 h-6 text-gold-500 mr-3" />
            Upgrade to Premium
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-6">
          {/* Premium Plan */}
          <Card className="bg-gradient-to-br from-automotive-black-700 to-gold-900/20 border-gold-500/50 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gold-500 text-automotive-black-900 font-bold">
                <Sparkles className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
            </div>

            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-2">
                <Crown className="w-6 h-6 text-gold-500 mr-2" />
                <CardTitle className="text-white">Premium</CardTitle>
              </div>
              <div className="text-4xl font-bold text-gold-500 mb-2">$29<span className="text-lg">/mo</span></div>
              <p className="text-gray-400">Enhanced experience for frequent users</p>
            </CardHeader>

            <CardContent>
              <div className="space-y-4 mb-6">
                {premiumBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-gold-500 mr-3 mt-1">{benefit.icon}</div>
                    <div>
                      <div className="text-white font-medium text-sm">{benefit.title}</div>
                      <div className="text-gray-400 text-xs">{benefit.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => onUpgrade('premium')} 
                className="w-full bg-gold-gradient text-automotive-black-900 font-bold hover:shadow-lg hover:shadow-gold-500/25"
              >
                Start 7-Day Free Trial
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-2">
                Cancel anytime. No commitment.
              </p>
            </CardContent>
          </Card>

          {/* Business Plan */}
          <Card className="bg-automotive-black-700 border-blue-500/50">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-blue-400 mr-2" />
                <CardTitle className="text-white">Business</CardTitle>
              </div>
              <div className="text-4xl font-bold text-blue-400 mb-2">$149<span className="text-lg">/mo</span></div>
              <p className="text-gray-400">Built for repair shops and small fleets</p>
            </CardHeader>

            <CardContent>
              <div className="space-y-3 mb-6">
                {businessBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start text-sm">
                    <Check className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => onUpgrade('business')} 
                className="w-full bg-blue-500 text-white font-bold hover:bg-blue-600"
              >
                Contact Sales
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-2">
                Custom enterprise solutions available
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-automotive-black-700 border-gold-600/20 mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 text-center">Why Upgrade Now?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gold-500 mb-2">67%</div>
                <p className="text-gray-400 text-sm">Faster part discovery with AI recommendations</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold-500 mb-2">$180</div>
                <p className="text-gray-400 text-sm">Average yearly savings from optimized pricing</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold-500 mb-2">30%</div>
                <p className="text-gray-400 text-sm">Faster delivery with priority routing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-gray-600 text-gray-400 hover:bg-gray-700"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}