import { application, Router } from "express";
import Volunteer from "../model/Volunteer.js"
import Books from "../model/Books.js"
import Students from "../model/Students.js"

const router = Router();

router.post("/update_student", async (req, res) => {
    const student = req.body.data.student
    const score = req.body.data.score
    var current_rating = student.Rating

    const found_student = await Students.findOne({ Email: student.email })
    const read_book = await Books.findOne({ BookID: req.body.data.BookID })


    current_rating = current_rating + 100 * read_book * (student * (Objects.keys(student.BookCompleted).length))*score / 100
    found_student.Rating = current_rating


    if (found_student.Rating >= 1200 || (found_student.Level==1 && Objects.keys(found_student.BookCompleted).length>7)) {
        found_student.Level = 2
    } else if (found_student.Rating >= 1400 || (found_student.Level==2 && Objects.keys(found_student.BookCompleted).length>25)) {
        found_student.Level = 3
    } else if (found_student >= 1600 || (found_student.Level==3 && Objects.keys(found_student.BookCompleted).length>35)) {
        found_student.Level = 4
    }

    found_student.save()

    res.status(200).json({ return_status: success })
})

export default router;