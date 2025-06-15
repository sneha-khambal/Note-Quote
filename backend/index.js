import express from 'express';
import {
    PORT,
    MONGODB_LOCAL_URL,
    MONGODB_REMOTE_URL,
    ORIGIN
} from './config.js';
import mongoose from 'mongoose';
 
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';
console.log(ORIGIN)
const app = express();
app.use(express.json())
app.use(cors({
    // origin: `${ORIGIN} ` ,
    origin:  'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['content-type']
}))

app.use('/Books', bookRoutes)
app.use('/uploads', express.static('uploads'));




const dbUrl = MONGODB_REMOTE_URL || MONGODB_LOCAL_URL;
const port = PORT || 3000
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