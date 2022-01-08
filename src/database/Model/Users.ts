import mongoose from 'mongoose'

export interface IUsers {
    id?: string;
    username:string
    email:string
    password:string
}
const schema = new mongoose.Schema<IUsers>({
  username: {type:String, required: true},
  email: {type:String, required: true},
  password: {type:String, required: true}
})
export const UsersModel = mongoose.model<IUsers>('users', schema);