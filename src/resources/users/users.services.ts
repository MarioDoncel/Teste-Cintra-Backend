
import md5 from 'crypto-js/md5';
import {sign} from 'jsonwebtoken'
import auth from "../../config/auth";
import { UsersModel } from '../../database/Model/Users';
import AppError from '../error/AppErrorInstance';

import { IUsersCreate } from './dtos/users.create.dtos';

export const usersServiceLogIn = async ({email, password}:IUsersLogIn) => {
  const passwordHash = md5(password).toString()
  try {
    const user =  await UsersModel.findOne({email, password:passwordHash}).select({password: 0 })
    return user
  } catch (error) {
    console.error(error)
    throw new Error;
  }
  
}
export const usersServiceFindByEmail = async (email:string) => {
  try {
    const user = await UsersModel.findOne({email})
    return user
  } catch (error) {
    console.log(error)
    throw new Error;
  }
  
}
export const usersServiceFindById= async (id:string) => {
  try {
    const user = await UsersModel.findById(id)
    return user
  } catch (error) {
    console.log(error)
    throw new Error;
  }
  
}

export const usersServiceCreateUser = async ({username, email, password}:IUsersCreate) =>{
  
  const userAlreadyExists = await usersServiceFindByEmail(email)
  if(userAlreadyExists) throw new AppError({message:"Email is already registered.", statusCode: 400});
  const passwordHash = md5(password)

  return await UsersModel.create({username, email, password:passwordHash})
}