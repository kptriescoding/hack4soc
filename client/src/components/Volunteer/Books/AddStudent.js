import React,{useState} from "react";
import axios from "axios"
import { TextField} from "@mui/material";
const AddStudent = () => {
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
      studentEmail:formData.email.value,
      email:localStorage.getItem("token")
    };
      var message;
    const res=await axios.post('/books/addstudent',{ data })
      message=res.data.data.msg;
      if(message==="Input all values")setErrorMessages({name:"error",
    message:"Input all Values"
    });
    else if(message==="Invalid")setErrorMessages({name:"error",
    message:"Invalid entry"
    });
    else {
    setLogin(true);
    window.location.reload();
    }
  }
 const render=(<form className="ml-36" >
 <div className="m-56 p-32 bg-white w-4/12 ml-96" >
     <div className=" align-middle text-6xl mb-8">
        Add Student
      </div>
      <div className="align-middle m-4"><TextField  id="filled-basic" label="Filled" variant="filled" type="text" name="email" placeholder="Email" required/></div>
     {(errorMessages.name==="error")?<p>{renderErrorMessage("error")}</p>:<div></div>}
     <button className="button-86 m-4 align-middle" onClickCapture={handleSubmit}>Add</button>
  </div>
  </form>)
  return render
}
export default AddStudent;
