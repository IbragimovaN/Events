import { baseProcedure, createTRPCRouter } from "../trpc/init";
import { prisma } from "../db";

import { CreateEventSchema } from "../trpc/schema";
export const eventRouter = createTRPCRouter({
  findMany: baseProcedure.query(() => {
    return prisma.event.findMany();
  }),
  create: baseProcedure.input(CreateEventSchema).mutation(async ({ input }) => {
    const user = await prisma.user.findFirstOrThrow();
    return prisma.event.create({
      data: {
        ...input,
        authorId: user.id,
      },
    });
  }),
});
