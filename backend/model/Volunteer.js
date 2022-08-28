import mongoose from "mongoose";
const volunteerSchema=new mongoose.Schema({
    Username:{
        type:String
    },
    Name:{
        type:String
    },
    Email:{
        type:String
    },
    Password:{
        type:String
    },
    Students:[{
        type:String
    }],
    PhoneNumber:
        {
            type:String
        }
});
const Student=mongoose.model("volunteer",volunteerSchema);
export default Student;