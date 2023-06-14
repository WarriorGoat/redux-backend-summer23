const User = require('../model/User')
const {v4: uuidv4 } = require('uuid')
const bcrypt = require ("bcrypt")
const saltRounds = 10;

const createUser = async(params)=>{
    let newUser = new User({
        username: params.username,
        password: params.password,
        permissions: params.permissions
    })
    return newUser
}

const hashPassword = (password)=>{
    return bcrypt.hash(password, saltRounds)
}

const comparePasswords = (plaintextPassword, dbPassword) => bcrypt.compare(plaintextPassword, dbPassword)


module.exports = { 
    createUser, 
    hashPassword, 
    comparePasswords }