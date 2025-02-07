import { z } from "zod";

const loginValidation = z.object({
    body: z.object({
        email: z.string({ required_error: "email is required" }).email(),
        password: z.string({ required_error: "Password is required" }).min(6),
    }),
});

export const authValidation = {
    loginValidation,
};