import express from "express";
const app = express();

app.get('/',(req,res) => {
    res.send('<h1>hellow world !</h1>');
});

app.get('/instagram',(req,res)=>{
    res.send('you have visited instagram.');
});


export default app;