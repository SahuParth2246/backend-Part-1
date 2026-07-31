import mongoose , {Schema} from "mongoose";

const UserSchema = new Schema(
    {
        username : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index : true
        },
        email : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName :{
            type: String,
            required: true,
            trim: true,
            index : true
        },
        avatar : {
            type: String,//url of the couldinary
            required: true,

        },
        coverImage :{
            type: String,
        },
        watchHistory :[
            {
                type: Schema.Types.ObjectId,
                ref: "video"
            }
        ],
        password : {
            type: String,
            //so now this is a challenge because now we have to encrypt the password
            //but how will we compare the big string and like i whatever type it will be stored
            required: [true, "Password is required"],
        },
        refreshToken : {
            type : String,
        }

},
    {
        timestamps: true
    })

export const User = mongoose.model("User", UserSchema)