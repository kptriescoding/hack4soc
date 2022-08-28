import mongoose from "mongoose";

const bookSchema=new mongoose.Schema({
    BookID:{
        type:String
    },
    Name:{
        type:String
    },
    Level:{
        type:String
    },
    Difficulty:{
        type:String
    },
    Language:{
        type:String
    },
    Status:{
        type:String
    },
    CurrentOwner:{
        type:String
    },
});
const Book=mongoose.model("book",bookSchema);
export default Book;