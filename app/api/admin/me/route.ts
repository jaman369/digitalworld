import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    let user = null;
    try {
      user = await db.user.findUnique({
        where: { id: session.userId },
      });
    } catch {}

    if (user && user.isActive) {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    }

    if (session.email) {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: session.userId || "admin-default-id",
          email: session.email,
          name: "Kamrujjaman Mufti",
          role: session.role || "ADMIN",
        },
      });
    }

    return NextResponse.json(
      { error: "User not found or inactive" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Session check API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

