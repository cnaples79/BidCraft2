import { prisma } from "@/lib/prisma";
import { AuctionGrid } from "@/components/auction-grid";

export const dynamic = "force-dynamic";

export default async function AuctionsPage() {
  const items = await prisma.item.findMany({
    where: { status: "active" },
    include: {
      seller: {
        select: {
          name: true,
          image: true,
        },
      },
      _count: {
        select: { bids: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Active Auctions</h1>
      <AuctionGrid items={items} />
    </div>
  );
}
