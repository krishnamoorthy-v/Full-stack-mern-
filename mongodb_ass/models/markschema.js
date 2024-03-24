const mongoose = require("mongoose")

const schema = new mongoose.Schema(
    {
         id: {type:String, required:true},
         name: {type:String, required:true},
         exam: {type:String, required:true},
         math: {type:Number, required:true},
         physics: {type:Number, required:true},
         chemistry: {type:Number, required:true}

    
    }
)

const mark = mongoose.model("mark", schema)
module.exports = mark
