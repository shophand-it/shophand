import HeroSection from "@/components/customer/hero-section";
import CategoryGrid from "@/components/customer/category-grid";
import FeaturedParts from "@/components/customer/featured-parts";
import OrderTracking from "@/components/customer/order-tracking";
import AIRecommendations from "@/components/customer/ai-recommendations";

export default function Home() {
  return (
    <div className="pb-20 md:pb-0">
      <HeroSection />
      <AIRecommendations />
      <CategoryGrid />
      <FeaturedParts />
      <OrderTracking />
    </div>
  );
}
