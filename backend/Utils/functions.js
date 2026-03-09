// create token
import jwt from "jsonwebtoken";

const createToken = (user) => {
  if (!user) {
    throw new Error("User not provided for token creation");
  }
  const payload = {
    id: user._id,
    email: user.email,
    userType: user.userType,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export default createToken;
