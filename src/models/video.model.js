import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    videoFile: {
        type: String,
        required: [true, "Video File is required"],
        unique: [true, "Can't upload duplicate video"]
    },
    thumbnail: {
        type: String,
        required: [true, "Thumbnail is required"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, "Title of video is required"],
        index: true
    },
    description: {
        type: String,
        required: [true, "Description of video is required"]
    },
    duration: {
        type: Number,
        required: [true, "Video duration is required"]
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

// Middleware

videoSchema.plugin(mongooseAggregatePaginate);  // Allows aggregate queries (min, max, avg, ...)

export const Video = mongoose.model("Video",videoSchema);