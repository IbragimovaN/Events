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

  findMany: baseProcedure.query(async ({ ctx: { user } }) => {
    const events = await prisma.event.findMany({
      include: {
        participations: true,
      },
    });

    return events.map(({ participations, ...event }) => ({
      ...event,
      isJoined: participations.some(({ userId }) => userId === user?.id),
    }));
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
      console.log("imput:", input, "user:", user);
      return prisma.participation.create({
        data: {
          eventId: input.id,
          userId: user.id,
        },
      });
    }),

  leave: baseProcedure
    .input(JoinEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.participation.delete({
        where: {
          userId_eventId: {
            userId: user.id,
            eventId: input.id,
          },
        },
      });
    }),
});
