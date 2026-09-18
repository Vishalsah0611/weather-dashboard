import { z } from "zod";

export const citySchema = z.object({
  cityName: z
    .string()
    .trim()
    .min(2, "Enter at least 2 characters.")
    .max(60, "That's too long for a city name.")
    .regex(/^[a-zA-Z\s,.'-]+$/, "Only letters, spaces and commas are allowed."),
});
