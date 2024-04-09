import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request): Promise<NextResponse> {
  if (!request.body) {
    return NextResponse.error().json();
  }

  try {
    const body = await request.json();

    const result = await prisma.user.create({
      data: {
        name: body.name,
        spending: body.spending
      }
    });

    console.log(result);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.error().json();
  }
}
