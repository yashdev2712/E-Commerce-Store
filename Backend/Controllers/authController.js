import z from "zod";
import User from "../Models/userSchema.js";
import bcrypt from "bcrypt";
import genToken from "../Utils/genToken.js";

export const signupRoute = async (req, res) => {
  try {
    const { fullName, userName, email, password } = req.body;
    if (!fullName || !userName || !email || !password) {
      return res.status(401).json({
        message: "all fields are required",
      });
    }

    if (!password.length > 6) {
      return res.status(401).json({
        message: "password length should be of atleast 6 character",
      });
    }

    const signupBody = z.object({
      fullName: z.string(),
      userName: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const result = signupBody.safeParse(req.body);
    console.log(result);

    if (!result.success) {
      return res.status(401).json({
        message: "error in input validation",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "user already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      userName,
      email,
      password: hashedPassword,
    });

    genToken(user._id, res);

    return res.status(201).json({
      userId: user._id,
      fullName,
      userName,
      email,
      message: "account successfully created",
    });
  } catch (error) {
    console.log("an error occured in signup route:", error.message);
  }
};

export const loginRoute = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "all fields are required",
      });
    }

    if (!password.length > 6) {
      return res.status(401).json({
        message: "password length should be of atleast 6 character",
      });
    }

    const loginBody = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const result = loginBody.safeParse(req.body);
    if (!result.success) {
      return res.status(401).json({
        message: "error in input validation",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(403).json({
        message: "password is wrong",
      });
    }

    genToken(user._id, res);

    return res.status(202).json({
      userId: user._id,
      email,
      message: "successfully logged in",
    });
  } catch (error) {
    console.log("an error occured in login route:", error.message);
  }
};

export const logoutRoute = async (req, res) => {
  try {
    res.cookie("authToken", "");
    res.status(201).json({
      message: "log out successfully",
    });
  } catch (error) {
    console.log("an error occured in logout route:", error.message);
  }
};
