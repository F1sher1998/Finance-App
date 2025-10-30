import z from 'zod';

export const SubscriptionSchema = z.object({
    name: z.string().min(3, "Name is required"),
    amount: z.number().min(0.01, "Amount must be greater than zero"),
    interval: z.enum(['weekly', 'monthly', 'yearly']),
    startDate: z.date(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;
