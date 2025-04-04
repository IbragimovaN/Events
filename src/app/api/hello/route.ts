import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Не удалось загрузить пользователей" },
      { status: 500 }
    );
  }
}
