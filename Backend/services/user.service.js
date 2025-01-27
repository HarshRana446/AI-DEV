import userModel from "../models/user.model.js";

export const createUser = async ({ email, password }) => {
  try {
    
    const user = await userModel.create({ email, password });
    return user;
  } catch (error) {
    if (error.code === 11000) {
      
      throw new Error("Email is already registered");
    }
    throw new Error("Failed to create user: " + error.message);
  }
};
