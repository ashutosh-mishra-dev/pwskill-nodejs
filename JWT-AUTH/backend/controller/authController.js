const userModel = require("../model/userSchema");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

// ---------------------------------------- signup method ---------------------------------------------- 
const signup = async (req, res, next) => {
    const {
        name,
        email,
        password,
        confirmPassword
    } = req.body;
    console.log(name, email, password, confirmPassword);

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Every Field is Required"
        });
    }

    //validate email using email-validator module
    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: "Pls Provide valid emailId"
        });
    }

    //validate password and confirm password

    if (password != confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "password and confirmPassword does not match"
        });
    }

    try {
        //agar database me schema me jo name define kiya gya h vo user side field name same h to ham simple niche digya h vaise hi likhna h.
        const userInfo = userModel(req.body);

        //agar database me schema me jo name define kiya gya h vo user side field name same nhi h to ham simple niche digya h vaise likhna h.
        // const userInfo = userModel({
        //     name: username,
        //     password: userPassword
        // });

        const result = await userInfo.save();

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (e) {
        //agar koi duplicate entry hue h uske liye hame mongo db ek facility deta vo 11000 ka error code
        if (e.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "account already exists with provided email id"
            });
        }
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
}
// -----------------------------------------------------------------------------------------------

// ---------------------------------------- signin method-----------------------------------------
const signin = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'email or password not find'
        })
    }

    try {
        const user = await userModel
            .findOne({
                email
            })
            .select('+password')

        // if (!user || user.password !== password) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'invalid crendentials'
        //     })
        // }
        
        // ham ab yha bcrypted password ko use kar rhe hai to es liye 
        // hame ek chij hamesa yaad rakhana hota hai jab bcrypt.compare use karete hai to use await karna padta hai
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                success: false,
                message: 'invalid crendentials'
            })
        }

        // agar aap ka email + password valid ho jate hai to ham ek token generate karate hai use cookie me store kra dete hai.
        // esse ye hoga ki aap login ek baar karte hai bar - bar requist marte h means es user ke behalf pr vahot sari activity kar sakte hai.
        // sath hi sath authenticate kar sakte h means kis user ko kya show karna h ya kis user ko kya nhi show karna h.

        const token = user.jwtToken(); // ye token userSChema.js ke jwtToken() method se aa rha h.
        user.password = undefined; // yha hamne password ko undefined set kar diya becouse password leak nhi hona chahiye.

        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000, // yha ham cookie kitne samay ke liye hoga vo set kar rhe hai. yha 24 h ke liye set
            httpOnly: true, // se security purpose ke liye use hota h ye basically client side se javascript aap esko acess nhi kar sakte ho.  

        };
        // ab ham yha cookie set karenge token ko rakhne ke liye
        res.cookie("token", token, cookieOption); //eske parameter me 3 options hote hai 1.cookie_name, 2.actual token jo hamne upar banaya hai,3.cookie ka options  
        res.status(200).json({
            success: true,
            data: user
        });
        
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
}

// ------------------------------------------------------------------------------------------------

// ---------------------------------- get user ----------------------------------------------------

const getUser = async (req, res, next) => {
    // 1st hame user ki id ki jarurat padegi.
    // user ki information dene se pahle ye ensure karna h ki user logedIn h ya nhi to eske liye ham middleware banana hoga
    // eske liye ham middleware ka folder banayenge uske andar file bna kr usme kuch kaam karenge.
    
    const userId = req.user.id;
    //console.log(req.user);
    
    try {
        const user = await userModel.findById(userId);
        
        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
}
// ------------------------------------------------------------------------------------------------

// --------------------------------- logout -------------------------------------------------------
const logout = (req, res) => {
    try {
        const cookieOption = {
            expires: new Date(),
            httpOnly: true
        };
        res.cookie("token", null, cookieOption);
        res.status(200).json({
            success: true,
            message: "Logged Out"
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message
        })  
    }
}

// const logout = (req, res) => {
//     try {
//         // Cookie ko expire karein
//         const cookieOption = {
//             expires: new Date(Date.now()), // Immediately expire the cookie
//             httpOnly: true
//         };
//         res.cookie("token", null, cookieOption);
//         // Response
//         res.status(200).json({
//             success: true,
//             message: "Logged Out"
//         });
        
//     } catch (e) {
//         res.status(400).json({
//             success: false,
//             message: e.message,
//         });
//     }
// };
// ------------------------------------------------------------------------------------------------

module.exports = {
    signup,
    signin,
    getUser,
    logout
}