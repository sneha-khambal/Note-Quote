import express from 'express';
import {PORT,MONGODB_LOCAL_URL} from './config.js';
import mongoose from 'mongoose';
import { Book } from './model/bookModel.js';
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:['content-type']
}))

app.use('/Books',bookRoutes)





mongoose.connect(MONGODB_LOCAL_URL)
.then(()=>{
    try {
       console.log('App connected to Database');
       app.listen(PORT,()=>{console.log('port listening on '+ PORT)});
 
    } catch (error) {
        
    }
})

