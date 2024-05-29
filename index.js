import express from "express";
import cors from "cors";
import rootRoutes from "./routes/rootRoutes.js";


const app = express();
const port = 3000;


app.use(express.json())////middleware để parse body string thành body json
app.use(express.static("."))//middleware để xác định nơi lưu file
app.use(cors());// cả các repuest từ fe đều nhận
app.use(rootRoutes)

app.listen(port,() => {
    console.log("BE is starting");
});