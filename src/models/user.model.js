import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


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

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);

    //now again a problem is here that this will save the password even if nothing is changed but the user
    //saved something because this has access of all the fields
    next();
})

UserSchema.methods.isPasswordValid = async function (password) {
    await bcrypt.compare(password, this.password, (err, isMatch) => {})
}
UserSchema.methods.generateAuthToken =  function () {
    return jwt.sign({
        id: this.id,
        username: this.username,
        email: this.email,
    }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
UserSchema.methods.generateRefreshToken =  function () {
    return jwt.sign({
            id: this.id,
        }, process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("User", UserSchema)