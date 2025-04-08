import { authOptions } from "@/auth/auth.config";
import { initTRPC, TRPCError } from "@trpc/server";
import { getServerSession } from "next-auth";
import { cache } from "react";
import superjson from "superjson";
export const createTRPCContext = cache(async () => {
  const session = await getServerSession(authOptions);

  return {
    user: session?.user,
  };
});

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const isAuth = t.middleware((optional) => {
  const { ctx } = optional;
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return optional.next({
    ctx: {
      user: ctx.user,
    },
  });
});
