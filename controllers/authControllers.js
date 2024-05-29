
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcrypt"//thư viện mã hoá password
import { createToken } from "../src/config/jwt.js";

const conn = initModels(sequelize);

const sigIn = async (req, res) => {
    try {
        let { email, mat_khau, ho_ten, tuoi} = req.body;
        let data = await conn.nguoi_dung.findOne({
            where: {
                email: email
            },
           
        })
        if (data) {
            res.status(400).send("Tài khoản đã tồn tại")
        }else{
             //mã hoa password
             let encodePassword = bcrypt.hashSync(mat_khau, 10);
             let newUser = {
                 email,
                 mat_khau: encodePassword,
                 ho_ten,
                 tuoi,
             }
             await conn.nguoi_dung.create(newUser)
             res.status(201).send("Đăng ký thành công")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const logIn = async (req, res) => {
    try {
        let { email, mat_khau } = req.body;

        let data = await conn.nguoi_dung.findOne({
            where: {
                email: email
            }
        })
        if (data) {
            let checkMatKhau = bcrypt.compareSync(mat_khau, data.mat_khau);
            if(checkMatKhau){
                let payloat = {
                    nguoi_dung_id: data.nguoi_dung_id
                };
                let token = createToken(payloat);
                res.status(200).send(token);
            }else{
                res.status(400).send("Mật khẩu không đúng!")
            }
        }
        else {
            res.status(404).send("Tai khoan khong ton tai!")    
        }
    } catch (error) {
        res.send(error)
    }
}

export {
    sigIn,
    logIn
}