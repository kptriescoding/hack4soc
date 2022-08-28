 import React ,{useEffect, useState}from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from "axios";
const DashBoard=()=>{
  const [issuedBooks,setIssuedBooks]=useState(0);
  const [AvailableBooks,setAvailableBooks]=useState(0);
  const [ignore,setIgnore]=useState("")
 const getData=async()=>{
  const a=await axios.get("/volunteer/getdata");
  console.log(a.data.user)
  var issuedBook=0,availaBleBooks=0;
  for(var i=0;i<a.data.user.length;i++){{
    // console.log(a.data.user[i].Status)
    if(a.data.user[i].Status==="Available")availaBleBooks++
    else issuedBook++;
  }
    setIssuedBooks(issuedBook)
    setAvailableBooks(availaBleBooks)
  }

  }
  useEffect(() => {
    if(!ignore){
      getData();
    }
    setIgnore(true);
     })

      return (
       <div>
        
          {/* <div class="IssuedBooks">
          <h1>Total no. of books issued={issuedBooks}</h1>

        </div>
         <div class="AvailableBooks">
         <h1>Total no. of books available={AvailableBooks}</h1>

       </div>
       </div> */}
       
      <Card className="Card1" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
          Total No. of books available={AvailableBooks}
       </Typography>
      
      </CardContent>
      
    </Card>
   
    <Card className="Card1" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 40}} color="text.secondary" gutterBottom>
          Total No. of books issued={issuedBooks}
       </Typography>
       </CardContent>
       </Card>
      
    </div>
      );
    
}
export default DashBoard;