const mongoose = require ("mongoose")
const {v4: uuidv4} = require("uuid")
 

const userSchema = new mongoose.Schema({
    id: {type: String, 
        default: ()=>uuidv4()},
    firstname: {type: String,
      required: true},
    lastname: {type: String,
      required: true},
    email: {type: String,
      unique: true,
      required: true
    },
    password: {type: String,
      required: true},
    permissions: String,
    createdAt: {type: Date, 
        default: Date.now},
      updatedAt: {type: Date, 
        default: Date.now},
})

module.exports= mongoose.model("User", userSchema)
