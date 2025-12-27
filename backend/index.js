// get express 
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";

//connect to mongo db 
dotenv.config();
const app = express();

// GET request 
//app.get("/home", (req, res) => {
//    return res.status(200).json({
//        message: "I am coming from backend",
//        success: true
//    })
// });


// MIDDLEWARE- functions that run BEFORE our routes, a filter pipeline every request passes through.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}


app.use(cors(corsOptions));

// CREATE SERVER 
// port and call back fxn
// if no 8000 then 3000 chosen 
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})

// API's
app.use("/api/v1/user", userRoute) // 3 apis .. login, register and update 

// connect to db.js 
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
})

