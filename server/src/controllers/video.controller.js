import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";

function validateString(input) {
    const sqlRegex = /(\b(?:drop|select|exec)\b[\s\r\n]*\()/i;
    return sqlRegex.test(input);
}
const uploadVideoData = asyncHandler(async(req,res)=>{
    const {title, description}=req.body;

    if([title, description].some((field)=> field?.trim('')==='')){
        throw new ApiError(500, "Title and Desription are required!!");
    }

    if([title,description].some((field)=>validateString(field)===true)){ //sql injection test
        throw new ApiError(500, "Invalid input!!")
    }

    if(title.trim('').lenght>50){
        throw new ApiError(500, "Title lenght exceeds the limit!!");
    }

    if(description.trim('').lenght>200){
        throw new ApiError(500, "Title lenght exceeds the limit!!");
    }

    console.log(title, description)

    const thumbnailLocalPath= req.files?.thumbnail[0]?.path;
    const videoLocalPath= req.files?.video[0]?.path;

    console.log(thumbnailLocalPath, videoLocalPath)

    if(!thumbnailLocalPath || !videoLocalPath){
        throw new ApiError(500, "Can't get the path for thumbnail or video")
    }

    const thumbnailInstance= await uploadOnCloudinary(thumbnailLocalPath, "raw");
    const videoInstance= await uploadOnCloudinary(videoLocalPath, "raw");

    if(!thumbnailInstance || !videoInstance){
        throw new ApiError(500, "Something went worng in uploding files on Cloudinary!!");
    }

    const newVideo=await Video.create({
        title,
        description,
        thumbnailUrl:thumbnailInstance.url,
        videoUrl:videoInstance.url
    });

    if(!newVideo){
        throw new ApiError(500, "Something went worng in adding vedio!!");
    }

    return res.status(201).json(new ApiResponse(200, newVideo, "Video uploaded Successfully!!"));
});



export {uploadVideoData}