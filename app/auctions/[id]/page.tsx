"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { BidForm } from "@/components/bid-form";
import { BidHistory } from "@/components/bid-history";
import Image from "next/image";
import { ImageCarousel } from "@/components/image-carousel";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Heart } from "lucide-react";

export default function AuctionPage({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/items/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (!item) {
    return <div className="container py-8">Item not found</div>;
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ImageCarousel images={item.images} />
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">23 watching</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">142 views</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Badge>{item.category}</Badge>
            <h1 className="text-3xl font-bold mt-2">{item.title}</h1>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Current bid</p>
                <p className="text-3xl font-bold">${item.currentBid}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Auction ends in</p>
                <div className="flex items-center gap-1 text-lg font-semibold">
                  <Clock className="h-4 w-4" />
                  {formatDistanceToNow(new Date(item.endTime))}
                </div>
              </div>
            </div>
            <BidForm itemId={params.id} currentBid={item.currentBid} />
          </Card>

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={item.seller.image} />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{item.seller.name}</p>
              <p className="text-xs text-muted-foreground">Seller</p>
            </div>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
              <TabsTrigger value="history" className="flex-1">Bid History</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <div className="prose dark:prose-invert">
                <p>{item.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <BidHistory itemId={params.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}