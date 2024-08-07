// yha mongoose ko import karenge becouse hamne mongoose ko install kiya h. eska use karke schema prepare karenge mongoDB ke liye
// database se jo response aayega use async await ke jariye leke aayenge ham pomise se bhi database se response le sakte hai.ham aisa esliye karte h kyuki response aane me time lagta h 

const mongoose = require("mongoose");

const connectToDb = async () => {
    mongoose.connect(process.env.MONGO_URI)
.then((conn)=>{
        console.log("connected to DB : ",conn.connection.host);
    })
    .catch((err)=>{
        console.error("ERROR IS : " , err.message);
        process.exit(1); // agar database se connect hi nhi h mujhe kaam hi nhi karna h
    })
}

module.exports = connectToDb;