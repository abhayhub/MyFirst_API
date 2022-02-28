const express = require('express');
const app = express();
const mysql = require('mysql2')

// connect mysql with server
const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"your password",
    database:"student_db"
})
app.use(express.json())



app.get('/student_detail',(req,res) =>{
    db.query("SELECT * FROM student_db.new_table;",(err,result) => {
        if(err){
            res.status(400).json(err)
        }else{
            res.json(result)
        }
        

    });
});

app.post("/student_detail",(req,res) => {
    const{id,Name,Rollno,Class} = req.body;
    db.query(
        "INSERT INTO `student_db`.`new_table` (`id`, `Name`, `Rollno`, `Class`) VALUES (?,?,?,?);",
        [id,Name,Rollno,Class],
        (err,result) =>{
            if(err){
                res.status(400).json(err);
            }else{
                res.status(200).json(result);
            }
        }
    )
})



app.listen('3000',() => {
    console.log("Server running on port 3000")
});
