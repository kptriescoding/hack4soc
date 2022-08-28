import React from "react";
import {useState,useEffect} from "react"
import axios from "axios"
import DashBoard from "../DashBoard";
import AddBooks from "../Books/AddBooks";
import { Route,Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ViewBooks from "../Books/ViewBooks";
import LoginPage from "./Login-Page";
import AddStudent from "../Books/AddStudent";
import IssueBook from "../Books/IssueBook"
import ReturnBook from "../Books/ReturnBook"
import GetStudentInfo from "../Books/GetStudentsInfo"

const HomePage=()=>{
   const [ignore,setIgnore]=useState(false);
   const [isLoggedIn,setIsLoggedIn]=useState(false);
   const checkLogged=async ()=>{
    const config={
      headers:{
        "x-auth-token":localStorage.getItem("token")
      }
    }
   const loggedData=await axios.get("/volunteer/checklogged",config)
   if(loggedData.data.data.msg!=="notloggedin")
      setIsLoggedIn(true)
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
      {(isLoggedIn)?<div>
        <div>
  <Navbar/>
  <Routes>
<Route exact path='/volunteer' element={<DashBoard/>}></Route>
<Route exact path='/volunteer-add-books' element={< AddBooks />}></Route>
<Route exact path='/volunteer-dashboard' element={<div>Hello World</div>}></Route>
<Route exact path='/volunteer-view-books' element={<ViewBooks/>}></Route>
<Route exact path="/volunteer-add-student" element={<AddStudent/>}></Route>
<Route exact path="/volunteer-issue-books" element={<IssueBook/>}></Route>
<Route exact path="/volunteer-return-books" element={<ReturnBook/>}></Route>
<Route exact path="/volunteer-student" element={<GetStudentInfo/>}></Route>
</Routes>    
</div>
        </div>
        :<LoginPage/>
        }
    </div>
  );
}
export default HomePage;