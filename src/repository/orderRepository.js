import conn from "../connection/dbConnection.js";


export default {
    // 여러 음식 주문 삽입
    insertMultipleOrders: async (userId, items) => {

        const query = `SELECT IFNULL(MAX(OrderId),0)+1 as orderId FROM Orders`;

        const sql = `
                             INSERT INTO Orders (orderId, menuId, userId, count, status)
                              values (?, ?, ?, ?, 0)`;
        try {
            const orderId = await conn.query(query, []);

            for (const item of items) {
                const {menuId, count} = item;
                await conn.query(sql, [orderId[0].orderId, menuId, userId, count]);
            }


            return {success: true};
        } catch (error) {
            console.error("Error getting menu", error);
            throw error;
        }
    },

    //주문 내역 조회
    async selectOrdersDetails(userId) {
        const sql = `SELECT 
                            M.menuName as MenuName,
                            M.menuPrice as MenuPrice,
                            O.count as count,
                            O.createdAt as createdAt
                            FROM Orders as O
                            LEFT JOIN Menu as M on O.menuId = M.menuId
                            WHERE O.userId = ?`;
        try {
            const rows = await conn.query(sql, [userId]);
            return rows;
        } catch (error) {
            console.error("Error getting available menu", error);
            throw error;
        }
    }

}