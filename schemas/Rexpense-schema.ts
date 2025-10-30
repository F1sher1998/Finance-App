import zod from 'zod';

export const RexpenseSchema = zod.object({
    name: zod.string().min(3, "Name is required"),
    amount: zod.number().min(0.01, "Amount must be greater than zero"),
    location: zod.string().optional(),
    category: zod.string(),
    date: zod.date().optional(),
});

export type Rexpense = zod.infer<typeof RexpenseSchema>;