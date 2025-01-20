import cors from "cors";
import express from "express";
import routes from "../routes/routes";   

const app = express();
const port = 3000;

app.use('/api/v1', routes);

const allowedOrigins = ['http://localhost:3000'];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    'UTC';
    next();
});

app.get("/", (req, res) => {
    res.send("Hello World");
});
  
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});