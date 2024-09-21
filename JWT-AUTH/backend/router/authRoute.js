
const { signup, signin, getUser, logout } = require("../controller/authController");
const jwtAuth = require("../middleware/jwtAuth");

const express = require("express");
const authRouter = express.Router();

authRouter.get('/home', (req, res) => {
    res.send('hello this is index page or Home page !');
});

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.get('/user', jwtAuth, getUser); // yha hamne jwt ka middleware use kiya h. becouse ham chahte hai ki es route pr pahuchane se pahle ham middleware pr aaye aur condition check karne ke baad hi route me enter kare.
authRouter.get('/logout', jwtAuth, logout);


module.exports = authRouter;