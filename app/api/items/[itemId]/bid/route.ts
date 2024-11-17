import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const { amount } = json;

    const item = await prisma.item.findUnique({
      where: { id: params.itemId },
      include: { bids: { orderBy: { amount: "desc" }, take: 1 } },
    });

    if (!item) {
      return new NextResponse("Item not found", { status: 404 });
    }

    if (item.status !== "active") {
      return new NextResponse("Auction has ended", { status: 400 });
    }

    if (amount <= (item.currentBid || item.startPrice)) {
      return new NextResponse("Bid must be higher than current bid", { status: 400 });
    }

    const bid = await prisma.bid.create({
      data: {
        amount,
        itemId: params.itemId,
        userId: session.user.id,
      },
    });

    await prisma.item.update({
      where: { id: params.itemId },
      data: { currentBid: amount },
    });

    return NextResponse.json(bid);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}