import { sign } from "jsonwebtoken"
import auth from "../../config/auth"
import  JWT  from "jsonwebtoken";
import {v4 as uuidV4} from 'uuid'
import { IRefreshToken, RefreshTokenWhiteListModel } from "../../database/Model/RefreshTokenWhiteList"
import { ICreateTokens } from "./dtos/token.create.dtos"
import AppError from "../error/AppErrorInstance"

export const tokenServiceCreateJWT= ({id}:ICreateTokens) => {
  const {secret, expiresIn} = auth.jwt

  const token = sign({},secret,
    {
      subject:id,
      expiresIn
    }
  )

  return token
}

export const tokenServiceCreateRefreshToken= async ({id}:ICreateTokens) => {
  const hash = uuidV4()

  try {
    const response = await  RefreshTokenWhiteListModel.create({
      hash, 
      userId:id, 
      expiresIn:auth.refreshToken.expiresIn})
    const refreshToken = response.toObject()
    return refreshToken
  }
    catch (error) {
      console.log(error)
      throw new Error("Error on register refresh token");
    }
}



export const tokenServiceVerifyRefreshToken= async ({expiresIn, _id}:IRefreshToken) => {
  const isExpired = expiresIn < Date.now()
  if (isExpired) throw new AppError({message:'User not authenticated', statusCode:401});

  try {
    const isValid = await RefreshTokenWhiteListModel.findByIdAndDelete(_id)
  
    if(isValid) return true
    return false
  
  } catch (error) {
    console.log(error)
  }
  
}
export const tokenServiceVerifyAccessToken= async (accessToken:string) => {
  
  const secretKey:any = process.env.JWT_SECRET
  try {
    const tokenPayload = JWT.verify(accessToken, secretKey)

    if(typeof tokenPayload !== 'object' || !tokenPayload.sub) throw new AppError({message:'Token invalido.', statusCode:401})

    return {
      status:'success',
      message:'Valid Token'
    }
  
  } catch (error:any) {
    console.log(error)
    return {
      status:'fail',
      message: error.message
    }
  }
  
}

  


  

