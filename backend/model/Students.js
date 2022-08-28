import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    Username: {
        type: String
    },
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    },
    Level:{
        type:String
    },
    BookBorrowed: [{
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
        Genre:{
            type:String
        }
    }],
    BookCompleted: [{
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
            Genre:{
                type:String
            }
    }],
    Rating: {
        type: String
    },

});
const Student = mongoose.model("student", studentSchema);
export default Student;