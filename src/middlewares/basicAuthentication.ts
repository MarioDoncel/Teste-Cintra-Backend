import { NextFunction,Response,Request } from "express";
import AppError from "../resources/error/AppErrorInstance";
import { usersServiceLogIn } from "../resources/users/users.services";



export default async function basicAuth(req:Request,res:Response,next:NextFunction){
  const authHeader = req.headers.authorization
  if (!authHeader) throw new AppError({message:"Header Authorization not send.", statusCode:400});
  
  const [authType, base64Data] = authHeader.split(' ')
  if(authType != 'Basic' || !base64Data) throw new Error("Invalid credentials");

  const [email, password] = Buffer.from(base64Data, 'base64').toString ("utf-8").split(':')

  const user = await usersServiceLogIn({email, password})
  if(!user) throw new AppError({message:"User not authenticated!", statusCode:401});
  res.locals.user = user
  next()

}