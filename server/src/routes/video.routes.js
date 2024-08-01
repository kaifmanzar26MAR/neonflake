import { Router } from "express";
import { getAllVideoDataForInitialList, getVideoDataById, uploadVideoData } from "../controllers/video.controller.js";
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
router.route('/videodataforinitiallist').get(getAllVideoDataForInitialList);
router.route('/videodata/:_id').get(getVideoDataById);

export default router;