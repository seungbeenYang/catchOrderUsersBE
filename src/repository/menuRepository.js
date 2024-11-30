import conn from "../connection/dbConnection.js";

//메뉴
export default {
    async getAvailableMenu() {
        // 사용 가능 메뉴만 조회
        const sql = `SELECT *
                            FROM Menu
                            WHERE status = 0`;

        try {
            const rows = await conn.query(sql);
            return rows;
        } catch (error) {
            console.error("Error getting available menu", error);
            throw error;
        }
    }

};