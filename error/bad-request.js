import {BAD_REQUEST} from "http-status-codes";
import CustomApi from "./custom-api.js";

class BadRequestError extends CustomApi {
    constructor(message) {
        super(message);
        this.statusCode = BAD_REQUEST
    }
}

export default BadRequestError