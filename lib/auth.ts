import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "digital-world-secret-key-10-years-development-fallback-key";
const KEY = new TextEncoder().encode(JWT_SECRET);

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export async function createSession(payload: TokenPayload) {
  const jwt = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(KEY);

  const cookieStore = await cookies();
  cookieStore.set("admin_session", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return jwt;
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, KEY, {
      algorithms: ["HS256"],
    });
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}
