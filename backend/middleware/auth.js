// import jwt from "jsonwebtoken"

// const auth=(req,res,next)=>{
//     const token=req.header('x-auth-token');
// //    const JWT_SECRET=process.env.JWT_SECRET;
//     if(!token){
//         return res.status(200).json({data:{msg:"notloggedin"}})
//     }
//     try{
//         // console.log("Here")
//     const decoded=jwt.verify(token,JWT_SECRET)
//     req.body.user=decoded;
//     req.body.token=token;
//     next();
//     }
//     catch(e){
//         console.log("Here")
//         res.status(200).json({data:{msg:"notloggedin"}})
//     }
// }
// export default auth