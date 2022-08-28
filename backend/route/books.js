import { application, Router } from "express";
import Volunteer from "../model/Volunteer.js"
import Books from "../model/Books.js"
import Student from "../model/Students.js";

const router = Router();

/**
 * @route   POST volunteer/login
 * @desc    Log in user
 * @access  Public
 */
let myTimeout;
 router.post('/add', async (req, res) => {
    const { name, language,level } = req.body.data;
    if (!name || !language,!level)
      return res.status(200).json({ data: { msg: "Input all values" } });
    try {
        var bookId=await Books.count()
        var bookId="book"+bookId;
        var difficulty=0;
        const newBook = new Books({
          Name:name,
          Language:language,
          Level:level,
          Difficulty:difficulty,
          BookID:bookId,
          Status:"Available"

        })
        const savedBook = await newBook.save();
        return res.status(200).json({ msg:"Success" })
    }
    catch (e) {
      res.status(400).json({ error: e.message })
    }
  })
  router.get("/get",async (req,res)=>{
        const books=await Books.find({});
        res.status(200).json({books:books})
  })

  router.post('/addstudent', async (req, res) => {
    const { email,studentEmail } = req.body.data;
    if (!email)
      return res.status(200).json({ data: { msg: "Input all values" } });
    try {
        const volunteer=await Volunteer.findOne({Email:email})
        if(volunteer.Students==null)volunteer.Students=[]
        volunteer.Students.push(studentEmail) 
        console.log(volunteer)
        await volunteer.save();
        return res.status(200).json({data:{msg:"Input All Values"}})
    }
    catch (e) {
      res.status(400).json({ error: e.message })
    }
  })
  router.post('/return', async (req, res) => {
    const { email,bookId } = req.body.data;
    console.log(email+bookId)
    if (!email)
      return res.status(200).json({ data: { msg: "Input all values" } });
    try {
        const student=await Student.findOne({Email:email})
        const book=await Books.findOne({BookID:bookId})
        book.Status="Available"
        book.save()
        if(student.BookCompleted==null)student.BookCompleted=[]
        student.BookCompleted.push(book)
        student.BookBorrowed = student.BookBorrowed.filter(item => item.BookID !== book.BookID) 
       if(myTimeout) clearTimeout(myTimeout); 
        await student.save()
        return res.status(200).json({data:{msg:"Input All Values"}})
        
    }
    catch (e) {
      res.status(400).json({ error: e.message })
    }
  })
  router.post('/issue', async (req, res) => {
    console.log(req.body.data)
    const { email,bookId ,parentEmail} = req.body.data;
    if (!email)
      return res.status(200).json({ data: { msg: "Input all values" } });
    try {
        const student=await Student.findOne({Email:email})
        const book=await Books.findOne({BookID:bookId})
        const volunteer=await Volunteer.findOne({Email:parentEmail})
        console.log(book)
        book.Status="Borrowed"
        book.save()
        if(student.BookBorrowed==null)student.BookBorrowed=[]
        student.BookBorrowed.push(book)    
        await student.save()
        var phone=volunteer.PhoneNumber
        var message="Reminder to collect book "+book.BookID+" from student "+student.Email;
        console.log(new Date(Date.now()+100000).toUTCString())
        sendMessage(phone,message)

      res.status(200).json({ msg:"Success" })
    }
    catch (e) {
      res.status(400).json({ error: e.message })
    }
  })
  const sendMessage=async(phone,message)=>{
    try{
    phone="+91"+phone;
    const accountSid = process.env.TWILIO_ACC_SID
    const token = process.env.TWILIO_AUTH_TOKEN
    const client = twilio(accountSid, token);
   const res=await client.messages
      .create({
        body: message,
        from: "+18787688386",
        // sendAt: new Date(Date.now()+100000).toUTCString(),
        //  scheduleType: 'fixed',
        to: phone,
      })
      console.log(res)
    }
    catch {
      
    }
    }
  export default router;