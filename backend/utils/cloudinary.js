import { v2 as cloudinary } from 'cloudinary';  
import dotenv from 'dotenv';
dotenv.config();  
 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,         // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,               // Replace with your API key
  api_secret: process.env.CLOUDINARY_API_SECRET          // Replace with your API secret
});

export default cloudinary;
