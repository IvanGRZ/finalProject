import express from "express";
import dotenv from 'dotenv'
import router from './src/routes/index.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.listen(PORT);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', router);


export default app;
  