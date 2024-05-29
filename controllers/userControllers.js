import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import {checkToken} from "../src/config/jwt.js"


const conn = initModels(sequelize);

const userInformation = async(req, res) =>{
    try {
        let {token} = req.headers;
        const decoded = checkToken(token);

        const {data} = decoded.data;
        const user = await conn.nguoi_dung.findAll({
            where:{
                nguoi_dung_id: data.nguoi_dung_id
            }
        })
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send(error)
    }
}

const anhDaLuu = async(req, res) =>{
    try {
        const {nguoi_dung_id} = req.params;
        const data = await conn.luu_anh.findAll({
            where:{
                nguoi_dung_id
            }
        })
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error)
    }
}

const anhDaDang = async(req, res) =>{
    try {
        const {nguoi_dung_id} = req.params;
        const data = await conn.hinh_anh.findAll({
            where:{
                nguoi_dung_id
            }
        })
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error)
    }
}
const updateUser = async(req, res) => {
    try {
        let {token} = req.headers;

        let {nguoi_dung_id} = req.params;
        let { email, mat_khau, ho_ten, tuoi} = req.body;
        const updateUser = {
            email, 
            mat_khau, 
            ho_ten, 
            tuoi
        }
        const decoded = checkToken(token);
        const {data} = decoded.data;

        if(data.nguoi_dung_id !==  parseInt(nguoi_dung_id, 10)){
            return res.status(403).send("truy cập trái phép!");
        }else{
            await conn.nguoi_dung.update(updateUser,{
                where:{
                    nguoi_dung_id
                }
            })
            res.status(200).send("cập nhật tài khoảng thành công")
        }
    } catch (error) {
        res.status(404).send(error)
    }
}
export {
    userInformation,
    anhDaLuu,
    anhDaDang,
    updateUser
}

