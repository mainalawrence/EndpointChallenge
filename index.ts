import Express from "express";
import dotenv from 'dotenv';

dotenv.config();

const app =Express();
app.use(Express.json());



const port=process.env.PORT||4000;
app.listen(port,()=>{
    console.log(`Server Listening at port ${port}`);
});