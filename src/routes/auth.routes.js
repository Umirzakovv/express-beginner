import { Router } from "express";
import * as AuthController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), AuthController.register);

router.post("/login", validate(loginSchema), AuthController.login);

router.get("/me", authMiddleware, allowRoles("user"), AuthController.getMe);

export default router;
