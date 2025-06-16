import { v2 as cloudinary } from 'cloudinary';
<<<<<<< HEAD
import { CLOUDINARY_API_KEY,CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_SECRET } from '../config.js'
import dotenv from 'dotenv';
dotenv.config(); 

=======
import dotenv from 'dotenv';
dotenv.config();
>>>>>>> f699c107e54b44317fa3c0b9994096163aa8135e

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,         // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,               // Replace with your API key
  api_secret: process.env.CLOUDINARY_API_SECRET          // Replace with your API secret
});

export default cloudinary;
