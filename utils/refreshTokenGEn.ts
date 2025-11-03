import crypto from 'crypto';
import { client } from '../db.ts';

export const generateRefreshToken = async (userId: number, expiresInDays = 7) => {

    const refreshToken = crypto.randomBytes(86).toString('hex');

    await client.query("INSERT INTO refreshtoken (userid, token, expires_at, created_at) VALUES ($1, $2, NOW() + INTERVAL '7 days', NOW())",
        [userId, refreshToken]);

    return refreshToken;
}