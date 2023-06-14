const mongoose = require ("mongoose")
const {v4: uuidv4} = require("uuid")
 

const userSchema = new mongoose.Schema({
    id: {type: String, 
        default: ()=>uuidv4()},
    username: String,
    password: String,
    permissions: String,
    createdAt: {type: Date, 
        default: Date.now},
      updatedAt: {type: Date, 
        default: Date.now},
})

module.exports= mongoose.model("User", userSchema)
