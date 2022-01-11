import { NextFunction, Request, Response, Router} from "express";
import AppError from "../../resources/error/AppErrorInstance";
import  JWT  from "jsonwebtoken";
import { tokenServiceCreateJWT, tokenServiceCreateRefreshToken, tokenServiceVerifyRefreshToken } from "../../resources/token/token.services";
import { IRefreshToken } from "../../database/Model/RefreshTokenWhiteList";
import { saveTokensInCookies } from "../../resources/utils/tokensToCookies";

const router = Router()

router.get('/validate',async (req:Request,res:Response,next:NextFunction)=>{
  const {accessToken} = req.cookies
  const refreshToken:IRefreshToken = JSON.parse(req.cookies.refreshToken) 
  try {
    const secretKey:any = process.env.JWT_SECRET
    const tokenPayload = JWT.verify(accessToken, secretKey)

    if(typeof tokenPayload !== 'object' || !tokenPayload.sub) throw new AppError({message:'Token invalido.', statusCode:401})
    
    const id = tokenPayload.sub
    if(!id) throw new AppError({message:'Token invalido.', statusCode:401})

    return res.status(201).send(accessToken)
    
} catch (error:any) {
    if (error.message == 'jwt expired'){
      const authenticated = await tokenServiceVerifyRefreshToken(refreshToken)
      if (authenticated){
        const newToken = tokenServiceCreateJWT({id: refreshToken.userId})
        const newRefreshToken = await  tokenServiceCreateRefreshToken({id: refreshToken.userId})

        saveTokensInCookies(newToken, newRefreshToken, res)
        return res.status(201).send(newToken)
      }
    }
    return res.status(400).send('error')
}
} )
router.post('/refresh', )

export default router