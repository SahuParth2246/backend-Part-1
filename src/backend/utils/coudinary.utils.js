import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import {ApiError} from "./ApiError.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Do not call Cloudinary when Multer did not provide a local file path.
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            // `resource_type` lets Cloudinary detect images, videos, and other files.
            resource_type: "auto",
        });
        // console.log("File uploaded to Cloudinary:", response.secure_url);
        fs.unlinkSync(localFilePath);//delete from the local storage
        console.log(response);
        return response;

    } catch (error) {
        // Multer stored the file temporarily; remove it if the Cloudinary upload fails.
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        throw new ApiError(500, "Failed to upload file");

        return null;
    }
};

// Named export makes the function easy to import in user.controller.js.
export { uploadOnCloudinary };
