const router = require("express").Router();
const User = require("../models/User");
const bcrypt =  require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const maxValidity = 3 * 60 * 60 ; 
const createToken = (id)=>{
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxValidity
    })
}

//REGISTER
router.post("/register", async(req,res)=>{
    try{
        //hash password
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        //creates new participant
        const user = await new User({
            username: req.body.username,
            password: hashedPassword,
        })

        //saves participant to db and returns response
        await user.save((err)=>{
            if(err) {
                res.status(400).send(`Username already in use: ${err}`)
                console.log('Unable to save user');
            } else {
                console.log("New user has been saved");
                res.redirect("/home")
            } 
        });


    } catch(registerErr){
        res.status(500).send("Failed registration")
        console.log(`This is the register error: ${registerErr}`);
    }
});

//LOGIN
router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username})
            if(!user) {
                return res.status(404).send("User not found");
            }
 
        const isMatch = await bcrypt.compare(req.body.password, user.password)
            if (isMatch == false) {
                res.send("Invalid credentials");
            } else {
                const token = createToken(user._id)
                res
                .cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: maxValidity * 1000
                })
                .redirect("/notes/retrospective")
                console.log("Login success");
            }

    } catch(loginErr) {
        console.log(`This is the login error: ${loginErr}`);
    }

})

//LOGOUT
router.get("/logout", (req,res)=>{
    res.cookie('jwt', "", {maxAge: 1});
    res.redirect("/home");
    console.log()
})



module.exports = router;