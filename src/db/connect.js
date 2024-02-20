import mongoose from "mongoose";

export default async function(){
    try {
        const res = await mongoose.connect(process.env.ATLAS_CONNECTION_STRING);
        if (!res) throw new Error("Unable to establish connection with database");
        console.log(`Connected to database\nHost: ${res.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}