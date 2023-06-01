import {BAD_REQUEST} from "http-status-codes";

class CustomAPIError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = BAD_REQUEST
    }
}

export default CustomAPIError