"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

const FEATURED_ITEMS = [
  {
    id: 1,
    title: "Vintage Mechanical Watch",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
    currentBid: 450,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    bids: 12,
    category: "Watches",
  },
  {
    id: 2,
    title: "Modern Abstract Painting",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80",
    currentBid: 1200,
    endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    bids: 8,
    category: "Art",
  },
  {
    id: 3,
    title: "First Edition Book Collection",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80",
    currentBid: 850,
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    bids: 15,
    category: "Books",
  },
];

export function FeaturedAuctions() {
  return (
    <section className="container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Featured Auctions</h2>
        <Button variant="ghost">View all</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_ITEMS.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{item.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  {item.bids} bids
                </span>
              </div>
              <CardTitle className="line-clamp-1">{item.title}</CardTitle>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current bid</p>
                  <p className="text-lg font-bold">${item.currentBid}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Ends in</p>
                  <p className="text-sm font-medium">
                    {formatDistanceToNow(item.endTime)}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">Place Bid</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}