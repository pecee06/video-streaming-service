import {v2 as cloudinary} from 'cloudinary';
import file from "fs";
import { APIError } from './api-error.js';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export default async function uploadFile(path){
    try {
        if (!path){
            throw new APIError({
                message: "File not Found!",
                code: 404
            });
        }

        const res = await cloudinary.uploader.upload(path);
        if (!res){
            throw new APIError({
                message: "Unable to upload the file",
                code: "500"
            });
        }

        return res.url;
    } catch (err) {
        console.error(err.message);
        file.unlinkSync(path);  // This deletes the local copy of file that has been made for uploading
        return null;
    }
}