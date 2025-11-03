import z from 'zod';

export const SubscriptionSchema = z.object({
    name: z.string().min(3, "Name is required"),
    amount: z.number().min(0.01, "Amount must be greater than zero"),
    startdate: z.string(),
    frequency: z.enum(['Weekly', 'Monthly', 'Yearly']),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;
