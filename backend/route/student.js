import { Router } from "express";
import Student from "../model/Students.js"
import Book from "../model/Books.js";
import bcrypt from "bcryptjs"
import Report from "../model/Report.js";
const router = Router();
/**
 * @route   POST volunteer/register
 * @desc    Register new user
 * @access  Public
 */
router.post('/register', async (req, res) => {
    console.log("Here2")
  const { username, email, password, name } = req.body.data;
  if (!username || !password || !email || !name)
    return res.status(200).json({ msg: "Input all values" });
  try {
    console.log(email)
    const user = await Student.findOne({ Email: email })
    if (user) throw Error("User already exists");
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something is wrong with bcrypt")
    const hash = await bcrypt.hash(password, salt)
    if (!hash) throw Error("Something is wrong")
    const newUser = new Student({
      Username: username,
      Email: email,
      Name: name,
      Password: hash
    })
    const savedUser = await newUser.save();
    if (savedUser);
    // const token = jwt.sign(
    //   { email: newUser.Email},
    //   process.env.JWT_SECRET,
    //   { expiresIn: 3600 }
    // )
    // console.log(token);
    const data = {
      token: email,
      username: username,
      name: name, 
      email:email,
      msg:"Success"
    }
    return res.status(200).json({ data })
  }
  catch (e) {
    res.status(400).json({ error: e.message })
  }
})
/**
 * @route   POST volunteer/login
 * @desc    Log in user
 * @access  Public
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body.data;
  if (!password || !email)
    return res.status(200).json({ data: { msg: "Input all values" } });
  try {
    const user = await Student.findOne({ Email:email })
    if (!user) return res.status(200).json({ data: { msg: "Invalid" } })
    const isMatch = await bcrypt.compare(password, user.Password)
    if (!isMatch) return res.status(200).json({ data: { msg: "Invalid" } })
    // const token = jwt.sign(
    //   { email: user.Email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: 3600 }
    // )
    const data = {
      username: user.Username,
      email: user.Email,
      name: user.Name,
      token: email,
      msg: "Success"
    }
    return res.status(200).json({ data })
  }
  catch (e) {
    res.status(400).json({ error: e.message })
  }
})
/**
* @route   GET volunteer/checklogged
* @desc    Check if Logged
* @access  Public
*/
router.get("/checklogged",  async (req, res) => {
    const token=req.header('x-auth-token');
  const user = await Student.findOne({ Email: token }).select("-password")
  if (!user) res.status(200).json({ data:{
    msg: "notloggedin" 
}
  });
  else {
    try {
      const data = {
        username: user.Username,
        email: user.Email,
        Name: user.Name,
        token: req.body.token,
        msg: "loggedin"
      }
      res.status(200).json({ data });
    }
    catch (e) {
      res.send(e);
    }
  }
})

router.post("/addreport",  async (req, res) => {
    console.log("Here2")
    const {  email, editorText, bookId } = req.body.data;
    if (!bookId || !editorText || !email )
      return res.status(200).json({ msg: "Input all values" });
    try {
      console.log(email)
      const user = await Report.findOne({ BookID: bookId,Email:email })
      // if (user) throw Error("Report already exists");
      const newUser = new Report({
        BookID:bookId,
        Email:email,
        Report:editorText
      })
      const savedUser = await newUser.save();
      if (savedUser);
      return res.status(200).json({ msg:"Success" });
    }
    catch (e) {
      res.status(400).json({ error: e.message })
    }
})
router.post("/getrec", async (req, res) => {
    console.log(req.body)
    var current_student = await Student.findOne({ Email: req.body.email })
    var avail_books = await Book.find({})
   var read_books_array = current_student.BookCompleted
   var return_json_array=[]
    var ind = 0
    for (let i = 0; i < Object.keys(avail_books).length; i++) {
        var canPut = true
        for (let j = 0; j < Object.keys(read_books_array).length; j++) {
            if (read_books_array[j].Genre == avail_books[i].Genre) {
                canPut = false
                break
            }
        }
        if (canPut == true&&avail_books) return_json_array.push(avail_books[i])
    }
    res.status(200).json({ books: return_json_array });
})
export default router;
