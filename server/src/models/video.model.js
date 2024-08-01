import mongoose,  {Schema} from "mongoose";

const videoSchema= new Schema({
    title:{
        type:String,
        required:true,
        maxlength: 50, 
        validate: {
            validator: function(v) {
                return v.trim().length <= 50;
            },
            message: props => `${props.value} exceeds the limit of 50 characters.`
        }
    },
    description:{
        type:String,
        required:true,
        maxlength:200,
        validate: {
            validator: function(v) {
                return v.trim().length <= 200;
            },
            message: props => `${props.value} exceeds the limit of 50 characters.`
        }
    },
    thumbnailUrl:{
        type:String,
        required:true,
    },
    videoUrl:{
        type:String,
        required:true
    }
},
{
    timestamps:true,
});


export const Video = mongoose.model("Video", videoSchema);