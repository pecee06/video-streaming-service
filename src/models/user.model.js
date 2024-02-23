import mongoose from "mongoose";
import bcrypt from "bcrypt";    // for hashing password
import jwt from "jsonwebtoken"  // for transmitting json data securely over network

import { SALTING_ROUNDS } from "../constants.js";

const userSchema = new mongoose.Schema({
    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId,   // custom schema type
        ref: "Video"
    }],
    username: {
        type: String,
        unique: [true,"This username already exists"],
        required: [true,"Username is a required field"],
        index: true // makes the field searchable
    },
    email: {
        type: String,
        unique: [true,"This email already exists"],
        required: [true,"Email is a required field"],
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        index: true
    },
    fullName: {
        type: String,
        default: "Guest User"
    },
    avatar: String,
    coverImage: String,
    password: {
        type: String,
        required: [true,"Password is a required field"]
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true});

// Middleware

userSchema.pre("save", async function(next){
    // Runs just before saving user document into DB
    
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, SALTING_ROUNDS);
    next(); // Simce this hook works as a middleware, thus calling next is important for passing flag to next middleware or request handler
});

/*Custom Hooks*/

userSchema.methods.checkPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    // Returns signature after accepting payload & token-secret
    let payload = {
        id: this._id,   // generated automatically by mongodb
        email: this.email,
        username: this.username
    };

    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken = function(){
    let payload = {
        id: this._id
    };

    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

/*Custom Hooks*/

export const User = mongoose.model("User", userSchema);