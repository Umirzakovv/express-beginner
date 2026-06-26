import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string({ error: "Email majburiy" })
    .trim()
    .email("Email noto'g'ri formatda"),

  password: z
    .string({ error: "Password majburiy" })
    .min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
});

export const loginSchema = z.object({
  email: z
    .string({ error: "Email majburiy" })
    .trim()
    .email("Email noto'g'ri formatda"),

  password: z.string().min(1, "Parol majburiy"),
});
