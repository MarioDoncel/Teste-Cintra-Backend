import { NextFunction, Response, Request } from "express"
import { IUsers, UsersModel } from "../../database/Model/Users";
import {  usersServiceCreateUser, usersServiceFindOne } from "../../resources/users/users.services";
import {  tokenServiceCreateJWT, tokenServiceCreateRefreshToken } from "../../resources/token/token.services";
import {saveTokensInCookies } from "../utils/tokensToCookies";

export const userLogin = async (req:Request,res:Response,next:NextFunction) =>{
    const {user} = res.locals
    
    const token = tokenServiceCreateJWT(user)
    const refreshToken = await tokenServiceCreateRefreshToken(user)

    saveTokensInCookies(token, refreshToken, res)
    
    return res.status(200).send(token)
}

export const createUser = async (req:Request,res:Response,next:NextFunction)=>{
  const {username, email, password}:IUsers = req.body
  try {
    const {id} = await usersServiceCreateUser({username, email, password})

    if(id){
      const token = tokenServiceCreateJWT({id})

      const refreshToken = await tokenServiceCreateRefreshToken({id})

      saveTokensInCookies(token, refreshToken, res)
      
      return res.status(201).send((token))
    } else{
      throw new Error;
    }
  } catch (error) {
    next(error)
  }
}