import "express-async-errors"
import express, {json} from "express"
import dotenv from "dotenv"
import connectDB from "./db/connect.js";

const app = express()
dotenv.config()
import morgan from "morgan"

//middleware
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js"
import AuthenticatedUser from './middleware/auth.js'

// routers
import authRoutes from './routes/auth.js'
import jobsRoutes from './routes/jobs.js'

if (process.env.NODE_ENV !== 'production')
    app.use(morgan('dev'))

app.use(express.json())


app.get("/api/v1", (req, res) => {
    res.status(200).json({msg: "seva"})

})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', AuthenticatedUser, jobsRoutes)


app.use(notFound)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5005


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server listening on ${port}`)
        })

    } catch (e) {
        console.log(e)

    }
}
start()