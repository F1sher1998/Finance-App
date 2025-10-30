import zod from 'zod';

export const UserSchema = zod.object({
    name: zod.string().min(3, "Name is required"),
    email: zod.string().lowercase().trim().email("Invalid email address"),
    password: zod.string().min(6, "Password must be at least 6 characters long")
});

export type User = zod.infer<typeof UserSchema>;

