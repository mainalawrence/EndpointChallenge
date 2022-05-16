 import * as Express from "express";
 import jwt from 'jsonwebtoken';
 import dotenv from 'dotenv';
 dotenv.config();

const verifyToken = () => {
    return (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
      let token = req.headers.authorization;
      token = token && token.replace('bearer ', '');
      return jwt.verify(token as string, process.env.SECREATE as string, (jwtErr: any, decoded: any) => {
        if (jwtErr) {
          return res.status(401);
        } else {
          return next();
        }
      });
    };
  };

exports ={verifyToken};