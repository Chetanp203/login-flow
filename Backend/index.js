import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { getCurrentUser, login, register } from './Controllers/UserController.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

app.post('/register',register);
app.post('/login',login);
app.get('/get-current-user',getCurrentUser);


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log("Error while connecting to MongDB",error)
})

app.listen(8000,()=>{
    console.log("Listening from sever 8000")
})