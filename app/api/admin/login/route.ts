import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPassword = String(password).trim();

    // Check master admin credentials
    const isMasterAdmin =
      (cleanEmail === "kj.jaman369@gmail.com" || cleanEmail === "admin@digitalworld.com") &&
      (cleanPassword === "kj-jaman#^(" || cleanPassword === "admin123" || cleanPassword === "kj-jaman");

    let user = null;
    try {
      user = await db.user.findUnique({
        where: { email: cleanEmail },
      });
    } catch (dbErr) {
      console.error("DB User lookup warning:", dbErr);
    }

    // If database user exists, check hashed password
    if (user && user.isActive) {
      let passwordMatch = false;
      try {
        passwordMatch = await bcrypt.compare(cleanPassword, user.passwordHash);
      } catch {}

      if (passwordMatch || isMasterAdmin) {
        await createSession({
          userId: user.id,
          email: user.email,
          role: user.role,
        });

        return NextResponse.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        });
      }
    }

    // Master admin fallback if user not in DB or DB unseeded on Vercel
    if (isMasterAdmin) {
      await createSession({
        userId: "admin-default-id",
        email: cleanEmail,
        role: "ADMIN",
      });

      return NextResponse.json({
        success: true,
        user: {
          id: "admin-default-id",
          email: cleanEmail,
          name: "Kamrujjaman Mufti",
          role: "ADMIN",
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

