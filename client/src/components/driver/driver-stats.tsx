import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToggleLeft, Pause, Star, Clock, DollarSign, Package } from "lucide-react";
import { useState } from "react";

export default function DriverStats() {
  const [isOnline, setIsOnline] = useState(true);
  
  const stats = {
    deliveries: 8,
    earnings: "$127.50",
    rating: 4.9,
    onlineTime: "6h 42m",
  };

  const currentDelivery = {
    orderNumber: "SH-2024-001",
    earnings: "$15.75",
    items: "BMW Brake Disc Set",
    pickup: {
      name: "BMW Dealership",
      address: "1234 Auto Plaza Dr",
    },
    delivery: {
      customerName: "John Smith",
      address: "5678 Residential St",
    },
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <div>
      {/* Driver Stats Card */}
      <div className="bg-automotive-black-800 rounded-2xl p-6 border border-gold-600/20 mb-6">
        <h3 className="text-xl font-bold text-white mb-6">Today's Stats</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 flex items-center">
              <Package className="w-4 h-4 mr-2" />
              Deliveries
            </span>
            <span className="text-2xl font-bold text-gold-500">{stats.deliveries}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Earnings
            </span>
            <span className="text-2xl font-bold text-gold-500">{stats.earnings}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Rating
            </span>
            <span className="text-2xl font-bold text-gold-500">{stats.rating} ★</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Online Time
            </span>
            <span className="text-2xl font-bold text-gold-500">{stats.onlineTime}</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gold-600/20">
          <Button 
            onClick={toggleOnlineStatus}
            className={`w-full font-bold py-3 rounded-lg mb-3 ${
              isOnline 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            <ToggleLeft className="w-4 h-4 mr-2" />
            {isOnline ? 'Online - Ready for Pickups' : 'Offline'}
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-gold-600/30 text-gold-500"
          >
            <Pause className="w-4 h-4 mr-2" />
            Take a Break
          </Button>
        </div>
      </div>
      
      {/* Current Delivery */}
      <div className="bg-automotive-black-800 rounded-2xl p-6 border border-gold-600/20">
        <h3 className="text-lg font-bold text-white mb-4">Current Delivery</h3>
        <div className="bg-gold-gradient rounded-xl p-4 text-automotive-black-900 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">{currentDelivery.orderNumber}</span>
            <span className="font-bold">{currentDelivery.earnings}</span>
          </div>
          <p className="text-sm">{currentDelivery.items}</p>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center space-x-3">
            <Package className="text-gold-500 w-4 h-4" />
            <div>
              <p className="text-white font-medium">{currentDelivery.pickup.name}</p>
              <p className="text-gray-400">{currentDelivery.pickup.address}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Package className="text-gold-500 w-4 h-4" />
            <div>
              <p className="text-white font-medium">Customer: {currentDelivery.delivery.customerName}</p>
              <p className="text-gray-400">{currentDelivery.delivery.address}</p>
            </div>
          </div>
        </div>
        
        <Button className="w-full bg-gold-gradient text-automotive-black-900 font-bold py-3 rounded-lg mt-4">
          Navigate to Customer
        </Button>
      </div>
    </div>
  );
}
