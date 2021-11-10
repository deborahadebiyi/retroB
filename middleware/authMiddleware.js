const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect("/home");
            }else{
                console.log(`DECODED TOKEN ${decodedToken}`);
                next();
            }
        })
    }else{
        res.redirect("/home");
    }
};

module.exports = { requireAuth };