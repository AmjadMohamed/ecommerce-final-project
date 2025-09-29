import * as z from 'zod';

export const signInSchema = z.object(
    {
        email: z.email("invalid email").min(5, "min length is 5").max(50, "max length is 50"),
        password: z.string().min(6, "min length is 6").max(20, "max length is 20"),
    }
)


export type SignInSchemaType = z.infer<typeof signInSchema>