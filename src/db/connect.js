import { APIError } from "../utils/api-error.js";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export default async function(){
    try {
        const res = await mongoose.connect(`${process.env.ATLAS_CONNECTION_STRING}/${DB_NAME}`);
        if (!res){
            throw new APIError({
                message: "Unable to connect with DB",
                code: 500
            });
        }
        console.log(`Connected to database\nHost: ${res.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}