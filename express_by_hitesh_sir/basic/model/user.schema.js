
// schema kis chees ke liye ban rha hai, response ke liye ban rha hai ya request ke liye ban rha hai ya database ke liye ban rha hai.

// to ham yha database ke liye bna rhe hai to uske liye ham mongoose ka use kar rhe hai

import mongoose from "mongoose";

const userSchema = new mongoose.schema({ 
    name: {
        type: String,
        required: [true, 'name is required'],
        maxLength: [50, 'Name shoud be less than 50 character']
    }, 
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    password: String,
    age: Number
 },{timestamps: true}
);

//export mongoose schema -> yha ham javascript ke nhi mongoose export karna h kyuki aage jake ham ese database me use kar paye
export default mongoose.model("user",userSchema);
// model parameter me 2 cheej leta hai 1.es model ka database me kya name hoga (means table name). 2 schema kaise hoga (means schema name jo hamne upar banaya h)

//** ham yha jo database ke document(table) ka name dete hai vah yha singular dete hai jo database me automatic plural ho jata hai ex. user -> users, product -> products */
