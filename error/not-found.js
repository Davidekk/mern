import {BAD_REQUEST, NOT_FOUND} from "http-status-codes";
import CustomApi from "./custom-api.js";

class NotFoundError extends CustomApi {
    constructor(message) {
        super(message);
        this.statusCode = NOT_FOUND
    }
}

export default NotFoundError