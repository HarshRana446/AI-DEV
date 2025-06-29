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

export const loginUserController = async (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email , password } = req.body;
    const user = await userModel.findOne({ email: email });

    if(!user || !(await user.comparePassword(password))) {
      return res.status(401).send("Invalid email or password");
    }

    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }

    const token = await user.generateJWT();
    res.status(200).json({ user: token });
  } catch (error) {
    res.status(400).send(error.message);
  }
}