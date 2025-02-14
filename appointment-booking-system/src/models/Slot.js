const db = require('../config/database');

class Slot {
    static async findAvailable() {
        try {
            const [rows] = await db.query(
                'SELECT * FROM slots WHERE is_available = true AND date >= CURDATE() ORDER BY date, start_time'
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM slots WHERE id = ?',
                [id]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create({ date, start_time, end_time }) {
        try {
            const [result] = await db.query(
                'INSERT INTO slots (date, start_time, end_time) VALUES (?, ?, ?)',
                [date, start_time, end_time]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async updateAvailability(id, isAvailable) {
        try {
            const [result] = await db.query(
                'UPDATE slots SET is_available = ? WHERE id = ?',
                [isAvailable, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Slot;