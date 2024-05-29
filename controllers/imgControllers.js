import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js";
import { Sequelize } from "sequelize";


const conn = initModels(sequelize);
const Op = Sequelize.Op;

const listImg = async (req, res) => {
   try {
      const data = await conn.hinh_anh.findAll();
      res.status(200).send(data)
   } catch (error) {
      res.status(404).send(error)
   }
}

const findImg = async (req, res) => {
   try {
      let { page, size } = req.params;
      let num_page = Number(page);
      let num_size = Number(size);
      let index = (num_page -1) * num_size;
      let { imgName } = req.query;
      const data = await conn.hinh_anh.findAll({
         where: {
            ten_hinh: {
               [Op.like]: `%${imgName}`
            }
         },
         limit: num_size,//giới hạn số lượng data cần lấy
         offset: index// lấy data bắt đầu từ vị trí thứ index
      });
      res.status(200).send(data)
   } catch (error) {
      res.status(404).send(error)
   }
}

const imgDetail = async (req, res) =>{
   try {
      const {hinh_id} = req.params;
      const data = await conn.hinh_anh.findOne({
         where:{
            hinh_id
         },
         include: "nguoi_dung"
      })
      res.status(200).send(data)
   } catch (error) {
      res.status(404).send(error)
   }
}

const commentImg = async (req, res) =>{
   try {
      const {hinh_id} = req.params;
      const data = await conn.binh_luan.findAll({
         where:{
            hinh_id
         }
      })
      res.status(200).send(data)
   } catch (error) {
      res.status(404).send(error)
   }
}
const checkLuuAnh =  async (req, res) =>{
   try {
      const {hinh_id} = req.params;
      const checkImg = await conn.luu_anh.findOne({
         where:{
            hinh_id
         },
      })
      if(checkImg){
         res.status(404).send("Đã tồn tại trong kho đã lưu")
      }else{
         const {nguoi_dung_id, hinh_id, ngay_luu} = req.body;
         const newLuuHinh = {
            nguoi_dung_id, 
            hinh_id, 
            ngay_luu
         }
         const data = await conn.luu_anh.create(newLuuHinh)
         res.send("luu anh thanh cong")
      }
   } catch (error) {
      res.status(404).send(error)
   }
}

const addComment = async (req, res) => {
   try {
      const {ngay_binh_luan, noi_dung, nguoi_dung_id, hinh_id} = req.body;
      const newComment = {
         ngay_binh_luan, 
         noi_dung, 
         nguoi_dung_id, 
         hinh_id
      }
      await conn.binh_luan.create(newComment)
      res.status(201).send("Bình luận thành công")
   } catch (error) {
      res.status(500).send(error)
   }
}

const deleteImg = async(req, res)=>{
   try {
       const {hinh_id} = req.params;
       await conn.hinh_anh.destroy({
           where: {
               hinh_id
           }
       })
       res.status(200).send("Xoá Thành công")
   } catch (error) {
       res.status(404).send(error)
   }
}

const addImg = async(req, res)=> {
   try {
      const {ten_hinh, duong_dan, mo_ta, nguoi_dung_id} = req.body;
      const newImg = {
         ten_hinh, 
         duong_dan, 
         mo_ta, 
         nguoi_dung_id
      }
      await conn.hinh_anh.create(newImg)
      res.status(200).send("Thêm ảnh thành công")
   } catch (error) {
       res.status(404).send(error)
   }
}

export { listImg, 
   imgDetail, 
   commentImg, 
   findImg, 
   checkLuuAnh, 
   addComment,
   deleteImg,
   addImg
}