import Express,{ Router } from "express";
import sql from 'mssql'
import bycrypt from 'bcrypt'
import sqlConfig from "../Database/dbConfig";
import jwt from 'jsonwebtoken'
const router=Router();
import verifyToken from '../Authentication';
router.delete("/:id",verifyToken(),async(req:Express.Request,res:Express.Response)=>{
    try {
        const pool =await sql.connect(sqlConfig);
        const result=await pool.request()
        .query(`delete from users where id=${req.params.id}`);
         res.json(result);
    } catch (error) {
        console.log({message:error});    
    }

})
router.put("/:id",verifyToken(),async(req:Express.Request,res:Express.Response)=>{
    const{username,name,email,age,role,password}=req.body;
    try {
        let encpassword= await bycrypt.hash(password,10);
        const pool =await sql.connect(sqlConfig);
        const result=await pool.request()
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
        const result=await pool.request()
        .query(`INSERT INTO users VALUES(${id},'${username}','${name}','${email}',${age},'${role}','${encpassword}')`);
        res.json(result);
    } catch (error) {
        console.log({message:error});  
        res.status(300).json({Error:error})
    }
})

router.get("/",verifyToken(),async(req:Express.Request,res:Express.Response)=>{
    try {
        const pool =await sql.connect(sqlConfig);
        const result=await pool.request()
        .query(`SELECT * FROM users`);
        res.json({deocoded:req.body.data,data:result.recordsets});
    } catch (error) {
        console.log({message:error});   
    }
})

router.post("/login",async(req:Express.Request,res:Express.Response)=>{
    try {
        const {username,password}=req.body;
        const pool =await sql.connect(sqlConfig);
        const result=await pool.request()
        
        .query(`select * from users where username='${username}'`);
      
        if(!result.recordset[0]){
            res.json({message:"wrong username or password"})
        }
        await bycrypt.compare(password,result.recordset[0].PASSWORD,(error,data)=>{
           if(error){
               res.json({Error:error});
           }
           if(data){
            const {id,username,email,name,age,role}=result.recordset[0]
            const token =jwt.sign({id,username,email,name,age,role},process.env.SECREATE as string,{ expiresIn: 60 * 60 *60 * 60});
            res.json(token)
           }
           else{
               res.json({Message:"Invalid Username or Password"})
           }
       })

    } catch (error) {
        console.log({message:error}); 
    }
})

router.get("/:search",verifyToken,async(req:Express.Request,res:Express.Response)=>{
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
        const result=await pool.request()
        .query(`UPDATE users password=${encpassword}`);
    } catch (error) {
        console.log({message:error});  
    }
})

export default router;