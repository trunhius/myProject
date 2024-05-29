import express from "express";
import { addComment, addImg, checkLuuAnh, commentImg, deleteImg, findImg, imgDetail, listImg } from "../controllers/imgControllers.js";
import { khoaAPI } from "../src/config/jwt.js";

const imgRoutes = express.Router();

imgRoutes.get("/",khoaAPI, listImg);
imgRoutes.post("/comment",khoaAPI, addComment);
imgRoutes.get("/find-img/:page/:size",khoaAPI, findImg);
imgRoutes.get("/img-detail/:hinh_id",khoaAPI, imgDetail);
imgRoutes.get("/img-comment/:hinh_id",khoaAPI, commentImg);
imgRoutes.get("/check-luu-anh/:hinh_id",khoaAPI, checkLuuAnh);
imgRoutes.delete("/delete-img/:hinh_id",khoaAPI, deleteImg);
imgRoutes.post("/add-img",khoaAPI, addImg);

export {imgRoutes}
