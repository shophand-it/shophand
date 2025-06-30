import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Building, Globe } from "lucide-react";

export default function SubscriptionPlans() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for individual customers",
      features: [
        "Standard delivery times",
        "Basic part search",
        "Standard customer support",
        "Order tracking"
      ],
      limitations: ["Limited to 5 orders/month", "No priority support"],
      color: "gray",
      icon: null
    },
    {
      name: "Premium",
      price: "$29/mo",
      description: "Enhanced experience for frequent users",
      features: [
        "Priority delivery (30% faster)",
        "Advanced part recommendations",
        "24/7 premium support",
        "Bulk order discounts",
        "Extended warranty options",
        "Free delivery over $50"
      ],
      limitations: [],
      color: "gold",
      icon: <Crown className="w-5 h-5" />,
      popular: true
    },
    {
      name: "Business",
      price: "$149/mo",
      description: "Built for repair shops and small fleets",
      features: [
        "Everything in Premium",
        "Business account management",
        "Volume pricing (up to 25% off)",
        "Dedicated account manager",
        "API access for integration",
        "Custom invoicing and billing",
        "Fleet management dashboard",
        "Multi-location support"
      ],
      limitations: [],
      color: "blue",
      icon: <Building className="w-5 h-5" />
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Scalable solutions for large operations",
      features: [
        "Everything in Business",
        "White-label platform licensing",
        "Custom integrations",
        "Advanced analytics & reporting",
        "Multi-region support",
        "Custom SLA agreements",
        "Dedicated infrastructure",
        "Revenue sharing opportunities"
      ],
      limitations: [],
      color: "purple",
      icon: <Globe className="w-5 h-5" />
    }
  ];

  const getCardColor = (color: string) => {
    switch (color) {
      case 'gold': return 'border-gold-500/50 bg-gradient-to-br from-automotive-black-800 to-gold-900/20';
      case 'blue': return 'border-blue-500/50 bg-gradient-to-br from-automotive-black-800 to-blue-900/20';
      case 'purple': return 'border-purple-500/50 bg-gradient-to-br from-automotive-black-800 to-purple-900/20';
      default: return 'border-gray-600/30 bg-automotive-black-800';
    }
  };

  const getPriceColor = (color: string) => {
    switch (color) {
      case 'gold': return 'text-gold-500';
      case 'blue': return 'text-blue-400';
      case 'purple': return 'text-purple-400';
      default: return 'text-white';
    }
  };

  const getButtonStyle = (color: string) => {
    switch (color) {
      case 'gold': return 'bg-gold-gradient text-automotive-black-900 hover:shadow-lg hover:shadow-gold-500/25';
      case 'blue': return 'bg-blue-500 text-white hover:bg-blue-600';
      case 'purple': return 'bg-purple-500 text-white hover:bg-purple-600';
      default: return 'bg-gray-600 text-white hover:bg-gray-700';
    }
  };

  return (
    <div className="py-16 px-4 bg-automotive-black-900">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Scale Your Business with 
            <span className="text-transparent bg-clip-text bg-gold-gradient"> Premium Features</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From individual customers to enterprise fleets, ShopHand™ grows with your business needs
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${getCardColor(plan.color)} border-2 transition-all hover:scale-105`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gold-500 text-automotive-black-900 font-bold">
                    <Zap className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-2">
                  {plan.icon}
                  <CardTitle className="text-white ml-2">{plan.name}</CardTitle>
                </div>
                <div className={`text-3xl font-bold ${getPriceColor(plan.color)} mb-2`}>
                  {plan.price}
                </div>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start text-sm">
                      <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, lIndex) => (
                    <li key={lIndex} className="flex items-start text-sm">
                      <span className="w-4 h-4 text-red-400 mr-2 mt-0.5 text-center">×</span>
                      <span className="text-gray-500">{limitation}</span>
                    </li>
                  ))}
                </ul>
                
                <Button className={`w-full ${getButtonStyle(plan.color)} font-bold`}>
                  {plan.price === 'Free' ? 'Get Started' : 
                   plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-automotive-black-800 border-gold-600/20 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise Revenue Opportunities</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-gold-500 mb-2">$2.4M</div>
                  <p className="text-gray-400">Average Enterprise Contract Value</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gold-500 mb-2">15-25%</div>
                  <p className="text-gray-400">Revenue Share for White-Label Partners</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gold-500 mb-2">50+</div>
                  <p className="text-gray-400">Markets Ready for Expansion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}