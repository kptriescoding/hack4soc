import React,{useState} from "react";
import axios from "axios"
// import { TextField } from "@mui/icons-material";
import { TextField } from "@mui/material";
const ReturnBook = () => {
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
      bookId:formData.bookId.value,
    };
      var message;
    const res=await axios.post('/books/return',{ data })
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
 return <form className="ml-36" >
 <div className="m-56 p-32 bg-white w-4/12 ml-96" >
     <div className=" align-middle text-6xl mb-8">
        Return Books
      </div>
      <div className="align-middle m-4"><TextField  id="filled-basi" label="Email" type="email" name="email" placeholder="Email" required/>
      </div>
      <div className="align-middle m-4"><TextField  id="filled-basic" label="BookId" type="bookId" name="bookId" placeholder="BookId" required/>
       </div>
     {(errorMessages.name==="error")?<p>{renderErrorMessage("error")}</p>:<div></div>}
     <button className="button-86 m-4 align-middle"  type="submit" onClickCapture={handleSubmit}>Sign In</button>
     </div>
    </form>
}
export default ReturnBook
