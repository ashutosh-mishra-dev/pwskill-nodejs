const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'user name is required'],
        minLength: [5, 'name must be at list 5 characters'],
        maxLength: [20, 'name not more than 20 character'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'user email is required'],
        unique: [true, 'email already register'],
        lowerCase: true,

    },
    password: {
        type: String,
        minLength: [3, 'password must be at list 3 characters'],
        maxLength:[8, 'password not more than 8 character'],
        select: false
    },
    forgetPasswordToken: {
        type: String,
    },
    forgotPasswordExpiryDate: {
        type: Date
    }
},
{
    timestamps: true
});

// jab bhi ham userSchema me user se related koi bhi information save karenge useme pre ek middleware hai vo execute hone ke bad vo check karega agar aap save kar rhe to aap ka password modify nhi hua hai to koi baat nhi hai
// agar modify hua hai to password ko encrypt kardo bycrpt.has() ke through
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
        // yha hame isModified(), pre() middleware me hi milta hai.
        // agar hamne passwor ko modify nhi kiya hai to vahi se retrun ho jaye aur next() se agla method chal jayega agar hame next() nhi use karte hai to yh yhi pr rukh jayega agla method execute nhi karega.
    }

    this.password = await bcrypt.hash(this.password, 10);
    //yha ham password ko bycrpt kar rhe hai 10 character me
    return next();
})
// schema me aap ke pass ek bahut achchi mongoose deta h vo ye kaheta hai agar apko custom method define karna h to aap kar sakte ho 
userSchema.methods = {
    // to ham yha jwtTken name se custom method bna rhe hai
    jwtToken() {  
        // JWT.singn() yah ek JWT dependency ka signature method h esme kuch part dete hai jisme 1. part me data aata h 2. ham env set karte h jo ki key ka kaam karta h. 3.exprired kab koga vo batate h 
        return JWT.sign(
            { id: this._id, email: this.email },
            process.env.SECRET,
            { expiresIn: '24h' }
        )
    }
    //etna karne ke baad es token ko apne controller ke liye generate kar dena hai.
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
