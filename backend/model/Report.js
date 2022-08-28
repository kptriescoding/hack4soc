import mongoose from "mongoose";

const reportSchema=new mongoose.Schema({
    BookID:{
        type:String
    },
    Email:{
        type:String
    },
    Report:{
        type:String
    }
});
const Report=mongoose.model("report",reportSchema);
export default Report;