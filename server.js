import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";

dotenv.config();

//Import the item routes
import itemRoutes from "./routes/itemRoutes.js";

//import user routes
import userRoutes from "./routes/userRoutes.js";

//import the error handler middleware
import { errorHandler } from "./middleware/errorMiddleware.js";

//import the connectDB
import { connectDB } from "./config/db.js";

//initialize the port
const port = process.env.PORT || 8000;

//call the connectDB
connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//use the item routes
app.use("/api/items", itemRoutes);

//use the use routes
app.use("/api/users", userRoutes);

//use the error handler middlerware
app.use(errorHandler);

app.listen(port, () => console.log(`Server stated on port ${port}`));
