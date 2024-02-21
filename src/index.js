import dotenv from "dotenv";
dotenv.config();

import connect from "./db/connect.js";
import app from "./app.js";

connect().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`App running on port ${process.env.PORT}`);
    });
});