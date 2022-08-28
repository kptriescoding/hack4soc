import axios from "axios";
import React, { useEffect, useState } from "react"
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ViewBooks=()=>{
    const [Students,setStudents]=useState([])
    const funct=async ()=>{
        const config={
            data:localStorage.getItem("token")
        }
        const books=await axios.post("/volunteer/students",config)
        setStudents(books.data.students)
        console.log(books.data.students)
    }
    useEffect(() => {
        funct();
      },[]);
      const renderStudents = () => {
        if(Students==null)return;
        return <div className="grid grid-cols-4 gap-8 p-36 " >
            {
            Students.map((Student)=>{
            return <Card className="overflow-y-auto">
        <CardContent>
        <Typography variant="body2">Name: {Student.Name}</Typography>
            <Typography>Email: {Student.Email}</Typography>
            <Typography>Level: {Student.Level}</Typography>
            <Typography>Username: {Student.Username}</Typography>
            <Typography>BooksCompleted: {Student.BookCompleted.length}</Typography>
            <Typography>BooksBorrowed: {Student.BookBorrowed.length}</Typography>
            </CardContent>
            </Card>
        })
        }
        </div>
      };
      return renderStudents()
}

export default ViewBooks;

