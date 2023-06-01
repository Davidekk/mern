import unauthenticated from "../error/unauthenticated.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    const {authorization} = req.headers
    if (!authorization || !authorization.startsWith("Bearer"))
        throw new unauthenticated("Authentication Invalid")

    const token = authorization.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        req.user = {userId: payload.userId}


        next()

    } catch (e) {
        throw new unauthenticated("Authentication Invalid")
    }


}

export default auth