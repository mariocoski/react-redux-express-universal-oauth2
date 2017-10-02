import dotenv from 'dotenv';
if(process.env.NODE_ENV !== 'production'){
  dotenv.config();
}
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import http from 'http';
import socketIo from 'socket.io';
import express from 'express';

process.on('SIGINT', () => {
  process.exit(0);
});

const app = express();
const server = new http.Server(app);
const io = new socketIo(server);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const corsMiddleware = cors({ origin: '*', preflightContinue: true });
app.use(corsMiddleware);
app.options('*', corsMiddleware);

app.get('/',(req,res) => {
  res.send('ok');
});

if (process.env.PORT) {
  server.listen(process.env.PORT, (err) => {
    if (err) {
      logger.error(err);
    }
    console.info(
      '\n --- \n',
      `==> 🌎  API is running on port ${process.env.PORT}`,
      '\n',
      `==> 💻  Send requests to http://${process.env.HOST}:${process.env.PORT}`,
      '\n',
      '--- \n'
    );
  });
} else {
  console.error(
    '==>     ERROR: No PORT environment variable has been specified'
  );
}
