import { ZodTypeAny, z } from "zod";

export const isZodSchema = (value: unknown): value is ZodTypeAny => {
  return value instanceof z.ZodType;
};
