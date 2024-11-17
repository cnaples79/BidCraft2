"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

interface Bid {
  id: string;
  amount: number;
  createdAt: string;
  user: {
    name: string;
    image: string;
  };
}

export function BidHistory({ itemId }: { itemId: string }) {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/items/${itemId}/bids`)
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (bids.length === 0) {
    return <div className="text-center text-muted-foreground">No bids yet</div>;
  }

  return (
    <div className="space-y-4">
      {bids.map((bid) => (
        <div key={bid.id} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={bid.user.image} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{bid.user.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(bid.createdAt))} ago
              </p>
            </div>
          </div>
          <p className="font-semibold">${bid.amount}</p>
        </div>
      ))}
    </div>
  );
}