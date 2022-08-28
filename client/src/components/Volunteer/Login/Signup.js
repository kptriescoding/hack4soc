import React, { useState } from 'react';
import axios from "axios"
import { TextField } from '@mui/material';
const Signup = () => {
  const [errorMessages,setErrorMessages]=useState({});
  const renderErrorMessage=(name)=>
name===errorMessages.name &&(
  <div className='error'>{errorMessages.msg}</div>
)
const validateEmail=(email)=> {
 if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    setErrorMessages({
      name:"error",msg:"Invalid Email Type"
    })
    return (false)
}
const validatePassword=(password)=>{
  if(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password))
  return true;
  else
  setErrorMessages({
    name:"error",msg:"Password should be at least 8 letters long, have a small, capital letter and a symbol"
  })
  return false;
}
  const handleSubmit= async (event)=>{
    // var message;
    event.preventDefault();
    const formData=document.forms[0];
    const data={
      email:formData.email.value,
      password:formData.password.value,
      username:formData.username.value,
      name:formData.name.value,
      phone:formData.phone.value,
    };
    if(!validateEmail(data.email))return;
    if(!validatePassword(data.password))return;
   const register=await axios.post('/volunteer/register',{ data })
   if(register.data.data.msg=="Success"){
    localStorage.setItem("token",formData.email.value);
    window.location.url="/"
    window.location.reload()

   }
  }
  return <form  className='m-36'>
  <div>
    <div className=" align-middle text-6xl mb-8">
      Signup</div>
    <div className="align-middle m-4"><TextField  id="filled-basic" label="Username"type="text" name="username" placeholder="User name" required/></div>
      <div className="align-middle m-4"><TextField  id="filled-basic" label="Email"type="email" name="email" placeholder="Email" required/></div>
      <div className="align-middle m-4"><TextField  id="filled-basic"  label="Name"name="name" placeholder="Name" required/>
      </div>
      <div className="align-middle m-4"><TextField  id="filled-basic" label="Password" type="password" name="password" placeholder="Password" required/>
      </div>
      <div className="align-middle m-4"><TextField  id="filled-basic" label="Phone"type="text" name="phone" placeholder="Phone Number" required/>
      </div>
      <div>{(errorMessages.name==="error")?<p>{renderErrorMessage("error")}</p>:<div></div>}</div>
      <button className="button-86 m-4 align-middle" onClickCapture={handleSubmit}>
        Sign up
        </button>
        </div>;
    </form>
}
export default Signup;
