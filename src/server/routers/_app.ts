import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../trpc/init";
export const appRouter = createTRPCRouter({
  //процедура hello в которой при помощи input описывается тип входных данных
  hello: baseProcedure
    .input(
      //говорим что ожидаем объект, в котором есть поле текст и это поле строковое

      z.object({
        text: z.string(),
      })
    )
    //для получения данных
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
