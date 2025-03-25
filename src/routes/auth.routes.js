import { Router } from "express";
import AuthController from "../controller/auth.controller.js";

const AuthRouter = Router();
AuthRouter.post("/auth/register", AuthController.register);
AuthRouter.post("/auth/login", AuthController.login);

export default AuthRouter;
