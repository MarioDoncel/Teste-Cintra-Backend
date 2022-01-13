import 'express-async-errors'
import express from "express";
import MongoConnection from "./database/mongoConnection";
import routes from './routes'
import cors from 'cors'
import { globalErrors } from "./middlewares/globalErrors";
import cookieParser from 'cookie-parser'
import cron from 'node-cron'
import { RefreshTokenWhiteListModel } from './database/Model/RefreshTokenWhiteList';
import session from 'express-session'
import deleteExpiredRefreshTokens from './config/cronJob';

const app = express()


const PORT = process.env.PORT || 5000;
const URL = 'http://localhost';

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin:true, credentials:true }))

app.enable('trust proxy'); // optional, not needed for secure cookies
app.use(session({
    secret : 'somesecret',
    proxy : true, // add this when behind a reverse proxy, if you need secure cookies
}));


MongoConnection()

app.use(routes);

app.use(globalErrors)

cron.schedule('0 2 * * * ', deleteExpiredRefreshTokens)

app.listen(PORT, () => console.log(`⚡️:Server is listening on ${URL}:${PORT}`));