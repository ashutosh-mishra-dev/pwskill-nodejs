
require('dotenv').config(); // .env file ko config kiya gya h
const express = require('express');

const cors = require('cors'); // cors ka use cross origin request hota h means hamare browser ke andar ek functionality hoti h
//jiske andar kahi aur se url aa rha hai aur database kisi aur url per hai ya fronted kahi aur url pr hai to ek dusare se baat nhi kar sakte(browser aisa allow nhi karta security issue ke liye)
//to aisi baat ho paye esliye ham cors ka use karte hai.

const connectToDb = require('./db_config/db.js'); // hamne db.js ko import kiya h 

const app = express();

//express middleware :( middleware request se pahle excute ho jata h) , aap ki jo request h vo jane se pahle kuch kaam karvana h manlo request ke sath kuch data , 
// bhi send karna h ya aap authentication ke bad hi add to card pr jaye ye sare check poin middleware ke throw hi hota h
// express ke bane banaye middleware mil jate h app custom middleware bna sakte h.

app.use(express.json()); // ham yha express ko bta rhe h ki json me data send kare to usko lelena (expresska build in middleware method h)
app.use(express.urlencoded({extended: true})); // jab ham get request ke throw data send karte h to sabhi data jate h url throw. url apne aap me data ko encode karta hai ab data response me aaye to vo decode bhi to hona chahiye esi liye ye line likha gya h.
app.use(cors()); // yha hamne btaya ki jo cors diya usko use kar lena means jo request h use aane do. cors() me ham jo bhi url h use allow kra sakte hai aur nhi bhi.

//init connection to db (ham yha connection ke function ko call karte h aisa kah sakte h ki databse run ho jayega)
connectToDb();

//create url
const userRoutes = require('./routes/userRoutes.js');
//app.get('/', userRoutes);
app.use('/', userRoutes); //ab hum yha get ,post , delete, put sare method use kar sakte hai.

// export app
module.exports = app; 

//"require" ke liye "module.exports = app;" karte hai "import" ke liye "export default = app;" likate hai.

//module.export likhane se modul ka error bhi nhi aayega

