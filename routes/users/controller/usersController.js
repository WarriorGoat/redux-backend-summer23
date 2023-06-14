const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { createUser, hashPassword, comparePasswords } = require("./usersHelper");

module.exports = {
  login: async (req, res) => {
    try {
      // console.log(req.body);
      let foundUser = await User.findOne({username: req.body.username})
            if (!foundUser) {
        throw {
          status: 404,
          message: "User Not Found",
        };
      }

      let checkedPassword = await comparePasswords(
        req.body.password,
        foundUser.password
      );
      if (!checkedPassword) {
        throw {
          status: 401,
          message: "Invalid Password",
        };  
      }
      let payload = {
        id: foundUser._id,
        username: foundUser.username
    }

    let token = await jwt.sign(payload, process.env.SUPER_SECRET_KEY, {expiresIn: 10*60})
    
      res.status(200).json({
        username: req.body.username,
        password: req.body.password,
        message: "Successful Login!!",
        token: token
      });
    } catch (error) {
      res.status(error.status).json(error.message);
    }
  },

  register: async (req, res) => {
    try {
      let foundUser = await User.findOne({ username: req.body.username });
      if (foundUser) {
        throw {
          status: 409,
          message: "User already exists, please enter a unique user name.",
        };
      }
      let newUser = await createUser(req.body);
      let hashedPassword = await hashPassword(newUser.password);
      newUser.password = hashedPassword;
      let savedUser = await newUser.save();
      res.status(200).json({
        userObj: savedUser,
        message: "Successfully Registered!  Please Log In.",
      });
    } catch (error) {
      res.status(error.status).json(error.message);
    }
  },
  authtoken: async (req, res) => {
    let foundUser = await User.findById(req.decoded.id);

    res.status(200).json({
      username: foundUser.username,
      message: "Successful Token Login!!",
      // token: token,
    });
    res.send('Authtoken')
  },




  deleteUser: async (req, res) => {
    try {
      // console.log(req.body);
      let foundUser = await User.findByIdAndDelete(req.decoded.
        id)
            if (!foundUser) {
        throw {
          status: 404,
          message: "User Not Found",
        };
      }
      let payload = {
        id: foundUser.id,
        username: foundUser.username
    }
    } catch (error) {
      res.status(error.status).json(error.message);
    }
  },
};
