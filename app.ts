import { Request, Response, Express } from "express";
import express from 'express'
import env from "dotenv";
import { customErrorHandler, DefaultErrorHandler } from "./Middleware/errorHandler.js";
import { logRequestMiddleware } from "./Middleware/printlnfoMiddleware.js";
import dataSource from "./db/dbConfig.js";
import CustomerRoutes from "./routes/customer.js"

const app =express()
env.config();
const PORT=process.env.PORT||5000
app.use(express.json())
app.use("/customer",CustomerRoutes)

app.get("/", (req: Request, res: Response) => {
    res.send("hello world");
})

app.use( customErrorHandler)
app.use(DefaultErrorHandler)


dataSource.initialize().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});

app.listen(PORT, () => {
    console.log(`server is running on host: http://localhost:${PORT}`);
});

export default app;