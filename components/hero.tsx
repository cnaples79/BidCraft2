import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative">
      <div className="container flex flex-col items-center gap-4 text-center pt-16 pb-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Discover <span className="text-primary">Unique Treasures</span>
          <br />
          Bid with Confidence
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Join the most trusted auction marketplace where every bid tells a story. Find rare collectibles, 
          art, and unique items from verified sellers worldwide.
        </p>
        <div className="flex gap-4">
          <Link href="/auctions">
            <Button size="lg">
              Explore Auctions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/sell">
            <Button variant="outline" size="lg">
              Start Selling
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    </div>
  );
}