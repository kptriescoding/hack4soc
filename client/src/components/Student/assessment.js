import React, { useState } from "react"; 
import { TextField } from "@mui/material";
import axios from "axios";
const Assessment=()=>{
    const [editorText,setEditorText]=useState();
    const [errorMessages,setErrorMessages]=useState({});
  const [,setLogin]=useState(false);
    const renderErrorMessage=(name)=>
  name===errorMessages.name &&(
    <div className='error'>{errorMessages.message}</div>
  )
    const goToSubmit=async(event)=>{
        event.preventDefault()
        const email=localStorage.getItem("token")
        const formData=document.forms[0];
    const data={
      email:email,
      bookId:formData.bookId.value,
      editorText:editorText
    };
      var message;
    const res=await axios.post('/student/addreport',{ data })
      message=res.data.msg;
      // console.log(res.data)
      if(message==="Input all values")setErrorMessages({name:"error",
    message:"Input all Values"
    });
    else if(message==="Invalid")setErrorMessages({name:"error",
    message:"Invalid username or password"
    });
    else {
    setLogin(true);
    window.location.reload();
    }
    }
    return(<form className="ml-36" >
    <div className="m-56 p-32 bg-white w-4/12 ml-96" >
        <div className=" align-middle text-6xl mb-8">
            <div className="align-middle m-4"><TextField  id="filled-basic" label="BookId" type="text" name="bookId" placeholder="BookId" required/></div>
      <textarea 
                value={editorText}
                onChange={(e) => setEditorText(e.target.value)}
                placeholder="Write your assignment here(min 250 words)"
                autoFocus={true} 
                        />
        <button className="button-86 m-4 align-middle"  onClick={goToSubmit}>Submit</button>
         {(errorMessages.name==="error")?<p>{renderErrorMessage("error")}</p>:<div></div>}
        </div>
        </div>
        </form>
        
    );
};
export default Assessment;