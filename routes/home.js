const router = require("express").Router();

router.get("/home", (req,res)=>{
    res.send("Welcome to the home");
})

module.exports = router;