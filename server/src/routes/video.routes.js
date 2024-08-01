import { Router } from "express";
import { uploadVideoData } from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router= Router();

router.route('/uplaodvideo').post(upload.fields([
    {
        name:"thumbnail",
        maxCount:1,
    },
    {
        name:"video",
        maxCount:1,
    }
]), uploadVideoData);

export default router;