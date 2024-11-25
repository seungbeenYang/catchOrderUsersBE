import express from 'express';
import authController from "./src/controller/authController.js";

const app = express();

app.use(express.json());



app.listen(4000, async () => {
    console.log("서버가 4000번 포트에서 작동중입니다.");
});