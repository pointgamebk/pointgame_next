import * as z from "zod";

export const gameFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400 characters"),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
});

export const leagueFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  category: z.string(),
});

export const teamFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
});

export const playerFormSchema = z.object({
  userId: z.string(),
  teamId: z.string(),
});

export const commentFormSchema = z.object({
  body: z.string().min(2, "Comment must be at least 2 characters"),
});
