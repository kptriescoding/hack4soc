import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ViewBooks=()=>{
    const [Books,setBooks]=useState([])
    const funct=async ()=>{
        const books=await axios.get("/books/get")
        setBooks(books.data.books)
        console.log(books)
    }
    useEffect(() => {
        funct();
      },[]);
      const renderBooks = () => {
        if(Books==null)return;
        return <div className="grid grid-cols-4 gap-8 p-36 " >
            {
            Books.map(
                (Book)=>{
            return <Card className="overflow-y-auto">
        {/* <img src="https://www.kobo.com/in/en/ebook/nobody-in-particular" alt="" /> */}
        <CardContent>
        <Typography variant="body2">BookId: {Book.BookID}</Typography>
            <Typography>Name: {Book.Name}</Typography>
            <Typography>Level: {Book.Level}</Typography>
            <Typography>Language: {Book.Language}</Typography>
            <Typography>Status: {Book.Status}</Typography>
            {(Book.Status!=="Available")?<div></div>:<Typography>CurrentOwner:{Book.CurrentOwner}</Typography>}
            </CardContent>
            </Card>
        })
        }
        </div>
      };
      return renderBooks()
}

export default ViewBooks;



   