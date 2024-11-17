"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface AuctionGridProps {
  items: any[];
}

export function AuctionGrid({ items }: AuctionGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative aspect-square">
              <Image
                src={item.images[0]}
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
                {item._count.bids} bids
              </span>
            </div>
            <h3 className="font-semibold line-clamp-1">{item.title}</h3>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current bid</p>
                <p className="text-lg font-bold">${item.currentBid}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Ends in</p>
                <p className="text-sm font-medium">
                  {formatDistanceToNow(new Date(item.endTime))}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/auctions/${item.id}`} className="w-full">
              <Button className="w-full">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}