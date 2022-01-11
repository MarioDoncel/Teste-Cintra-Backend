import { NextFunction, Router, Request, Response } from "express";
import { IUsers, UsersModel } from "../../database/Model/Users";
import basicAuth from "../../middlewares/basicAuthentication";
import { createUser, userLogin,findUserById, logoutUser} from "../../resources/users/users.controllers";


const router = Router()


router.post('/create', createUser)
router.get('/login', basicAuth, userLogin)
router.get('/:id', findUserById)
router.put('/logout', logoutUser)

export default router