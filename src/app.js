import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors"
import {CORS_ORIGIN, JSON_SIZE, URL_PARAM_SIZE} from "./constants.js"

/*Middlewares*/

// Allowing Cross Origin Resource Sharing
app.use(cors({
    origin: CORS_ORIGIN
}));

// Allowing the acceptance of JSON
app.use(express.json({
    limit: JSON_SIZE
}));

// Encodes the data sent over URL
app.use(express.urlencoded({
    limit: URL_PARAM_SIZE
}));

// Serving static files
app.use(express.static("public"));

// Allowing CRUD operations on browser's cookies
app.use(cookieParser());

/*Middlewares*/

export default app;