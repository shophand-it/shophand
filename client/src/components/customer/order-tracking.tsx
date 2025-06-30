import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, Check, Package, Truck, Home } from "lucide-react";
import type { CurrentOrder } from "@/lib/types";

export default function OrderTracking() {
  const { data: currentOrder, isLoading } = useQuery<CurrentOrder>({
    queryKey: ["/api/orders/mock/current"],
  });

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-automotive-black-800">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Track Your Order</h2>
          <div className="bg-automotive-black-700 rounded-2xl p-8 border border-gold-600/20 animate-pulse">
            <div className="h-6 bg-gray-600 rounded mb-4"></div>
            <div className="h-4 bg-gray-700 rounded mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-12 bg-gray-600 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!currentOrder) {
    return (
      <section className="py-16 px-4 bg-automotive-black-800">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Track Your Order</h2>
          <div className="bg-automotive-black-700 rounded-2xl p-8 border border-gold-600/20 text-center">
            <p className="text-gray-400">No active orders to track</p>
          </div>
        </div>
      </section>
    );
  }

  const getStatusIcon = (status: string, completed: boolean, current?: boolean) => {
    const iconClass = `w-6 h-6 ${current ? 'animate-pulse' : ''}`;
    
    if (status.includes("Confirmed")) return <Check className={iconClass} />;
    if (status.includes("Picked")) return <Package className={iconClass} />;
    if (status.includes("Delivery")) return <Truck className={iconClass} />;
    if (status.includes("Delivered")) return <Home className={iconClass} />;
    
    return <Check className={iconClass} />;
  };

  return (
    <section className="py-16 px-4 bg-automotive-black-800">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Track Your Order</h2>
        
        <div className="bg-automotive-black-700 rounded-2xl p-8 border border-gold-600/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Order #{currentOrder.orderNumber}</h3>
              <p className="text-gray-400">{currentOrder.items[0]?.name}</p>
            </div>
            <div className="text-right">
              <p className="text-gold-500 font-bold">
                Estimated: {new Date(currentOrder.estimatedDeliveryTime).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
              <p className="text-gray-400 text-sm">Driver: {currentOrder.driver.name}</p>
            </div>
          </div>
          
          {/* Progress Tracker */}
          <div className="relative mb-8">
            <div className="flex justify-between items-center mb-8">
              {currentOrder.timeline.map((step, index) => (
                <div key={index} className="flex flex-col items-center relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    step.completed 
                      ? 'bg-gold-500 text-automotive-black-900' 
                      : 'bg-automotive-black-600 border-2 border-gold-600 text-gold-600'
                  }`}>
                    {getStatusIcon(step.status, step.completed, step.current)}
                  </div>
                  <span className={`text-sm font-medium ${
                    step.completed ? 'text-gold-500' : 'text-gray-400'
                  }`}>
                    {step.status}
                  </span>
                  <span className="text-xs text-gray-400">{step.time}</span>
                </div>
              ))}
            </div>
            
            {/* Progress Line */}
            <div className="absolute top-6 left-6 right-6 h-1 bg-automotive-black-600">
              <div className="h-full bg-gold-gradient w-3/4 rounded-full"></div>
            </div>
          </div>
          
          {/* Driver Info */}
          <div className="bg-automotive-black-800 rounded-xl p-6 border border-gold-600/20">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-bold text-white">{currentOrder.driver.name}</h4>
                <p className="text-gray-400 text-sm">
                  {currentOrder.driver.rating} ★ • {currentOrder.driver.totalDeliveries.toLocaleString()} deliveries
                </p>
                <p className="text-gold-500 text-sm">
                  Driving a {currentOrder.driver.vehicle} • Plate: {currentOrder.driver.licensePlate}
                </p>
              </div>
              <div className="flex space-x-3">
                <Button className="bg-gold-gradient text-automotive-black-900">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" className="border-gold-600/30 text-gold-500">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
