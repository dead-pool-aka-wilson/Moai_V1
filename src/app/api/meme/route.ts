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

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.error().json();
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (
      id !== "" &&
      id !== null &&
      id !== undefined &&
      id !== "undefined" &&
      id !== "null"
    ) {
      const result = await prisma.meme.findFirst({
        where: { memeId: id }
      });

      console.log(result);
      return NextResponse.json(result);
    } else {
      const result = await prisma.meme.findRandom();
      console.log("random");
      console.log(result);
      return NextResponse.json(result);
    }
  } catch (e) {
    return NextResponse.error().json();
  }
}
