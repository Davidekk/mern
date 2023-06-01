import {CustomAPIError} from "./index.js";
import {UNAUTHORIZED} from "http-status-codes";

class Unauthenticated extends CustomAPIError{
    constructor(meesage) {
        super(meesage);
        this.statusCode = UNAUTHORIZED
    }
}

export default Unauthenticated