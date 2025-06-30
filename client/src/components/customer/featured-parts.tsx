import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Filter, ArrowUpDown, MapPin, Store, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface EnrichedPart {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  condition: string;
  source: string;
  imageUrl?: string;
  estimatedDeliveryTime: number;
  partner: {
    name: string;
    type: string;
    address: string;
  };
  category: {
    name: string;
  };
}

export default function FeaturedParts() {
  const [cartCount, setCartCount] = useState(3);
  const { toast } = useToast();

  const { data: parts = [], isLoading } = useQuery<EnrichedPart[]>({
    queryKey: ["/api/parts"],
  });

  const addToCart = (part: EnrichedPart) => {
    setCartCount(prev => prev + 1);
    toast({
      title: "Added to Cart",
      description: `${part.name} has been added to your cart.`,
    });
  };

  const getConditionBadge = (condition: string) => {
    const variants = {
      new: "bg-gold-500 text-automotive-black-900",
      used: "bg-blue-500 text-white",
      refurbished: "bg-purple-500 text-white",
    };
    return variants[condition as keyof typeof variants] || variants.new;
  };

  const getSourceBadge = (source: string) => {
    const variants = {
      oem: "bg-green-500 text-white",
      aftermarket: "bg-red-500 text-white",
      recycled: "bg-purple-500 text-white",
    };
    return variants[source as keyof typeof variants] || variants.oem;
  };

  const formatDeliveryTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMin = minutes % 60;
    return remainingMin > 0 ? `${hours}h ${remainingMin}m` : `${hours}h`;
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-automotive-black-900">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-white">Featured Parts</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-automotive-black-800 rounded-xl overflow-hidden border border-gold-600/20 animate-pulse">
                <div className="w-full h-48 bg-gray-600"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-600 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded mb-4"></div>
                  <div className="h-8 bg-gray-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-automotive-black-900">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-white">Featured Parts</h2>
          <div className="flex space-x-4">
            <Button variant="outline" className="border-gold-600/30 text-gold-500 hover:bg-gold-500 hover:text-automotive-black-900">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="border-gold-600/30 text-gold-500 hover:bg-gold-500 hover:text-automotive-black-900">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parts.map(part => (
            <div 
              key={part.id}
              className="bg-automotive-black-800 rounded-xl overflow-hidden border border-gold-600/20 hover:border-gold-500 transition-all group"
            >
              <div className="relative">
                <img 
                  src={part.imageUrl || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"} 
                  alt={part.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={getConditionBadge(part.condition)}>
                    {part.condition.toUpperCase()}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className={getSourceBadge(part.source)}>
                    {part.source.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-semibold text-white mb-2">{part.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{part.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gold-500">${part.price}</span>
                    {part.originalPrice && (
                      <span className="text-gray-500 line-through ml-2">${part.originalPrice}</span>
                    )}
                  </div>
                  <div className="text-green-400 text-sm">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {formatDeliveryTime(part.estimatedDeliveryTime)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>
                    <Store className="w-4 h-4 inline mr-1" />
                    {part.partner.name}
                  </span>
                  <span>
                    <MapPin className="w-4 h-4 inline mr-1" />
                    2.3 mi
                  </span>
                </div>
                
                <Button 
                  onClick={() => addToCart(part)}
                  className="w-full bg-gold-gradient text-automotive-black-900 font-bold hover:shadow-lg hover:shadow-gold-500/25"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
