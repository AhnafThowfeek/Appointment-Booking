const db = require("../config/database");
const bcrypt = require("bcryptjs");

class User {
  static async findByEmail(email) {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create({ name, email, password, role = "user" }) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const [result] = await db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, role]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
