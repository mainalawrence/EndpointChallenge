import Express from "express";
import dotenv from 'dotenv';
import sqlConfig from './Database/dbConfig'
import sql from 'mssql'
import Router from "./Routes/Routs";

dotenv.config();

const app =Express();
app.use(Express.json());
app.use("/api",Router)

const dbConnection=async()=>{
    await sql.connect(sqlConfig).then(con=>{
        if(con.connected)  console.log("connected to the database")
        }).catch(err=>console.log(err))
}
dbConnection();

const port=process.env.PORT||4000;
app.listen(port,()=>{
    console.log(`Server Listening at port ${port}`);
});