import { NextFunction, Request, Response } from "express";
import AppError from "../../resources/error/AppErrorInstance";
import JWT from "jsonwebtoken";
import { tokenServiceCreateJWT, tokenServiceCreateRefreshToken, tokenServiceVerifyAccessToken, tokenServiceVerifyRefreshToken } from "../../resources/token/token.services";
import { IRefreshToken } from "../../database/Model/RefreshTokenWhiteList";
import { saveTokensInCookies } from "../../resources/utils/tokensToCookies";


export const validateAndRefreshTokens = async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies
  const refreshToken: IRefreshToken = JSON.parse(req.cookies.refreshToken)
  
  const response = await tokenServiceVerifyAccessToken(accessToken)

  if (response.status === 'success') return res.status(201).send(accessToken)

  if (response.message !== 'jwt expired') throw new AppError({ message: 'Token invalido.', statusCode: 401 })
  
  const authenticated = await tokenServiceVerifyRefreshToken(refreshToken)
  if (authenticated) {
    const newToken = tokenServiceCreateJWT({ id: refreshToken.userId })
    const newRefreshToken = await tokenServiceCreateRefreshToken({ id: refreshToken.userId })

    saveTokensInCookies(newToken, newRefreshToken, res)
    return res.status(201).send(newToken)
  }
  return res.status(400).send('error')
}

