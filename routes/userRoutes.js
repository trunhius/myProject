import express from "express"
import { anhDaDang, anhDaLuu, updateUser, userInformation } from "../controllers/userControllers.js";
import { khoaAPI } from "../src/config/jwt.js";


const userRoutes = express.Router()

userRoutes.get("/infor",khoaAPI, userInformation);
userRoutes.get("/anh-da-luu/:nguoi_dung_id",khoaAPI, anhDaLuu);
userRoutes.get("/anh-da-dang/:nguoi_dung_id",khoaAPI, anhDaDang);
userRoutes.put("/update-user/:nguoi_dung_id",khoaAPI, updateUser);


export default userRoutes;