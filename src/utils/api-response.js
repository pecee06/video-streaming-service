class APIResponse{
    constructor({message="OK", data}){
        this.message = message;
        this.data = data;
    }
};

export {APIResponse};