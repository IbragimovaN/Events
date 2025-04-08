import { baseProcedure, createTRPCRouter, isAuth } from "../trpc/init";
import { prisma } from "../db";

import { CreateEventSchema } from "../trpc/schema";
export const eventRouter = createTRPCRouter({
  findMany: baseProcedure.query(() => {
    return prisma.event.findMany();
  }),
  create: baseProcedure
    .input(CreateEventSchema)
    .use(isAuth)
    .mutation(async ({ input, ctx }) => {
      console.log("context:", ctx.user);

      return prisma.event.create({
        data: {
          ...input,
          authorId: Number(ctx.user.id),
        },
      });
    }),
});
