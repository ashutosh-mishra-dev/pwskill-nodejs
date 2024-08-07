
import app from "./app.js";
import mongoose from "mongoose";

const PORT = 3000;
const HOSTNAME = "localhost";

//database connection - mongodb

//mongoose.connect('mongodb://127.0.0.1:27017/test');  // yha locally database connect ho rha h

// upar diya gya connection me koi bhi problem nhi 100% work karega but yah professional approach nhi hai aisa hum nhi likh sakte direct becouse code fat jayega 
// jab bhi ham database ke sath batchit karenge to 2 chij yaad rakhani hain 1. database connection fail hote hai 2. database hamesa dusari continent me rkha hota hai means aap india me ho ho sakta hai database america me ho.
//1.database connection may failed 2.database is always onother continet

// accha manlo connection ke time error aa gyi to error handling ke liye ham try catch ka use kar sakte hai
//ab database dusari continent mai h usase response aane me time to lagega use handle karne ke liye yha ham async await ya promise ka use kar sakte h

//ek aur professional approach h database handle ke liye jo interview me bahot bar pucha jata hai
//()() immediatelly invoke function  iife eska use ham apne database ke liye karenge becouse ham chahte hai li index file ko run karne pr database bhi start ho jaye.
//iife es liye recomentable hai ki bahar ke variable palute nhi hote. aur alag se call nhi karna padta jab ye file run hogi apne aap call ho jayega

// async await with iife (most important interview  question)
(async ()=>{
    // database me koi error aata hai to use ham try catch se handle kar rhe hai
    try {
        //database connection - mongodb
        await mongoose.connect('dbstring');
        console.log("DB connection successfully");

        // yha ham application me koi error aa rha hai to use handle kar rhe hai
        app.on("error",(err)=>{
            console.log("ERROR: ",err);
            throw err;
        })
        
        //agar server connection me koi error nhi aa rhi to ham server ho yhi listen kra denge.agar ham bahar listen krate hai aur koi error aa jaye to yah accha approach nhi hai
        app.listen(PORT,() => {
            console.log(`Listening on ${HOSTNAME}:${PORT}`);
        });

    } catch (error) {
     console.error('ERROR: ', err); 
     throw err  
    }
})()


//ab niche ese likhane ki jarurat nhi h
// app.listen(PORT,() => {
//     console.log(`server running on ${HOSTNAME}:${PORT}`);
// });
