import { baseProcedure, createTRPCRouter, isAuth } from "../trpc/init";
import { prisma } from "../db";

import { CreateEventSchema, JoinEventSchema } from "../trpc/schema";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
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
        author: { select: { id: true } },
      },
    });

    return events.map(({ participations, author, ...event }) => ({
      ...event,
      isJoined: participations.some(({ userId }) => userId === user?.id),
      isAuthor: author.id === user?.id,
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
  isAuthor: baseProcedure
    .input(z.object({ id: z.number() }))
    .use(isAuth)
    .query(async ({ input, ctx }) => {
      const event = await prisma.event.findUnique({
        where: { id: input.id },
        select: { authorId: true },
      });
      return event?.authorId === ctx.user.id;
    }),

  update: baseProcedure
    .input(
      z.object({
        id: z.number(),
        data: CreateEventSchema.partial(),
      })
    )
    .use(isAuth)
    .mutation(async ({ input, ctx }) => {
      const event = await prisma.event.findUnique({
        where: { id: input.id },
        select: { authorId: true },
      });

      if (!event || event.authorId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only edit your own events",
        });
      }

      return prisma.event.update({
        where: { id: input.id },
        data: input.data,
      });
    }),
});
