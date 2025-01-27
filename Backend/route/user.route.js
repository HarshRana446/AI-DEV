import { Router } from "express";
import { body } from "express-validator";
import * as userController from "../controller/user.controller.js";

const router = Router();

const registerValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
];

router.post("/register", registerValidation, userController.createUserController);

export default router;
