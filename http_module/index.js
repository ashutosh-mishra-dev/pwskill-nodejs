const http = require('http');

//console.log(http);

//---------------------------------------  created simple server  --------------------------------------

const server = http.createServer((req,res)=>{
    if(req.url == '/'){
        res.write('<h1>Hello, nodejs !</h1>');
    }else if('/about'){
        res.write('<h1> u visited about page !</h1>');
    }
    res.end();
});
server.listen(3000);
console.log("the http server running on 3000 port");