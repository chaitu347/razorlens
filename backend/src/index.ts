import express,{Request,Response} from "express"
import { connectDB } from "./db";

const app = express();
const PORT = 5000;

connectDB();

app.get("/",(req : Request,res : Response)=>{
    res.send(" Razorlens backend is working");
});

app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`);
});