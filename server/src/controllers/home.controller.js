import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const home= asyncHandler(async(req, res)=>{
    return res.status(200).json(new ApiResponse(2001, {
        Name: "Md Kaif Manzar",
        Project:"Neonflake video library",
        Stack:"MERN Stack",
        Phone:"6200561062",
        Email:"kaifmanzar321@gmail.com"
    }, "Got Data Successfully!!"))
})

export {home}