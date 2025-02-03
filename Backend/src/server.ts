import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routes from "../routes/routes";   

import { connectToDatabase } from "../utils/db";

dotenv.config();
const app = express();

const port = process.env.SERVER_PORT;

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:4200'
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
};

app.use(cors(corsOptions));

// Body parsing middleware should come before routes
app.use(express.json());

app.use('/api/v1', routes);

app.use((req, res, next) => {
    process.env.TZ;
    next();
});

app.get("/", (req, res) => {
    res.send("Hello World");
});
  
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
