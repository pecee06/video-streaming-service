import asyncHandler from "../utils/async-handler.js";
import {APIError} from "../utils/api-error.js";
import {APIResponse} from "../utils/api-response.js"
import { User } from "../models/user.model.js";
import uploadFile from "../utils/file-upload.js";

const registerUser = asyncHandler(async (req, res) => {
    // Get user data from frontend
    const {username, email, fullName, password} = req.body;

    // Do validation
    if ([username, email, fullName, password].some(field => field?.trim() == "")){
        throw new APIError({
            message: "All fields are required",
            statusCode: 400
        });
    }

    // Check if user already exists
    const userAlreadyExists = User.findOne({
        $or: [
            {username}, {email}
        ]
    });
    if (userAlreadyExists){
        throw new APIError({
            message: "This user already exists",
            statusCode: 409
        });
    }

    // Get user files from frontend
    // Express doesn't provide any feature for file handling, thus multer comes into action in here

    const avatarPath = req.files?.avatar[0]?.path;
    const coverImagePath = req.files?.coverImage[0]?.path;

    // Check if avatar is present or not
    if (!avatarPath){
        throw new APIError({
            message: "Avatar is required",
            statusCode: 400
        });
    }

    // Upload the files (sent by user) into the cloud
    const avatar = await uploadFile(avatarPath);
    const coverImage = await uploadFile(coverImagePath);

    if (!avatar){
        throw new APIError({
            message: "Avatar is required",
            statusCode: 400
        });
    }

    // Save data on DB
    const user = await User.create({
        email, fullName, avatar, coverImage, password,
        username: username.toLowerCase()
    });

    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    // All data points are selected except 'password' & 'refreshToken'
    if (!userCreated){
        throw new APIError({
            message: "Something went wrong while creating a new user",
            statusCode: 500
        });
    }

    return res.status(200).json(
        new APIResponse({
            message: "User registered successfully",
            data: userCreated
        })
    );
});

export {registerUser};