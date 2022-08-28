// eslint-disable-next-line
import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
const LoginPage = () => {
  const [type, setType] = useState("login");
  const setLogin = () => {
    setType("login")
  }
  const setSignup = () => {
    setType("signup")
  }
  const goBack=()=>{
    localStorage.removeItem("userType")
    window.location.reload()
   }
  const renderLoginPage = <div className="m-54 p-32 bg-white w-5/12 ml-80">
    <div >
      <button className="button-30 align-middle m-4" onClickCapture={goBack}>Go Back</button>
      <button className="button-30 align-middle m-4" disabled={type === "login" || type === "notsignedup"} onClickCapture={setLogin}>Login</button>
      <button className="button-30 align-middle m-4" disabled={type === "signup" || type === "hasaccount"} onClickCapture={setSignup}>Signup</button>
      {(type === "login" || type === "signedup") ? <Login /> : <Signup />}
    </div>
  </div>
  return renderLoginPage;
}
export default LoginPage;
