import React,{useState} from "react";
import axios from "axios"
import { TextField } from "@mui/material";
const Login = () => {
  const [errorMessages,setErrorMessages]=useState({});
  const [,setLogin]=useState(false);
    const renderErrorMessage=(name)=>
  name===errorMessages.name &&(
    <div className='error'>{errorMessages.message}</div>
  )
  const handleSubmit=async (event)=>{
    event.preventDefault();
    const formData=document.forms[0];
    const data={
      email:formData.email.value,
      password:formData.password.value
    };
      var message;
    const res=await axios.post('/student/login',{ data })
      message=res.data.data.msg;
      if(message==="Input all values")setErrorMessages({name:"error",
    message:"Input all Values"
    });
    else if(message==="Invalid")setErrorMessages({name:"error",
    message:"Invalid username or password"
    });
    else {
    localStorage.setItem("token",formData.email.value)
    setLogin(true);
    window.location.url="/"
    window.location.reload()
    }
  }
 const render=(<form className="ml-36">
    <div className="" >
      <div className=" align-middle text-6xl mb-8">
        Login
      </div>
      <div className="align-middle m-4"><TextField  id="filled-basic" label="Email"  type="email" name="email" placeholder="Email" required/></div>
      <div className="align-middle m-4"><TextField  id="filled-basic" label="Password" type="password" name="password" placeholder="Password" required/></div>
     {(errorMessages.name==="error")?<p>{renderErrorMessage("error")}</p>:<div></div>}
      <button className="button-86 m-4 align-middle" type="submit" onClickCapture={handleSubmit}>Sign In</button>
     </div>
    </form>)
  return render
}
export default Login;
