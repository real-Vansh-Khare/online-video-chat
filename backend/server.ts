import express, { NextFunction, Request, Response } from 'express';
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import user_router from './routes/user.router';
import cookie_parser from 'cookie-parser';
import { authenticate_jwt } from './middlewares/auth.middleware';
import xlog from './util/logger';
import { init_socket_connection } from './sockets/socket';

// Maybe later change to https
import { createServer } from 'http';
import { dev_clearMatchList } from './util/dev_functions';
import { dev_controller } from './controllers/dev.controller';

dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

app.use(cookie_parser())

app.use(helmet())
app.disable("x-powered-by");

app.use(express.json());
app.use(morgan("tiny"));

app.use(
  cors({
    origin: "*",
  })
);

// SERVER INSTANCE FOR SOCKET IO
export const server = createServer(app);

app.use('/user', user_router);

app.get('/', (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get('/protected', authenticate_jwt, (req: Request, res: Response) => {
  res.send("Protected route accessed");
});

init_socket_connection('/websockets/', server)

// DO these tasks when the server is in development mode
if(process.env.NODE_ENV === 'DEVELOPMENT') {
  app.post('/dev', dev_controller);  
}

app.use(( err: Error, req: Request, res: Response, next: NextFunction) => {
  xlog("caught at global catch");
  console.trace(err);

});


server.listen(port, () => {
  xlog(`Server is running at http://localhost:${port}`);
});


