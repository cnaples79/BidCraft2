import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    const bids = await prisma.bid.findMany({
      where: { itemId: params.itemId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bids);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}