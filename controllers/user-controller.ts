import jwt from 'jsonwebtoken';
import { client } from '../db.ts';
import { UserSchema, UserLogInSchema } from '../schemas/user-schema.ts';
import { generateAccessToken } from '../utils/accessTokenGen.ts';
import { generateRefreshToken } from '../utils/refreshTokenGEN.ts';
import dotenv from 'dotenv';

dotenv.config();

export const UserRegister = async (req: any, res: any) => {
    const validResult = UserSchema.safeParse(req.body);

    if (!validResult.success) {
    return res.status(400).json({message: 'Validation failed',})
    }


    const ParseData = validResult.data;

    console.log(ParseData);

    const user = await client.query('INSERT INTO users (username, email, password, salary) VALUES ($1, $2, $3, $4) RETURNING *', 
        [ParseData.username, ParseData.email, ParseData.password, ParseData.salary]);

    const userId = user.rows[0].id;

    
    const accessToken = await generateAccessToken({
        email: ParseData.email,
        password: ParseData.password,
        userId: userId,                                       
    });




    return res.status(201).json({
        message: 'User registered successfully',
        user: user.rows[0],
        access_token: accessToken,
    })

};


export const UserLogIN = async(req: any, res: any) => {
    const validResult = UserLogInSchema.safeParse(req.body);

    if (!validResult.success) {
    return res.status(400).json({message: 'Validation failed',})
    }

    const ParseData = validResult.data;

    const user = await client.query('SELECT * FROM users WHERE email = $1 AND password = $2',
        [ParseData.email, ParseData.password]);

    if(user.rows.length === 0){
        return  res.status(404).json({
            message: 'User not found',
        })
    }


    return res.status(200).json({
        message: 'User logged in successfully',
        user: user.rows[0],
    })
}