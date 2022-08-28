import React,{useState} from "react";
import axios from "axios"
import { TextField } from "@mui/material";
const IssuedBook = () => {
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
      parentEmail:localStorage.getItem("token")
    };
      var message;
    const res=await axios.post('/books/issue',{ data })
    console.log(res)
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
 const render=((<form className="ml-36" >
 <div className="m-56 p-32 bg-white w-4/12 ml-96" >
     <div className=" align-middle text-6xl mb-8">
        Issue Books
      </div>
      <div className="align-middle m-4"><TextField  id="filled-basic" label="Email" variant="filled"  type="level" name="email" placeholder="Email" required/></div>
      <div className="align-middle m-4"><TextField  id="filled-basic" label="BookId" variant="filled"  type="language" name="bookId" placeholder="BookId" required/></div>
     {(errorMessages.name==="error")?<p>{renderErrorMessage("error")}</p>:<div></div>}
     <button className="button-86 m-4 align-middle"  onClickCapture={handleSubmit}>Add</button>
      </div>
    </form>))
  return render
}
export default IssuedBook;
