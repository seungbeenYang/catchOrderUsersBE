import express from 'express';
import menuRepository from "../repository/menuRepository.js";
import apiResponse from "../dto/apiResponse.js";

const menuController = express.Router();

menuController.get('/View', async (req, res, next) => {
    try {
        //메뉴 데이터 조회
        const menu = await menuRepository.getAvailableMenu();

        //조회 성공 시
        res.status(200).json(apiResponse.success({
            message: "성공적으로 조회하였습니다.",
            result: menu
        }));
    } catch (error) {
        console.error("Error getting menu", error);
        // next(error);
    }
});
export default menuController;