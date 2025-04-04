import { sqlConnect, sql } from "../utils/sql.js";
import jwt from "jsonwebtoken";
import { verifyPassword } from "../utils/crypto.js";

export const login = async (req, res) => {
  const pool = await sqlConnect();
  const result = await pool
    .request()
    .input("username", sql.VarChar, req.body.username)
    .query("SELECT * FROM users WHERE username = @username");

  const user = result.recordset[0];

  if (!user) {
    return res.status(401).json({ message: "Usuario no encontrado" });
  }

  const isValid = verifyPassword(req.body.password, user.salt, user.password);

  if (!isValid) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ message: "Login exitoso", token, user });
};
