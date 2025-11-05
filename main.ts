import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mainRouter from './router/main-router.ts';
import cookieParser from "cookie-parser";

const app = express();


app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


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






const PORT = process.env.PORT || 8000;


app.use('/app/v1', mainRouter)

app
.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})
.on('error', (req:any, res:any) => {
    res.status(500).send({ error: 'Server error' });
})

