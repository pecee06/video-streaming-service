class APIResponse{
    constructor({message="OK", statusCode, data}){
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }
};

export {APIResponse};