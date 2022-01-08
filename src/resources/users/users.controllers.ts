import { NextFunction, Response, Request } from "express"
import { IUsers, UsersModel } from "../../database/Model/Users";
import { usersServiceCreateJWT, usersServiceCreateUser, usersServiceFindOne } from "../../resources/users/users.services";

export const generateJWT = (req:Request,res:Response,next:NextFunction) =>{
    const {user} = res.locals
    const token = usersServiceCreateJWT(user)
  
    res.status(200).send(token)
}

export const createUser = async (req:Request,res:Response,next:NextFunction)=>{
  const {username, email, password}:IUsers = req.body

  const user = await usersServiceCreateUser({username, email, password})

  if(user.id){
    const token = usersServiceCreateJWT({username:user.username, email:user.email, id:user.id})
    res.status(201).send(token)
  } else{
    throw new Error("Server error on Create User");
  }
}