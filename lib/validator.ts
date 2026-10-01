import * as z from "zod"

export const collectionsFormSchema = z.object({
  isGraded: z.string().min(1, {message: " "}),
  isGem: z.string().min(1, {message: " "}),
  isRaw: z.string().min(1, {message: " "}),
  isSet: z.string().min(1, {message: " "}),
  isLang: z.string().min(1, {message: " "})
}).superRefine((data, ctx) => {
  if (data.isGraded === "yes" && !data.isGem) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["isGem"],
    });
  }
})