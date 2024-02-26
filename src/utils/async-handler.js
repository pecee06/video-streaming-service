import { APIResponse } from "./api-response.js";

const asyncHandler = (f) => (
    async (req, res, next) => {
        try {
            await f(req, res, next);
        } catch (err) {
            res.status(err?.code || 500).json(
                new APIResponse({
                    message: err.message,
                    success: false
                })
            );
        }
    }
);

// asyncHandler is a function which accepts an async function as its argument and returns another async function which implements the passed function by wrapping it around try-catch block

export default asyncHandler;