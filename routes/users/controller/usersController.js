const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { createUser, hashPassword, comparePasswords } = require("./usersHelper");

module.exports = {
  signin: async (req, res) => {
    try {
      //check if user exists in the db
      let foundUser = await User.findOne({ email: req.body.email });
      if (!foundUser) {
        throw {
          status: 404,
          message: "User Not Found",
        };
      }

      //check if password is correct
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
        email: foundUser.email,
      };

      let expiration = new Number();
      if (req.body.isRemember) {
        expiration = 60 * 60 * 24 * 7;
      } else {
        expiration = 60 * 15;
      }

      let token = jwt.sign(payload, process.env.SUPER_SECRET_KEY, {
        expiresIn: expiration,
      });

      res.status(200).json({
        user: {
          email: foundUser.email,
          firstname: foundUser.firstname,
          lastname: foundUser.lastname,
        },
        message: "Successful Login!!",
        token: token,
      });
    } catch (error) {
      res.status(error.status).json(error.message);
    }
  },

  register: async (req, res) => {
    try {
      //if user email exists, throw an error
      let foundUser = await User.findOne({ email: req.body.email });
      if (foundUser) {
        throw {
          status: 409,
          message: "User already exists, please enter a unique email.",
        };
      } else {
        let newUser = await createUser(req.body);
        let hashedPassword = await hashPassword(newUser.password);
        newUser.password = hashedPassword;
        let savedUser = await newUser.save();
        res.status(200).json({
          email: savedUser.email,
          firstname: savedUser.firstname,
          lastname: savedUser.lastname,
          message: "Successfully Registered!  Please Log In.",
        });
      }
    } catch (error) {
      res.status(error.status).json(error.message);
    }
  },

  authtoken: async (req, res) => {
    let foundUser = await User.findById(req.decoded.id);

    res.status(200).json({
      email: foundUser.email,
      firstname: foundUser.firstname,
      lastname: foundUser.lastname,
      message: "Successful Token Login!!",
    });
  },

  deleteUser: async (req, res) => {
    try {
      let foundUser = await User.findByIdAndDelete(req.decoded.id);
      res.send(true);
    } catch (error) {
      res.status(error.status).json(error.message);
    }
  },
};
