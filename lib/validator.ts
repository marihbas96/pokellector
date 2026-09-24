import * as z from "zod"

export const collectionsFormSchema = z.object({
  isGraded: z.string(),
  isGem: z.string(),
  isRaw: z.string(),
  isSet: z.string(),
  isLang: z.string(),
  name: z.string().min(3, "Collection title must be at least 3 characters."),
})