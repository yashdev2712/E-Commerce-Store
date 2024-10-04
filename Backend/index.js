import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectToDb from "./Db/script.js";
import authRouter from "./Routes/authRouter.js";
import productRouter from "./Routes/productRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
dotenv.config();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);

app.get("/", (req, res) => {
  res.send("hii there");
});

app.listen(process.env.PORT, () => {
  connectToDb();
  console.log("the server is running");
});
