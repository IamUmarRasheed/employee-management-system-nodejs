import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import Userrouter from "./routes/user.router.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Your code here for handling authentication and authorization goes here

app.use("/api/v1/users",Userrouter)


export { app }