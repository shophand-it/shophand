import DriverStats from "@/components/driver/driver-stats";
import AvailablePickups from "@/components/driver/available-pickups";
import { AIAssistant } from "@/components/ai/ai-assistant";
import { NeuralNetworkBG } from "@/components/ai/neural-network-bg";

export default function DriverDashboard() {
  return (
    <div className="relative py-8 px-4 bg-automotive-black-900 min-h-screen pb-20 md:pb-8 neural-bg">
      {/* Neural Network Background for Drivers */}
      <NeuralNetworkBG intensity="high" color="cyber" />
      
      {/* Driver AI Assistant */}
      <div className="fixed top-20 right-4 z-50 w-80 max-w-[calc(100vw-2rem)] md:w-96">
        <AIAssistant mode="driver" />
      </div>
      
      <div className="container mx-auto max-w-6xl">
        {/* Futuristic Header Bar */}
        <div className="w-full h-1 bg-cyber-gradient ai-luxury-shimmer mb-8" />
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="futuristic-card">
              <div className="futuristic-card-content">
                <DriverStats />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="futuristic-card">
              <div className="futuristic-card-content">
                <AvailablePickups />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
