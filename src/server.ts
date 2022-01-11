import 'express-async-errors'
import express from "express";
import MongoConnection from "./database/mongoConnection";
import routes from './routes'
import cors from 'cors'
import { globalErrors } from "./middlewares/globalErrors";
import cookieParser from 'cookie-parser'
const app = express()


const PORT = 5000;
const URL = 'http://localhost';

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin:true, credentials:true }))


MongoConnection()

app.use(routes);

app.use(globalErrors)



app.listen(PORT, () => console.log(`⚡️:Server is listening on ${URL}:${PORT}`));