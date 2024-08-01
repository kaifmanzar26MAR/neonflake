import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv';

dotenv.config({
    path:"server/.env"
})
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary= async(localFilePath)=>{
    try {
        console.log(process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET, process.env.CLOUDINARY_CLOUD_NAME)
        if(!localFilePath){
            return null;
        }

        //code to upload file on cloudinary
        console.log("uploading file...")
        console.log("It will can take few minutes, please wait...")
        const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        });

        console.log('file uploaded successfylly');
        console.log('removing file catch...')
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.log("error in uploading file on cloudinary ", error);
        console.log("clearing file catch...")
        fs.unlinkSync(localFilePath);
        return null;
    }
};

export {uploadOnCloudinary};