// const http = require('http');

// const PORT = 3001;
// const HOSTNAME = 'localhost';

// const server = http.createServer((req,res) => {
//     if(req.url == '/'){
//         res.end('this is home page');
//     }else if(req.url == '/contact'){
//         res.statusCode == 200;
//         res.setHeader('Content-Type','application/json');
//         res.end(JSON.stringify({
//             name:'Ashutosh',
//             address:"surat",
//             qualification:"bca"
//         }));
//     }else{
//         res.statusCode = 404;
//         res.setHeader('Content-Type','text/html');
//         res.end('<h2>Page Not Found</h2>');
//     }
// });

// server.listen(PORT,()=>{
//     console.log(`The server running on ${HOSTNAME}:${PORT}`);
// });

//----------------------------------------------------------------------

//const express = require('express'); // module ka use karne ke bad require nhi chalta h
import express from "express"; // hya hamne es esliye use kiya h kyuki package.json me "type" : "module" liya h ! 
const app = express();

const port = 3000;
const hostname = 'localhost';

app.get('/',(req,res) =>{
    res.send('hello this is index page or Home page !');
});

app.get('/about',(req,res) => {
    res.send('<h1> This is about page ! </h1>');
});

app.get('/contact',(req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');

    res.send(JSON.stringify({
        name: 'Ashutosh mishra',
        city: 'surat',
        state: 'gujarat',
        pincode: 394221,
    }));
});

app.listen(port,()=>{
    console.log(`server running on ${hostname}:${port}`);
});




