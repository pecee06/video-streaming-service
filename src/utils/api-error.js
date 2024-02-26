class APIError extends Error{
    constructor({message="Something went wrong", code, errors=[], stack=""}){
        super(message);
        this.code = code;
        this.errors = errors;
        this.stack = stack;
        this.data = null;
    }
};

export {APIError};