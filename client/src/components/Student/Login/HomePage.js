import React from "react";
import {useState,useEffect} from "react"
import axios from "axios"
import { Route,Routes } from "react-router-dom";
import LoginPage from "./StudentLogin-page";
import Navbar from "../Navbar";
import Assessment from "../assessment";
import GetRecommendedBooks from "../GetRecommendedBooks"
const HomePage=()=>{
   const [ignore,setIgnore]=useState(false);
   const [isLoggedIn,setIsLoggedIn]=useState(false);
   const checkLogged=async ()=>{
    const config={
      headers:{
        "x-auth-token":localStorage.getItem("token")
      }
    }
   const loggedData=await axios.get("/student/checklogged",config)
   if(loggedData.data.data.msg!=="notloggedin")
      setIsLoggedIn(true)
   }
   const handleLogout=()=>{
    localStorage.removeItem("userType")
    window.location.reload()
   }
  // eslint-disable-next-line
   useEffect(() => {
if(!ignore){
  checkLogged();
}
setIgnore(true);
 })
  return (
    <div>
     
      {isLoggedIn? <div><Navbar/>
        <div>
  <Routes>
<Route exact path='/student-assessment' element={<Assessment/>}></Route>
<Route exact path="/student-recommend" element={<GetRecommendedBooks/>}></Route>
{/* <Route exact path="/" element={<GetRecommendedBooks/>}></Route> */}
</Routes>    
</div>
</div>
        :<LoginPage/>
        }
    </div>
  );
}
export default HomePage;