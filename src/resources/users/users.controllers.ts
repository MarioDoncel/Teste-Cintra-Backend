import { NextFunction, Response, Request } from "express"
import { IUsers, UsersModel } from "../../database/Model/Users";
import {  usersServiceCreateUser, usersServiceFindByEmail, usersServiceFindById } from "../../resources/users/users.services";
import {  tokenServiceCreateJWT, tokenServiceCreateRefreshToken } from "../../resources/token/token.services";
import {saveTokensInCookies } from "../utils/tokensToCookies";
import { IRefreshToken, RefreshTokenWhiteListModel } from "../../database/Model/RefreshTokenWhiteList";

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
export const findUserById = async (req:Request,res:Response,next:NextFunction)=>{
  const {id} = req.params
  const user = await usersServiceFindById(id)
  return res.status(200).json(user)
}
export const logoutUser = async (req:Request,res:Response,next:NextFunction)=>{
  const refreshToken:IRefreshToken = JSON.parse(req.cookies.refreshToken) 
  try {
    await RefreshTokenWhiteListModel.findByIdAndDelete(refreshToken._id)
  } catch (error) {
    console.log(error)
  }
  res.clearCookie("accessToken")
  res.clearCookie("refreshToken")
  return res.status(200).send("success")
}