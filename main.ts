import express from 'express';
import cors from 'cors';
import helmet from 'helmet';


const app = express();


app.use(helmet.contentSecurityPolicy({
    directives:{
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
    }
}));


app.use(cors(
    {
        origin: 'http://localhost:8000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }
));


app.use(express.json());

const PORT = process.env.PORT || 8000;


app
.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})
.on('error', (req:any, res:any) => {
    res.status(500).send({ error: 'Server error' });
})

