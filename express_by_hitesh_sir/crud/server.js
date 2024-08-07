
const app = require('./app.js'); 
const port = process.env.PORT || 5000; // yha .env me jo port liya h vah use karega


app.listen(port,() => {
    console.log(`example app listening on port ${port}`);
});