const JWT = require("jsonwebtoken");

// yha ham middleware bna rhe hai token ko decrept kar ke user ko identify karenge
// middleware kabhi bhi banayiye to next() ko call karna nhi bhuliye becouse next karne ke bad ki agale method ya route pr ja payenge.agar aap next lagana bhul jate hai h to esi ke andar process hota rhega.

const jwtAuth = (req, res, next) => {
    const token = (req.cookies && req.cookies.token) || null; //ham yha cookie se token lene ki kosis kar rhe hai
    
    if(!token) {
        return res.status(400).json({
            success: false,
            message: "Not authorized"
        })
    }
   // console.log(req.cookies);
    
    try {
        const payload = JWT.verify(token, process.env.SECRET); // yha ham token ko verify karte hai jo hamne apne .env file me secret key banaya tha usse.
        // agar valide h to ham user request me sare ke sare information send kar denge.
        req.user = { id: payload.id, email: payload.email }; 
        //req.user yh information authRoute se hote hua pass hogi authController ke pass ex. getuser module me hamne use kiya h const userId = req.user.id; yh information es liye bhi pass ho pa rhi h kyuki hamne middleware me next() ka use kiya h
        //console.log(req.user);
        
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
    next(); 
}

module.exports = jwtAuth;