import { FeaturedAuctions } from "@/components/featured-auctions";
import { Hero } from "@/components/hero";
import { TrendingCategories } from "@/components/trending-categories";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-8">
      <Hero />
      <FeaturedAuctions />
      <TrendingCategories />
    </div>
  );
}