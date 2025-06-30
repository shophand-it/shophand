import HeroSection from "@/components/customer/hero-section";
import CategoryGrid from "@/components/customer/category-grid";
import FeaturedParts from "@/components/customer/featured-parts";
import OrderTracking from "@/components/customer/order-tracking";
import AIRecommendations from "@/components/customer/ai-recommendations";
import MobileFeatures from "@/components/mobile/mobile-features";

export default function Home() {
  // Detect if running in mobile app environment
  const isNative = typeof window !== 'undefined' && 
    (window.navigator?.userAgent?.includes('CapacitorJS') || 
     window.location?.hostname === 'localhost');

  return (
    <div className="pb-20 md:pb-0">
      <HeroSection />
      <MobileFeatures isNative={isNative} />
      <AIRecommendations />
      <CategoryGrid />
      <FeaturedParts />
      <OrderTracking />
    </div>
  );
}
