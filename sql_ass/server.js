const express = require("express")
const fs = require("fs")
const body_parser = require("body-parser")
const mysql = require("mysql2")
const PORT = 3000

const conn = mysql.createConnection({
    "host": "localhost",
    "user": "root", 
    "password": "***",
    "database": "marks"
})
conn.connect((err)=>{
    if(err) throw err;
    console.log("Connect to the mysql db")
})

app = express()

app.use(body_parser.urlencoded({extended: true}))
app.use(body_parser.json())

app.use(express.static("views"))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("form")
})

app.listen(PORT, ()=>{
    console.log(`Local host on the port: ${PORT}`)
})

app.post("/add", (req, res)=>{
        const data = req.body;
        const query = "INSERT into mark (id, name, exam, math, physics, chemistry) VALUES (?, ?, ?, ?, ?, ?)";
        values = [data.id, data.name, data.exam, data.math, data.physics, data.chemistry]
        conn.query(`select count(*) as count from mark where id=(?)`, [data.id], (err, result) =>{
            
            if(result[0].count == 0){
                conn.query(query, values, (err, result) => {
                    if(err){
                        console.error("Error storing data", err)
                        res.status(500).send("Server Error")
                    }
                    else {
                        console.log("data stored successfully")
                        res.redirect("read")
                    }
                })
            }
            else {
                console.log("Data already exits")
                res.status(500).send("Data already exits")
            }
        })
        
})

app.get("/read", (req, res) => {
    const query = "SELECT * from mark";

    conn.query(query, (err, data) => {
        if(err){
            console.error("Error while retriving data", err)
            res.status(500).send("Server Error")
        }
        else {
            console.log("data retrived successfully")
            res.render("read", {data} )
        }
    })
})

app.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    try {
        res.render("update", {id})
    } catch(err)
    {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }

})

app.post("/update/:id", (req, res) =>{
    const id = req.params.id
    
    const data = req.body;
    conn.query(`UPDATE mark SET name = ?, exam = ?, math = ?, physics = ?, chemistry = ?
    WHERE id = (?)`, [data.name, data.exam, data.math, data.physics, data.chemistry, id], (err)=> {
        if(err)
        {
            console.log(err)
            res.status(500).send("Internal error")
        }
        else{
            console.log("Data updated successufuly")
            res.redirect("/read")
        }
    })
})


app.post("/delete/:id", (req, res)=> {
    const id = req.params.id
    conn.query(`delete from mark where id = ?;`, [id], (err)=>{
        if(err)
        {
            console.log(err)
            res.status(500).send("Internal Error")
        }else{
            console.log("Data deleted from the table successfully")
            res.redirect("/read")
        }
    })
})
