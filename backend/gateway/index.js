import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
import cors from "cors"
import cookieParser from "cookie-parser"
import { getCurrentUser } from "./controllers/user.controller.js"
import protect from "./middleware/auth.middleware.js"
import proxyWithHeader from "./utils/proxyWithHeader.js"

dotenv.config()

const port = process.env.PORT
const authService = process.env.AUTH_SERVICE
const chatService = process.env.CHAT_SERVICE
const agentService = process.env.AGENT_SERVICE

const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true

}))

app.use(cookieParser())

app.use("/api/auth", proxy(authService))
app.use("/api/chat",protect, proxyWithHeader(chatService))
app.use("/api/agent",protect, proxyWithHeader(agentService))
app.get("/api/me", protect, getCurrentUser)

app.listen(port, () => {
    console.log(`Gateway Started at port ${port}`)
})

