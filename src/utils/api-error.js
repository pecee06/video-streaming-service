class APIError extends Error{
    constructor({message="Something went wrong", statusCode, errors=[], stack=""}){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;
        this.stack = stack;
        this.data = null;
    }
};

export {APIError};