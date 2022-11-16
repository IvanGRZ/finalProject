import express from "express";
import dotenv from 'dotenv'
import router from './src/routes/index.js'

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);


export default app;
  