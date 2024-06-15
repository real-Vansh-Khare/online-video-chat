import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import user_router from './routes/user.router';

dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: "*",
  })
);

app.use('/user', user_router);

app.get('/', (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});