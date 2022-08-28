import React, { useState } from "react";
import VolunteerHomePage from "./Volunteer/Login/HomePage";
import StudentHomPage from "./Student/Login/HomePage";

const LoginOptions=()=>{
    const [selected,setSelected]=useState(false);
    const goToVolunteer=()=>{
        localStorage.setItem("userType","volunteer")
        setSelected(true)
    }
    const goToStudent=()=>{
        localStorage.setItem("userType","student")
        setSelected(true)
    }
    return <div>
        {(localStorage.getItem("userType")=="volunteer")?
        <VolunteerHomePage/>
        :(localStorage.getItem("userType")=="student")?
        <StudentHomPage/>:
        <div className="buttonCompriser">
            <button className="Button m-4 bg-white border-black text-black font-black" onClick={goToVolunteer}>Volunteer</button>
        <button className="Button m-4 bg-white border-black text-black font-black" onClick={goToStudent}>Student</button>
        </div>
}
        </div>
}
export default LoginOptions;