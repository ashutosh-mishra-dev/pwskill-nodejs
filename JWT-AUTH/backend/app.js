
const express = require("express");
const app = express();

const authRouter = require("./router/authRoute.js");
const databaseconnect = require("./config/databaseConfig.js");
const cookieParser = require("cookie-parser");

databaseconnect();

// jab bhi ham express.json likhate h to server ko pta chalega ki hamare pass json data aaya h json me data response send karna h. agar niche di gayi line nhi likhenge to error aayega json request send karne pr.
app.use(express.json());

//client side se sara ka sara information (cookie ke related) searlize data aata h means jo bhi network pr communication hota h vo searlize data aata h
// ab ese json me convert karne ke liye cookie parser ka use karte hai jisse ham eske andar se ham token nikal sake token read kar sake
app.use(cookieParser());

app.use('/api/auth/', authRouter);
// yha ham chahte hai ki auth ke related jitne bhi routes hai vo sare ke sare prefix ho kisi path se 

module.exports = app;