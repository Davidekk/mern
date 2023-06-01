import User from "../models/User.js";
import {BAD_REQUEST, CREATED, OK} from "http-status-codes";
import {BadRequest, CustomAPIError, Unauthenticated} from "../error/index.js";
import badRequest from "../error/bad-request.js";


const register = async (req, res, next) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        throw new CustomAPIError("please provide all values")
    }

    const userAlreadyExists = await User.findOne({email})
    if (userAlreadyExists) {
        throw new BadRequest("Email already in use")
    }


    const user = await User.create({name, email, password})
    const token = user.createJWT()

    res.status(CREATED).json({
        user: {
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            name: user.name
        }, token, location: user.location
    })
}

const login = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password)
        throw new BadRequest("Please provide all values")

    const user = await User.findOne({email: email}).select("+password")

    if (!user)
        throw new Unauthenticated("Invalid Credentials")

    const comparePassword = user.comparePassword(password)
    if (!comparePassword)
        throw new Unauthenticated("Invalid Credentials")

    const token = user.createJWT()
    user.password = undefined

    res.status(OK).json({user, token, location: user.location})
}

const update = async (req, res) => {
    const {email, name, lastName, location} = req.body

    console.log(email, name, lastName, location)

    if (!email, !name, !lastName, !location)
        throw new badRequest("Please provide all values")

    const user = await User.findOne({_id: req.user.userId})

    user.email = email
    user.name = name
    user.lastName = lastName
    user.location = location

    await user.save()
    const token = user.createJWT()


    res.status(OK).json({user, token, location: user.location})
}

export {register, login, update}