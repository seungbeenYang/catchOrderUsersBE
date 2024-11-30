import express from 'express';
import orderRepository from "../repository/orderRepository.js";
import apiResponse from "../dto/apiResponse.js";

const orderController = express.Router();

// 주문 생성
orderController.post("/regist", async (req, res) => {
    const {userId, items} = req.body;
    console.log(items);
    try {
        // 입력 데이터 검증
        if (!userId || !items || items.length === 0) {
            return res.status(400).json(apiResponse.failure({
                message: "필수 데이터 누락"
            }));
        }

        // 여러 주문 삽입
        const result = await orderRepository.insertMultipleOrders(userId, items);

        res.status(200).json(apiResponse.success({
            message: "주문이 성공적으로 주문",
            result
        }));
    } catch (e) {
        res.status(400).json(apiResponse.failure({
            message: "주문 실패",
        }));
    }
})

// 주문내역
orderController.get("/details/:userId", async (req, res) => {
    try{
        const userId = req.params.userId;
        const Details = await orderRepository.selectOrdersDetails(userId);

        //조회 성공 시
        res.status(200).json(apiResponse.success({
            message: "성공적으로 조회하였습니다.",
            result: Details
        }));

    } catch (error) {
        console.error("Error getting menu", error);
    }
});


export default orderController;
