 const express = require('express');
const router = express.Router();
const usersController = require('./controller/usersController');
const { verifyToken } = require("../../middleware/authorization")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login-test', function(req, res) {
  console.log(req.body)
  res.send({
    username: req.body.username
  });
});

router.post('/login', usersController.login)

router.post('/register', usersController.register)

router.post('/authtoken', verifyToken, usersController.authtoken)

router.delete('/delete-user', verifyToken, usersController.deleteUser)

module.exports = router;
