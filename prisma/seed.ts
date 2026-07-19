import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@digitalworld.com";
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("admin-digital-world", 10);
    await prisma.user.create({
      data: {
        email,
        name: "Admin User",
        passwordHash,
        role: "ADMIN",
        isActive: true,
      },
    });
    console.log("Seeded default admin user successfully.");
    console.log("Email: admin@digitalworld.com");
    console.log("Password: admin-digital-world");
  } else {
    console.log("Admin user already exists. Skipping seed.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
