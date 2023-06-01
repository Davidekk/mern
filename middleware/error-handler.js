import {BAD_REQUEST, INTERNAL_SERVER_ERROR} from "http-status-codes";



const errorHandlerMiddleware = (err,req,res,next) => {

    const defaultError = {
        statusCode: err.statusCode || INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong, try again"
    }
    if (err.name === 'ValidationError'){
        defaultError.statusCode = BAD_REQUEST
        defaultError.msg = Object.values(err.errors).map(item => item.message).join(",")
    }
    if (err.code === 11000 && err.code){
        defaultError.statusCode= BAD_REQUEST
        defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`

    }


    res.status(defaultError.statusCode).json({msg:defaultError.msg})

}

export default errorHandlerMiddleware