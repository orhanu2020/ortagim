import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();

  let dbUser = await prisma.user.findUnique({
    where: {
      id: '1',
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: "",
        firstName: "",
        lastName: "",
        id: '1',
        profileImage:
          '',
      },
    });
  }

  return NextResponse.redirect("https://airbnb-yt-peach.vercel.app");
}
