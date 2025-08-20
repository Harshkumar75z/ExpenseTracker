import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js"
import expenseRoutes from "./routes/expense.routes.js"
import path from "path"

dotenv.config({});

const app = express();
const PORT = 8000;
connectDB();

const _dirname = path.resolve();

// middlewares
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true
}));


app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());

// app.get("/", (req,res) => {
//     res.send("App is working fine");
// })

//apis
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/expense", expenseRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get(/.*/, (req,res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});
 

app.listen(PORT, ()=> {
    console.log("PORT is Running at ",PORT)
})