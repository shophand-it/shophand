import { Button } from "@/components/ui/button";
import { Wrench, ShoppingCart, User, RotateCcw, Building } from "lucide-react";
import { useState } from "react";
import type { InterfaceMode } from "@/App";

interface NavigationHeaderProps {
  interfaceMode: InterfaceMode;
  onInterfaceModeChange: (mode: InterfaceMode) => void;
}

export default function NavigationHeader({ 
  interfaceMode, 
  onInterfaceModeChange 
}: NavigationHeaderProps) {
  const [cartCount] = useState(3);

  const toggleInterface = () => {
    if (interfaceMode === "customer") {
      onInterfaceModeChange("driver");
    } else if (interfaceMode === "driver") {
      onInterfaceModeChange("business");
    } else {
      onInterfaceModeChange("customer");
    }
  };

  return (
    <header className="bg-automotive-black-800 border-b border-gold-600/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gold-gradient rounded-lg flex items-center justify-center">
              <Wrench className="text-automotive-black-900 text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ShopHand™</h1>
              <p className="text-xs text-gray-400">Premium Auto Parts</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={toggleInterface}
              className="bg-automotive-black-700 text-gold-500 border border-gold-600/30 hover:bg-gold-500 hover:text-automotive-black-900"
              size="sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {interfaceMode === "customer" ? "Customer" : 
               interfaceMode === "driver" ? "Driver" : "Business"}
            </Button>
            
            {interfaceMode === "customer" && (
              <div className="relative">
                <Button
                  className="bg-automotive-black-700 border border-gold-600/30"
                  size="sm"
                >
                  <ShoppingCart className="text-gold-500 w-4 h-4" />
                  <span className="absolute -top-2 -right-2 bg-gold-500 text-automotive-black-900 rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                </Button>
              </div>
            )}
            
            <Button
              className="bg-automotive-black-700 border border-gold-600/30"
              size="sm"
            >
              <User className="text-gold-500 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
