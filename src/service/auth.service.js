import client from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CustomError from "../utils/customError.js";

class AuthService {
  static async register(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    return result.rows[0];
  }

  static async login(email, password) {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0)
      throw new CustomError("Foydalanuvchi topilmadi", 404);
    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new CustomError("Noto'g'ri parol", 401);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return {
      token,
      user: { id: user.id, username: user.username, email: user.email },
    };
  }
}
export default AuthService;
