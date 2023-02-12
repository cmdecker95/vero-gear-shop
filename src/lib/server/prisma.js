import { dev } from "$app/environment";
import { PrismaClient } from "@prisma/client";

global.prisma;

const prisma = global.prisma || new PrismaClient();

if (dev) global.prisma = prisma;

console.log("🪄 Connected to Prisma client");

export { prisma };
