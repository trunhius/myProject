import jwt from "jsonwebtoken";
import sequelize from "../../models/connect.js";
import initModels from "../../models/init-models.js";

const conn = initModels(sequelize);

const createToken = (data)=>{
    return jwt.sign({data}, "NODE38", {expiresIn:"3y"})//30m
}

const checkToken = (token) =>{
    return jwt.verify(token, "NODE38", (err, decoded)=>{
        if(err){
            return{
                statusCode: 401,
                message: "Invalid token"
            }
        }
        return{
            statusCode:200,
            data: decoded
        } 

    })
}

const khoaAPI = async(req, res, next)=>{
    let {token}= req.headers;
    
    if(token){
        let verifyToken = checkToken(token);

        if(verifyToken.statusCode === 401){
            res.status(401).send(verifyToken.message);
            return;
        }
        //nếu muốn check role
        let {data} = verifyToken.data;

        let checkUser = await conn.nguoi_dung.findOne({
            where:{
                nguoi_dung_id: data.nguoi_dung_id
            }
        })
        if(!checkUser){
            res.status(401).send("invalid")
            return
        }
        next();
    }else{
        res.status(401).send("Không được phép!")
        return
    }
}
export {
    checkToken,
    createToken,
    khoaAPI
}