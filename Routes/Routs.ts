import Express,{ Router } from "express";
import sql from 'mssql'
import bycrypt from 'bcrypt'
import sqlConfig from "../Database/dbConfig";
const router=Router();

router.delete("/:id",async(req:Express.Request,res:Express.Response)=>{
    try {
        const pool =await sql.connect(sqlConfig);
        const result=pool.request()
        .query(`delete from users where id=${req.params.id}`);
         res.json(result);
    } catch (error) {
        console.log({message:error});    
    }

})
router.put("/:id",async(req:Express.Request,res:Express.Response)=>{
    const{username,name,email,age,role,password}=req.body
    try {
        let encpassword= await bycrypt.hash(password,10);
        const pool =await sql.connect(sqlConfig);
        const result=pool.request()
        .query(`UPDATE  users username=${username},name=${name},email=${email},age=${age},role=${role},password=${encpassword}) WHERE id=${req.params.id}`);
        res.json(result);
    } catch (error) {
        console.log({message:error});  
    }
})

router.post("/",async(req:Express.Request,res:Express.Response)=>{
    const{id,username,name,email,age,role,password}=req.body
    try {
        let encpassword= await bycrypt.hash(password,10);
        const pool =await sql.connect(sqlConfig);
        const result=pool.request()
        .query(`INSERT INTO users VALUES(${id},${username},${name},${email},${age},${role},${encpassword})`);
        res.json(result);
    } catch (error) {
        console.log({message:error});  
    }
})

router.get("/",async(req:Express.Request,res:Express.Response)=>{
    try {
        const pool =await sql.connect(sqlConfig);
        const result=pool.request()
        .query(`select * from users`);
        res.json(result);
    } catch (error) {
        console.log({message:error});   
    }
})

router.post("/login",async(req:Express.Request,res:Express.Response)=>{
    try {
        const {username,password}=req.body;
        const pool =await sql.connect(sqlConfig);
        const result=pool.request()
        .query(`select * from users where username=${username}`);
        if(!(await result).recordset[0]){
            res.json({message:"wrong username or password"})
        }
        if(await bycrypt.compare(password,(await result).recordset[0].password)){
            res.json("you have logged in successfully");
        }
        
    } catch (error) {
        console.log({message:error}); 
    }
})

router.get("/:search",async(req:Express.Request,res:Express.Response)=>{
    try {
        const search =req.params.search;
    } catch (error) {
        console.log({message:error});   
    }
})

router.put("/Resetpassword/:id",async(req:Express.Request,res:Express.Response)=>{
    const {password}=req.body;
    try {
        let encpassword=await bycrypt.hash(password,10);
        const pool =await sql.connect(sqlConfig);
        const result=pool.request()
        .query(`UPDATE users password=${encpassword}`);
    } catch (error) {
        console.log({message:error});  
    }
})

export default router;