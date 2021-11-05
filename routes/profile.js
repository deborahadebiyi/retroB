const router = require("express").Router();
const User = require("../models/User");

//UPDATE USER
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.user.isAdmin){
        if (req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })
           res.status(200).json("Successfully updated account");
        }catch{
            return res.status(500).json(err); 
        }
    } else {
        return res.status(403).json("You do not have permissions to update this account");
    }
})

//get a user
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, moodCheck, ...userInfo } = user._doc;
      res.status(200).json(userInfo);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //follow a user
  
  router.put("/:id/add-teammate", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.team.includes(req.body.userId)) {
          await user.updateOne({ $push: { team: req.body.userId } });
          await currentUser.updateOne({ $push: { team: req.params.id } });
          res.status(200).json("Team member has been added");
        } else {
          res.status(403).json("This user is already part of your team");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are already a member of your team");
    }
  });
  
  //remove team member
  
  router.put("/:id/remove-teammate", async (req, res) => {
      if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (user.team.includes(req.body.userId)) {
            await user.updateOne({ $pull: { team: req.body.userId } });
            await currentUser.updateOne({ $pull: { team: req.params.id } });
            res.status(200).json("Team member has been removed");
          } else {
            res.status(403).json("This user is not in your team");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You cannot remove yourself");
      }
    });



















// //UPDATE PROFILE
// router.get("/profile", async(req,res)=>{
//     try{
//         //create participant profile
//         const profile = await new Profile({
//             status: false,
//             isRetroLead: false,
//             displayname: "",
//             moodcheck: []
//         })
//         const avatar = await User.findOne({avatar: req.body.avatar})

//     }catch(profileErr){

//     }
// })

//CHANGE STATUS FROM PARTICIPANT TO LEAD

//SELECT AVATAR


//SELECT MOOD
module.exports = router;