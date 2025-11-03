import zod from 'zod';

export const UserSchema = zod.object({
    username: zod.string().min(3, "Name is required"),
    email: zod.string().lowercase().trim().email("Invalid email address"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
    salary: zod.number().min(0, "Salary must be a positive number"),
});

export const UserLogInSchema = zod.object({
    email: zod.string().lowercase().trim().email("Invalid email address"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
});

export type userschema = zod.infer<typeof UserSchema>;
export type userlogin = zod.infer<typeof UserLogInSchema>;





