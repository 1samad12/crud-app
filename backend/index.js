import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
    origin: "*", // Add allowed origins here
    credentials: true, // Include cookies if necessary
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send("Hello from home page");
});

app.use("/api", route);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
