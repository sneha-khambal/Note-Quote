import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
 
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';
<<<<<<< HEAD
import dotenv from 'dotenv';
dotenv.config(); 
=======
>>>>>>> f699c107e54b44317fa3c0b9994096163aa8135e
 
const app = express();
app.use(express.json())
app.use(cors({
<<<<<<< HEAD
    origin: ORIGIN || 'http://localhost:5173' , 
=======
    origin: process.env.ORIGIN || 'http://localhost:5173' , 
>>>>>>> f699c107e54b44317fa3c0b9994096163aa8135e
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['content-type']
}))

app.use('/Books', bookRoutes)
app.use('/uploads', express.static('uploads'));




const dbUrl = process.env.MONGODB_REMOTE_URL || process.env.MONGODB_LOCAL_URL;
const port = process.env.PORT || 3000
mongoose.connect(dbUrl)
    .then(() => {
        try {
               console.log('App connected to Database');
            app.listen(port, () => {
                console.log('port listening on '+ port) 
            });


        } catch (error) {
            console.log(error)
        }
    })
    .catch((error) => {
        console.log(error.message)
    })
