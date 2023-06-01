import mongoose from "mongoose";
import validator from "validator"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {type: String, require: [true, "Please provide name"], minLength: 3, maxlength: 20, trim: true},
    email: {
        type: String,
        validate: {validator: validator.isEmail, message: "Please provide valid email"},
        require: [true, "Please provide email"],
        unique: true
    },
    password: {type: String, require: [true, "Please provide password"], minLength: 6, select: false},
    lastName: {type: String, minLength: 3, maxlength: 20, trim: true, default: "lastName"},
    location: {type: String, minLength: 3, maxlength: 20, trim: true, default: "my city"},
})

userSchema.pre('save', async function (next) {

    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10))

    next()
})

userSchema.methods.createJWT = function () {
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIVETIME})
}

userSchema.methods.comparePassword = async function (password) {
    return  await bcrypt.compare(password,this.password)

}


export default mongoose.model("User", userSchema)