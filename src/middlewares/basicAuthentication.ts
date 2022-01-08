import { NextFunction,Response,Request } from "express";
import { usersServiceLogIn } from "../resources/users/users.services";



export default async function basicAuth(req:Request,res:Response,next:NextFunction){
  const authHeader = req.headers.authorization
  if (!authHeader) throw new Error("Header Authorization not send.");

  const [authType, base64Data] = authHeader.split(' ')
  if(authType != 'Basic' || !base64Data) throw new Error("Invalid credentials");

  const [email, password] = Buffer.from(base64Data, 'base64').toString ("utf-8").split(':')

  const user = await usersServiceLogIn({email, password})
  if(!user) throw new Error("User not found!");
  
  res.locals.user = user
  next()
}