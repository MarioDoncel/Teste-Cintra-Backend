import express from "express";
import MongoConnection from "./database/mongoConnection";
import routes from './routes'
import cors from 'cors'
const app = express()


const PORT = 5000;
const URL = 'http://localhost';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

MongoConnection()

app.use(routes);





app.listen(PORT, () => console.log(`⚡️:Server is listening on ${URL}:${PORT}`));