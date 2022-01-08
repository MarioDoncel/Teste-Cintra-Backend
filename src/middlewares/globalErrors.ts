import { NextFunction, Response, Request } from "express";
import AppError from "../resources/error/AppErrorInstance";

export const globalErrors = (error:Error, req:Request,res:Response,next:NextFunction) => {
  
  console.error(error)

  if(error instanceof AppError)
  return res.status(error.statusCode).json({
    status:'Error',
    message: error.message,
    data: error?.data
  })


  res.status(400).json({
    status:'Error',
    message: 'Internal Server Error' 
  })
}