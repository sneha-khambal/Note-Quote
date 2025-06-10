import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_KEY,CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_SECRET } from '../config.js'

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,         // Replace with your Cloudinary cloud name
  api_key: CLOUDINARY_API_KEY,               // Replace with your API key
  api_secret: CLOUDINARY_API_SECRET          // Replace with your API secret
});

export default cloudinary;
