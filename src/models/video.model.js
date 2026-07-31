import mongoose , {Schema} from "mongoose";


const videoSchema = new Schema(
    {
        videoFile : {
            type: String,//coudinary url
            required: true

        },
        thumbnail:{
            type:String,
            required:true
        },
        title : {
            type:String,
            required:true

        },
        description : {
            type:String,
            required:true
        },
        Duration : {
            type:Number,//coudniary url
            required:true
        }
    },{timestamps: true},)

export const video = mongoose.model("video", videoSchema);