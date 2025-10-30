import zod from 'zod';

export const IRexpenseSchema = zod.object({
    name: zod.string().min(3, "Name is required"),
    amount: zod.number().min(0.01, "Amount must be greater than zero"),
    date: zod.date().optional(),
});


export type IRexpense = zod.infer<typeof IRexpenseSchema>;