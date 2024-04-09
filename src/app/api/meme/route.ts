import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request): Promise<NextResponse> {
  if (!request.body) {
    return NextResponse.error().json();
  }

  try {
    const body = await request.json();

    const creator = await prisma.user.findUnique({
      where: { spending: body.creator }
    });

    if (!creator) {
      return NextResponse.error().json();
    }

    console.log(creator);
    console.log(body);

    const result = await prisma.meme
      .create({
        data: {
          name: body.name,
          symbol: body.symbol,
          desc: body.desc,
          imageUri: body.image,
          memeId: body.memeId,
          creator: {
            connect: {
              id: creator.id
            }
          }
        }
      })
      .catch((err) => console.log(err));
    console.log(result);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.error().json();
  }
}
