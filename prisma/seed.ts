import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "kj.jaman369@gmail.com";
  const passwordHash = await bcrypt.hash("kj-jaman#^(", 10);

  // Remove old generic admin user if it exists
  await prisma.user.deleteMany({
    where: { email: "admin@digitalworld.com" }
  }).catch(() => {});

  // Upsert the new admin user
  await prisma.user.upsert({
    where: { email },
    update: {
      name: "Kamrujjaman Mufti",
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
    create: {
      email,
      name: "Kamrujjaman Mufti",
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log("Seeded default admin user successfully.");
  console.log("Email: kj.jaman369@gmail.com");
  console.log("Password: kj-jaman#^(");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
