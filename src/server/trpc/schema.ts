import { z } from "zod";

export const CreateEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.coerce.date(), //благодаря coarce значение будет конвертировано в дату из строки или числа
});
