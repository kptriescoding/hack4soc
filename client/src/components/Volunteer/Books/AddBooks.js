import React,{useState} from "react";
import axios from "axios"
import { TextField } from "@mui/material";
const AddBooks = () => {
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
      name:formData.name.value,
      level:formData.level.value,
      language:formData.language.value,
    };
      var message;
    const res=await axios.post('/books/add',{ data })
    console.log(res.data)
      message=res.data.msg;
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
 const render=(<div class="">
  <form className="ml-36" >
  <div className="m-56 p-32 bg-white w-4/12 ml-96" >
      <div className=" align-middle text-6xl mb-8">
        Add Books
      </div >
      <div className="align-middle m-4"><TextField  id="filled-basic" label="Name" variant="filled" type="text" name="name" placeholder="Name" required/></div>
      <div className="align-middle m-4"><TextField id="filled-basic" label="Level" variant="filled"   type="level" name="level" placeholder="Level" required/></div>
      <div className="align-middle m-4"><TextField id="filled-basic" label="Language" variant="filled" type="language" name="language" placeholder="Language" required/></div>
     {(errorMessages.name==="error")?<p>{renderErrorMessage("error")}</p>:<div></div>}
      <button className="button-86 m-4 align-middle"type="submit" onClickCapture={handleSubmit}>Add</button>
     
   
  </div>
  </form>
  </div>)
  return render
}
export default AddBooks;
