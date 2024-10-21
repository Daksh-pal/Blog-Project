import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js'
import blogRoute from './routes/blogRoute.js'
import blogsRoute from './routes/blogsRoute.js'

dotenv.config();
const app = express();

app.use(express.json());

app.use("/" , blogsRoute)
app.use("/user", userRoute)
app.use("/blog", blogRoute)

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error);
    }
}

const PORT = process.env.PORT || 8000;

app.listen(PORT ,async () => {
    await connectDB();
    console.log(`Server listening at ${PORT}`)
})