class Appointment {
    static async create({ user_id, slot_id }) {
        try {
            const [result] = await db.query(
                'INSERT INTO appointments (user_id, slot_id) VALUES (?, ?)',
                [user_id, slot_id]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async findByUser(userId) {
        try {
            const [rows] = await db.query(
                `SELECT 
                    a.id, a.status, a.created_at,
                    s.date, s.start_time, s.end_time
                FROM appointments a
                JOIN slots s ON a.slot_id = s.id
                WHERE a.user_id = ?
                ORDER BY s.date, s.start_time`,
                [userId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM appointments WHERE id = ?',
                [id]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async cancel(id, userId) {
        try {
            const connection = await db.getConnection();
            await connection.beginTransaction();

            try {
                // Update appointment status
                const [updateResult] = await connection.query(
                    'UPDATE appointments SET status = "cancelled" WHERE id = ? AND user_id = ?',
                    [id, userId]
                );

                if (updateResult.affectedRows === 0) {
                    throw new Error('Appointment not found');
                }

                // Get slot_id
                const [appointments] = await connection.query(
                    'SELECT slot_id FROM appointments WHERE id = ?',
                    [id]
                );

                // Update slot availability
                await connection.query(
                    'UPDATE slots SET is_available = true WHERE id = ?',
                    [appointments[0].slot_id]
                );

                await connection.commit();
                return true;
            } catch (error) {
                await connection.rollback();
                throw error;
            } finally {
                connection.release();
            }
        } catch (error) {
            throw error;
        }
    }
}