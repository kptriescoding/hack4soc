// eslint-disable-next-line
import React,{useState}from "react";
import Login  from "./StudentLogin";
import Signup from "./StudentSignUp";
const LoginPage = () => {
    const [type,setType]=useState("login");
  const setLogin=()=>{
    setType("login")
  }
  const setSignup=()=>{
    setType("signup")
  }
  const goBack=()=>{
    localStorage.removeItem("userType")
    window.location.reload()
  }
   const renderLoginPage= <div className="m-54 p-32 bg-white w-5/12 ml-80">
    <div>
    <button className="button-30 align-middle m-4" onClick={goBack}>GoBack</button>
      <button className="button-30 align-middle m-4" disabled={type==="login"||type==="notsignedup"}  onClickCapture={setLogin}>Login</button>
     <button className="button-30 align-middle m-4" disabled={type==="signup"||type==="hasaccount"}  onClickCapture={setSignup}>Signup</button>
     </div> 
     {(type==="login"||type==="signedup")?<Login/>:<Signup/>
     }
    </div>
    return renderLoginPage;
}
export default LoginPage;
