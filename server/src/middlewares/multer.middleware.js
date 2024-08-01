import multer from "multer";

const storage= multer.diskStorage({
    destination: function (req, file, cb){
        console.log("hi")
        cb(null, "server/public/temp")   //storing desitination in server
    },
    filename: function (req, file, cb){
        cb(null, file.originalname) //file name defining
    }
});
const fileFilter = function (req, file, cb) {
    const allowedImageTypes = ['image/jpeg', 'image/png'];
    const allowedVideoTypes = ['video/mpeg', 'video/avi', 'video/mp4'];


    console.log(file?.fieldname)
    if(file.fieldname==="video"){
        if (allowedVideoTypes.includes(file.mimetype)) {
            cb(null, true); 
        } else {
            cb(new Error('Only MPG, AVI, and MP4 file formats are allowed for video!'), false); 
        }
    }else if(file.fieldname==="thumbnail"){
        if (allowedImageTypes.includes(file.mimetype)) {
            cb(null, true); 
        } else {
            cb(new Error('Only JPG, PNG file formats are allowed for thumbnail!'), false); 
        }
    }
    
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});