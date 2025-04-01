import { z } from "zod"

export const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    })
    .max(15, {
        message: "First name must be up to 15 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    })
    .max(15, {
        message: "Last name must be up to 15 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email."
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    })
    .max(50, {
        message: "Password must be up to 50 characters.",
    }),
})

export const loginFormSchema = formSchema.pick({
    email: true,
    password: true
})