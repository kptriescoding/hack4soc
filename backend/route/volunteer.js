import { Router } from "express";
import Volunteer from "../model/Volunteer.js"
import bcrypt from "bcryptjs"
import Student from "../model/Students.js";
// import AddBooks from "../../client/src/components/Volunteer/Books/AddBooks.js";
import Book from "../model/Books.js";
// import jwt from "jsonwebtoken"
// import auth from "../middleware/auth.js";
const router = Router();
/**
 * @route   POST volunteer/register
 * @desc    Register new user
 * @access  Public
 */

router.post('/register', async (req, res) => {
    console.log("Here2")
  const { username, email, password, name ,phone} = req.body.data;
  if (!username || !password || !email || !name||!phone)
    return res.status(200).json({ msg: "Input all values" });
  try {
    console.log(email)
    const user = await Volunteer.findOne({ Email: email })
    if (user) throw Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something is wrong with bcrypt")

    const hash = await bcrypt.hash(password, salt)
    if (!hash) throw Error("Something is wrong")
    const newUser = new Volunteer({
      Username: username,
      Email: email,
      Name: name,
      Password: hash,
      PhoneNumber:phone
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
    const user = await Volunteer.findOne({ Email:email })
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
  const user = await Volunteer.findOne({ Email: token }).select("-password")
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
router.post("/students",async(req,res)=>{
  const user= await Volunteer.findOne({Email:req.body.data}).select("-password")
  console.log(user)
  var students=[]
  for(var i=0;i<user.Students.length;i++){
    students.push(await Student.findOne({Email:user.Students[i]}))
  }
  return res.status(200).json({students:students})
  
})
router.get("/getdata",async(req,res)=>{
  const user= await Book.find({})
  console.log(user)
  return res.status(200).json({user});
  
})


export default router;
