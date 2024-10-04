import jwt from "jsonwebtoken";
import User from "../Models/userSchema.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      console.log("token does not exsits");
      return res.status(401).json({
        message: "token does not exist",
      });
    }

    const deccode = jwt.verify(token, process.env.JWT_KEY);
    const userId = deccode.id;

    const user = await User.findById(userId);
    if (!user) {
      console.log("the user does not exists");
    }

    req.body = userId;

    next();
  } catch (error) {
    console.log("can not authenticate seller id");
  }
};

export default authMiddleware;
