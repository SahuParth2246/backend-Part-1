import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



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
        },
        views :{
            type : Number,
            default: 0
        },
        isPublished : {
            type:Boolean,
            default: true,
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref: "User",
            required: true

        }
    },{timestamps: true},)

videoSchema.plugin(mongooseAggregatePaginate)

export const video = mongoose.model("video", videoSchema);