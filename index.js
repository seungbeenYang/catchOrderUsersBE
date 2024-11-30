import express from 'express';
import menuController from "./src/controller/menuController.js";
import orderController from "./src/controller/orderController.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/menu", menuController);
app.use("/api/orders", orderController);



app.listen(4000, async () => {
    console.log("서버가 4000번 포트에서 작동중입니다.");
});