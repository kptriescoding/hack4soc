import express from "express"
import path from "path"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import volunteerRouter from "./route/volunteer.js"
import booksRouter from "./route/books.js"
import studentRouter from "./route/student.js"
// import rankupdateRouter from "./route/rankupdate.js"
// import chatRouter from "./route/chats.js"
// import personalRouter from "./route/personal.js"
const __dirname=path.resolve()

dotenv.config({path:__dirname+"/.env"});
const app=express()
const url=process.env.DATABASE_URL
mongoose
    .connect(url,
        { useNewUrlParser: true,
             useUnifiedTopology: true
        })
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/volunteer",volunteerRouter)
app.use("/books",booksRouter)
app.use("/student",studentRouter)
// app.use("/rankupdateRouter",rankupdateRouter)
// app.use("/personal",personalRouter)
app.use(express.static(path.join(__dirname, "client","build")))
const PORT = process.env.PORT || 8081;
// app.get("*",(req,res)=>{
//     res.sendFile(path.join(__dirname, "client","build","index.html"))
// })
app.listen(PORT, console.log(`Server started on port ${PORT}`));