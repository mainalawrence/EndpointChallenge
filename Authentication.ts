 import  {Request ,Response , NextFunction} from "express";
 import jwt, { JsonWebTokenError } from 'jsonwebtoken';
 import dotenv from 'dotenv';
 dotenv.config();
const verifyToken =() => {
    return (req:Request,res:Response, next:NextFunction) => {
      let token = req.headers.authorization;
      if(token===''){
       res.status(401).json("Error Fobiden");
      }
      token = token && token.replace('Bearer ','');
      return jwt.verify(token as string,process.env.SECREATE as string,(jwtErr,decoded) => {
        if (jwtErr) {
          return res.status(401).json("Fobiden");
        } 
        if(decoded){
          return next();
        }
      });
    };
  };

export default verifyToken;