import { Router} from "express";
import { validateAndRefreshTokens } from "../../resources/token/token.controllers";

const router = Router()

router.get('/validate', validateAndRefreshTokens)


export default router