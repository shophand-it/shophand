import HeroSection from "@/components/customer/hero-section";
import CategoryGrid from "@/components/customer/category-grid";
import FeaturedParts from "@/components/customer/featured-parts";
import OrderTracking from "@/components/customer/order-tracking";

export default function Home() {
  return (
    <div className="pb-20 md:pb-0">
      <HeroSection />
      <CategoryGrid />
      <FeaturedParts />
      <OrderTracking />
    </div>
  );
}
