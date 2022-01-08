
import md5 from 'crypto-js/md5';
import {sign} from 'jsonwebtoken'
import auth from "../../config/auth";
import { UsersModel } from '../../database/Model/Users';
import { IUsersCreateJWT } from "./dtos/user.signin.dtos";
import { IUsersCreate } from './dtos/users.create.dtos';

export const usersServiceCreateJWT= ({username, email, id}:IUsersCreateJWT) => {
  const {secret, expiresIn} = auth.jwt
  const token = sign({
    username, 
    email
    },secret,{
      subject:id,
      expiresIn
    }
  )

  return token
}

export const usersServiceLogIn = async ({email, password}:IUsersLogIn) => {
  const passwordHash = md5(password).toString()
  return await UsersModel.findOne({email, password:passwordHash}).select({password: 0 })
}
export const usersServiceFindOne = async (email:string) => {
  return await UsersModel.findOne({email})
}

export const usersServiceCreateUser = async ({username, email, password}:IUsersCreate) =>{
  
  const userAlreadyExists = await usersServiceFindOne(email)
  if(userAlreadyExists) throw new Error("Email is already registered.");
  const passwordHash = md5(password)

  return await UsersModel.create({username, email, password:passwordHash})
}