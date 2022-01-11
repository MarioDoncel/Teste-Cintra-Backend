import mongoose from 'mongoose'

export interface IRefreshToken {
  _id?:string;
  hash: string;
  userId: string;
  expiresIn:number;
}
const schema = new mongoose.Schema<IRefreshToken>({
  hash: {type:String, required: true},
  userId: {type:String, required: true},
  expiresIn: {type:Number, required: true}
})
export const RefreshTokenWhiteListModel = mongoose.model<IRefreshToken>('whitelists', schema);