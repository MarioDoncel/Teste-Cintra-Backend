import { RefreshTokenWhiteListModel } from "../database/Model/RefreshTokenWhiteList"

const deleteExpiredRefreshTokens = async ()=>{
  try {
    const deleted = await RefreshTokenWhiteListModel.deleteMany({expiresIn:{$lte: Date.now()}})
    console.log(deleted)
  } catch (error) {
    console.log(error)
  }
  
}

export default deleteExpiredRefreshTokens