import conn from "../connection/dbConnection.js";


export default {
    // 여러 음식 주문 삽입
    insertMultipleOrders: async (userId, items)=>{
        const sql =`
                            INSERT INTO Orders (menuId, userId, count, status)
                            values (?, ?, ?, 0)`;
        try {

            for (const item of items){
                console.log(item);
                const {menuId, count} = item;
                await conn.query(sql, [menuId, userId, count]);
            }



            return {success: true};
        } catch (error) {
            console.error("Error getting menu", error);
            throw error;
        }
    }

}