import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const SECRET_KEY = process.env.JWT_SECRET || '';

export interface LogInPayload {
    email: string;
    password: string;
}


export const generateAccessToken = (userPayload: LogInPayload) => {
    if (!SECRET_KEY) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.sign(userPayload, SECRET_KEY, { expiresIn: "15m" });
}