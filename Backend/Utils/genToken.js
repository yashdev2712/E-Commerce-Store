import jwt from "jsonwebtoken";

const genToken = (userId, res) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    res.cookie("authToken", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      // httpOnly: true,
    });
  } catch (error) {
    console.error("Error generating token:", error.message);
  }
};

export default genToken;
