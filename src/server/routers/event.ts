import { baseProcedure, createTRPCRouter, isAuth } from "../trpc/init";
import { prisma } from "../db";

import { CreateEventSchema, JoinEventSchema } from "../trpc/schema";
import { z } from "zod";
export const eventRouter = createTRPCRouter({
  findUnique: baseProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .use(isAuth)
    .query(({ input }) => {
      return prisma.event.findUnique({
        where: input,
        select: {
          title: true,
          description: true,
          date: true,
          participations: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
    }),
  findMany: baseProcedure.query(() => {
    return prisma.event.findMany();
  }),
  create: baseProcedure
    .input(CreateEventSchema)
    .use(isAuth)
    .mutation(async ({ input, ctx }) => {
      return prisma.event.create({
        data: {
          ...input,
          authorId: Number(ctx.user.id),
        },
      });
    }),
  join: baseProcedure
    .input(JoinEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.participation.create({
        data: {
          eventId: input.id,
          userId: user.id,
        },
      });
    }),
});
