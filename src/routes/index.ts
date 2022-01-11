import { NextFunction, Request, Response, Router } from "express";
import userRoutes from './users'
import tokenRoutes from './token'

const routes = Router()

routes.get('/', (req:Request,res:Response,next:NextFunction)=>{
  res.status(200).send('Hello Dev, Server working properly.')
})

routes.use('/users', userRoutes)
routes.use('/token', tokenRoutes)

export default routes