import { validationResult } from "express-validator";
import * as userService from "../services/user.service.js";

export const createUserController = async (req, res) => {
  const errors = validationResult(req);

  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    
    const user = await userService.createUser(req.body);

    
    const token = user.generateJWT();

    
    const sanitizedUser = {
      id: user._id,
      email: user.email,
    };

    res.status(201).json({ user: sanitizedUser, token });
  } catch (error) {
    if (error.message === "Email is already registered") {
      return res.status(400).send({ error: error.message });
    }

    res.status(500).send({ error: error.message || "Server Error" });
  }
};
