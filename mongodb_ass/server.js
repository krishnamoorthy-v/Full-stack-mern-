const express = require("express")
const bodyparser = require("body-parser")
const fs = require("fs")
const path = require("path")
const mark = require("./models/markschema")
const mongoose = require("mongoose")
const { METHODS } = require("http")
let app = express()

const PORT = 3000;
mongoose.connect("mongodb://localhost:27017/markDB",
{
    useNewUrlParser: true, useUnifiedTopology: true
}
).then(()=>console.log("Connected to MongoDB"))
.catch(err => console.log("Error Connected to MongoDB", err))

app.use(bodyparser.urlencoded({extended: false}))
app.use(express.static("views")) // to access the static file from the folder.
app.set('view engine', 'ejs');


app.get("/", (req, res) =>
{
    res.sendFile( path.join(__dirname, "views", "form.html"))
})

app.post("/add", async(req, res) =>
    {
        const {id, name, exam, math, physics, chemistry} = req.body;
        const data = new mark({id, name, exam, math, physics, chemistry} )
        try{
            await data.save()
            res.redirect("/read")
        } catch (err){
            console.log(err)
            res.status(500).send("Internal Server Error")
        }
        
    }
)
app.get("/read", async(req, res) =>{
    try
    {
        const data2 = await mark.find()
        res.render("db", {data2})
    }
    catch(err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
})


app.post("/delete/:id", async(req, res) => 
{
    const id = req.params.id
    try{
        await mark.deleteOne({"id": id})
        const data2 = await mark.find()
        res.redirect("/read")
    }   catch(err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}
)

app.post("/edit/:id", async(req, res) => {
    const id = req.params.id
    try {
        res.render("update", {id})
    } catch(err)
    {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
    
})

app.post("/update/:id", async(req, res) =>{
    const id = req.params.id
    console.log(id)
    const {name, exam, math, physics, chemistry} = req.body;
    try {
        await mark.findOneAndUpdate({"id":id }, {
            "name":name, "exam":exam, "math": math, "physics": physics, "chemistry": chemistry
        })
        res.redirect("../read")
    }catch(err)
    {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
})

app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
})