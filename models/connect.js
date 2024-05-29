import { Sequelize } from "sequelize";
import dbcConfig from "../src/config/db.config.js";

let{dbHost, dbPort, dbUser, dbPass, dbDialect, dbName} = dbcConfig;
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: dbDialect
})

try {
    await sequelize.authenticate(); //xác minh đã kết nối thành công chưa
    console.log("connect success");
} catch (error) {
    console.log("connect fail")
}

export default sequelize;