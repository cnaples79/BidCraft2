import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const item = await prisma.item.create({
      data: {
        ...json,
        sellerId: session.user.id,
        currentBid: json.startPrice,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const query = searchParams.get("query");

    const items = await prisma.item.findMany({
      where: {
        AND: [
          { status: "active" },
          category ? { category } : {},
          query ? { 
            OR: [
              { title: { contains: query } },
              { description: { contains: query } }
            ]
          } : {},
        ],
      },
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

    return NextResponse.json(items);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}