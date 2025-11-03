import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { client } from '../db.ts';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '15m'; // short-lived
const REFRESH_TOKEN_EXPIRES_IN = '7';


export const generateAccessToken = async (user : 
    {email: string, password: string, userId: number} ) => {

        const accessToken = jwt.sign(
            {
                email: user.email,
                password: user.password,
                userId: user.userId,
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        const refreshToken = crypto.randomBytes(86).toString('hex');

        await client.query("INSERT INTO refreshtoken (userid, token, expires_at, created_at) VALUES ($1, $2, NOW() + INTERVAL '7 days', NOW())",
            [user.userId, refreshToken]);


        return { accessToken, refreshToken };
    }
