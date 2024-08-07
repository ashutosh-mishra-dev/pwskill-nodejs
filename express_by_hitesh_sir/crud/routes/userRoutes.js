const express = require("express");

const {home, createUser, getUsers, deleteUser, editUser} = require("../controllers/userController.js");

//router ek special feature h to route banana padta hai joki express se banega  aur esme router ka R capital hota h
const router = express.Router();

router.get("/", home); 

router.post('/createuser', createUser);

router.get('/getusers', getUsers);

router.put('/editusers/:id', editUser);

router.delete('/deleteuser/:id', deleteUser);

module.exports = router;
