import jwt from 'jsonwebtoken';
import { client } from '../db.ts';
import { UserSchema, UserLogInSchema } from '../schemas/user-schema.ts';
import dotenv from 'dotenv';

dotenv.config();



// USER REGISTER ROUTE BEGINNING
export const UserRegister = async (req: any, res: any) => {
    // CHECK INCOMING DATA THROUGH ZOD
    const validResult = UserSchema.safeParse(req.body);

    // CHECK IF VALIDATION IS A SUCCESS
    if (!validResult.success) {
    return res.status(400).json({message: 'Validation failed',})
    }

    // SUCCESSFUL ZOD DATA
    const ParseData = validResult.data;

    // DATA CHECK
    console.log(ParseData);

    // CREATING A NEW USER IN DATABASE
    const user = await client.query('INSERT INTO users (username, email, password, salary) VALUES ($1, $2, $3, $4) RETURNING *', 
        [ParseData.username, ParseData.email, ParseData.password, ParseData.salary]);

    // EXTRACTING USER ID FROM DB
    const userId = user.rows[0].id;

    
    


    // RETURNING A SERVER RESPONSE UPON TRANSACTION'S SUCCESS
    return res.status(201).json({
        message: 'User registered successfully',
        user: user.rows[0],

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



export const getUser = async(req: any, res: any) => {
    const {email, password} = req.body;

    const resultDB = await client.query('SELECT * FROM users WHERE password = $1 AND email = $2', [password, email])

    if(!resultDB){
        res.send(false)
    }

    return res.status(200).json(true)
}