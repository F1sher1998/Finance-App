import {Client} from 'pg';
import dotenv from 'dotenv';

export const client = new Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
})


client.connect().then(() => {
    console.log('Connected to the database successfully.');
}).catch((err: any) => {
    console.error('Database connection error:', err.stack);
});

