import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Noto'g'ri token" });
    }
  }
  res.status(401).json({ success: false, message: "Token mavjud emas" });
};
export default AuthMiddleware;
