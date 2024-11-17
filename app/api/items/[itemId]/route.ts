import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    const item = await prisma.item.findUnique({
      where: { id: params.itemId },
      include: {
        seller: {
          select: {
            name: true,
            image: true,
          },
        },
        bids: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!item) {
      return new NextResponse("Item not found", { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}