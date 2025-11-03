import { client } from '../db.ts';
import { SubscriptionSchema } from '../schemas/Subscription-schema.ts';

export const CreateSubscription = async (req: any, res: any) => {
    const validResult = SubscriptionSchema.safeParse(req.body);

    const userId = req.user.userId;



    if (!validResult.success) {
    return res.status(400).json({message: 'Validation failed',})
    }

    
    const ParseData = validResult.data;

    const subscription = await client.query('INSERT INTO subscriptions (user_id, name, amount, startdate, frequency) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, ParseData.name, ParseData.amount, ParseData.startdate, ParseData.frequency,]);
    
    return res.status(201).json({message: 'Subscription created successfully', subscription: subscription.rows[0],})


};