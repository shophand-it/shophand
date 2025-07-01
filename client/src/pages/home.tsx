import HeroSection from "@/components/customer/hero-section";
import CategoryGrid from "@/components/customer/category-grid";
import FeaturedParts from "@/components/customer/featured-parts";
import OrderTracking from "@/components/customer/order-tracking";
import AIRecommendations from "@/components/customer/ai-recommendations";
import MobileFeatures from "@/components/mobile/mobile-features";
import { AIAssistant } from "@/components/ai/ai-assistant";
import { NeuralNetworkBG } from "@/components/ai/neural-network-bg";
import { PartsDeliveryTracker } from "@/components/delivery/parts-delivery-tracker";
import { PartsSearchDelivery } from "@/components/delivery/parts-search-delivery";
import { ComplianceNotice } from "@/components/legal/compliance-notice";

export default function Home() {
  // Detect if running in mobile app environment
  const isNative = typeof window !== 'undefined' && 
    (window.navigator?.userAgent?.includes('CapacitorJS') || 
     window.location?.hostname === 'localhost');

  return (
    <div className="relative pb-20 md:pb-0 neural-bg min-h-screen">
      {/* Clean Hero Section */}
      <HeroSection />
      
      <MobileFeatures isNative={isNative} />
      
      {/* Enhanced Content Sections with Parts Delivery Focus */}
      <div className="space-y-8 px-4">
        {/* Primary Focus: Active Deliveries */}
        <div className="futuristic-card">
          <div className="futuristic-card-content">
            <PartsDeliveryTracker />
          </div>
        </div>
        
        {/* Parts Search with Delivery Focus */}
        <div className="futuristic-card">
          <div className="futuristic-card-content">
            <PartsSearchDelivery />
          </div>
        </div>
        
        {/* Categories */}
        <div className="futuristic-card">
          <div className="futuristic-card-content">
            <CategoryGrid />
          </div>
        </div>
        
        {/* Featured Parts for Quick Ordering */}
        <div className="futuristic-card">
          <div className="futuristic-card-content">
            <FeaturedParts />
          </div>
        </div>
        
        {/* Smart Recommendations */}
        <div className="futuristic-card">
          <div className="futuristic-card-content">
            <AIRecommendations />
          </div>
        </div>
        
        {/* Legacy Order Tracking */}
        <div className="futuristic-card">
          <div className="futuristic-card-content">
            <OrderTracking />
          </div>
        </div>
      </div>
      
      {/* Legal Compliance Footer */}
      <div className="px-4 mt-8">
        <ComplianceNotice />
      </div>
    </div>
  );
}
