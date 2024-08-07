
//import model or database schema

const User = require('../models/userModel.js');

// this controller use for (/) home 
exports.home = (req,res) => {
    res.send('this is home page ....');
}

// this controller use for create user for comminicate database

exports.createUser =  async(req, res) => {
    //extract info : means database me kya - kya jana h vo info hame pta hona chahiye
    try{
        // req ye bahut sare information le ke aata hamare pass
       const {name, email} = req.body // yha ek object milta hai es object ke andar sari information aati h. aur hum yha const {name, email} me destructuring kar rhe.
        
       if(!name || !email){
        throw new Error("Name and email are Required");
       }

    //    const userExists = User.findOne({email}) // ye method database me check karega email pahle se h ya nhi
       
    //    if(userExists){
    //     throw new Error("user already Exists");
    //    }

       const user = await User.create({
        name,
        email
       })
       
       // yha ham status send kar rhe response me
       res.status(201).json({
        success: true,
        message: "User created Successfully",
        user
       }) 
    
    }catch(error){
        console.log("ERROR : ",error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// get all user data

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        console.log("ERROR : ",error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// edit user 
exports.editUser = async (req, res) =>{
    try {
        await User.findByIdAndUpdate(req.param.id, req.body)
        console.log(req.param.id);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            param_id: req.param.id,
            req_body: req.body
        })
    } catch (error) {
        console.log("ERROR : ",error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// delete single user data

exports.deleteUser = async (req, res) => {
    try {
        //agar queryString se data ya id mil rha hai to req.body ko lete aur data delete karte
        const userId = req.param.id // parameter se data aa rha hai to param se data delete hoga
        await User.findByIdAndDelete(userId)
    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        });
    }
}