import AuthService from "../service/auth.service.js";
import CustomError from "../utils/customError.js";

class AuthController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await AuthService.register(username, email, password);
      res.json({
        success: true,
        message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi",
        user,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return res
          .status(error.status)
          .json({ success: false, message: error.message });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { token, user } = await AuthService.login(email, password);
      res.json({
        success: true,
        message: "Muvaffaqiyatli tizimga kirdingiz",
        token,
        user,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return res
          .status(error.status)
          .json({ success: false, message: error.message });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
export default new AuthController();
