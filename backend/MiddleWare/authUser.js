import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user. No token provided.",
    });
  }

  const authToken = token.split(" ")[1];

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
      error: error.message,
    });
  }
};

export { authUser };
