import * as z from 'zod';

export const signUpSchema = z.object(
    {
        name: z.string().min(3, "min length is 3").max(20, "max length is 20"),
        email: z.email("invalid email").min(5, "min length is 5").max(50, "max length is 50"),
        password: z.string().min(6, "min length is 6").max(20, "max length is 20"),
        rePassword: z.string().min(6, "min length is 6").max(20, "max length is 20"),
        phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid phone number")
    }
).refine(function (object) {
    if (object.password !== object.rePassword) {
        return false;
    }
    return true;
},
    {
        path: ["rePassword"],
        error: "Passwords doesn't match"
    })


export type SignUpSchemaType = z.infer<typeof signUpSchema>