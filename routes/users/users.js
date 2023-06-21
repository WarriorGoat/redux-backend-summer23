const express = require('express');
const router = express.Router();
const usersController = require('./controller/usersController');
const { verifyToken } = require("../../middleware/authorization")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signin-test', function(req, res) {
  console.log(req.body)
  res.send({
    email: req.body.email
  });
});

router.post('/signin', usersController.signin)

router.post('/register', usersController.register)

router.post('/authtoken', verifyToken, usersController.authtoken)

router.delete('/delete-user', verifyToken, usersController.deleteUser)

module.exports = router;
