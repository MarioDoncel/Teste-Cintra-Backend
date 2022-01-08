import { NextFunction, Router, Request, Response } from "express";
import { IUsers, UsersModel } from "../../database/Model/Users";
import basicAuth from "../../middlewares/basicAuthentication";
import { createUser, generateJWT } from "../../resources/users/users.controllers";


const router = Router()


router.post('/create', createUser)
router.get('/login', basicAuth, generateJWT)

export default router