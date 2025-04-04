// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient | undefined;
// };

// //создаем экземпляр в глобальной переменной откуда будем переиспользовать
// export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export * from "@prisma/client";

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export * from "@prisma/client";
