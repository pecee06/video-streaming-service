class APIResponse{
    constructor({message="OK", data, success}){
        this.success = success;
        this.message = message;
        this.data = data;
    }
};

export {APIResponse};