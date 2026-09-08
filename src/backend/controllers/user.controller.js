import { asyncHandler } from "../utils/AsyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/coudinary.utils.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (err) {
        throw new ApiError(501, "Something went wrong while generating refresh and access token");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    //get data from frontend
    //validate the check
    //check if the user already exists
    //check for images and check for avatar
    //upload them to Cloudinary
    //create user object-create entry in db
    //remove password and refresh token fields
    //check for user creatiion
    //return res
    //we have designed our own algorithm now
    const { fullName, email, username, password } = req.body;
    console.log("email", email);

    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    console.log(req.files);
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
    let coverImageLocalPath;

    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar local path is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar is required");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    });

    const isCreated = await User.findById(user._id).select("-password -refreshToken");

    if (!isCreated) {
        throw new ApiError(500, "something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, isCreated, "User created successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
    //my thoughts are
    /*
    fetch the data from frontend through request
    check if the user exists in the database and then
    verify the refresh and access token
    if access tokens are present just give them the access
    if not access and refresh then generate the access and give them
    if not of both login the user again
     */
    /*
    sir ka flow :
        req body se data destructure
        username or email
        find the user
        password check
        access and refresh token generate and
        send cookie to the user
     */
    const { email, username, password } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "Username or email is required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(400, "User doesn't exists");
    }

    // MongoDB saves only the user data.
    // It does not save the methods.
    // When `User.findOne()` gets the user back, Mongoose turns it into a `User` document.
    // That is why `isUser` can use the methods we added in `userSchema`.
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    // so here we had two options whether to find the user again to get the
    // updated information of the user
    // 1. to manually assign the data in the user created before calling of generarte access adn refers one
    //2. tr make a updated call to db again
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    //token access karke check if it's the user or not
    //find the user through token data
    /// delete through mongoose and save the db
    /*
    sir ki strategy

     */
})

export { registerUser, loginUser };