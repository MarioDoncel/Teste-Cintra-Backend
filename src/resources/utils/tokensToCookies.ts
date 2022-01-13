import { Response } from "express"
import { IRefreshToken } from "../../database/Model/RefreshTokenWhiteList"

const fiveYearsInMilisecoonds = 1000 * 60 * 60 * 24 * 365 * 5


export const saveTokensInCookies = (token:string, refreshToken:IRefreshToken, res:Response) => {

  res.cookie('accessToken', token, {
    maxAge: fiveYearsInMilisecoonds,
    httpOnly: true,
    sameSite:'none',
    secure:true
  })
  res.cookie('refreshToken', JSON.stringify(refreshToken), {
    maxAge: fiveYearsInMilisecoonds,
    httpOnly: true,
    sameSite:'none',
    secure:true
  })
}