import { createTRPCRouter } from "../trpc/init";
import { eventRouter } from "./event";
export const appRouter = createTRPCRouter({
  event: eventRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
