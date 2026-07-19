import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, formType, company, country, service, budget } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

    const notesArr = [];
    if (company) notesArr.push(`Company: ${company}`);
    if (country) notesArr.push(`Country: ${country}`);
    if (service) notesArr.push(`Service needed: ${service}`);
    if (budget) notesArr.push(`Monthly budget: ${budget}`);

    const lead = await db.lead.create({
      data: {
        formType: formType || "CONTACT",
        name: name || "",
        email,
        phone: phone || "",
        message: message || "",
        status: "NEW",
        ipAddress: ip,
        notes: notesArr.join("\n"),
      },
    });

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("Public lead capture error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
