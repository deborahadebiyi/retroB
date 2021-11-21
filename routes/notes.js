const router = require("express").Router();
const Note = require("../models/Note")
const jwt = require("jsonwebtoken");
require("dotenv").config();

//create note
router.post("/create", async(req,res)=>{
    try{
        const note = new Note(req.body)
        const savedNote = await note.save();
        res.status(201).json(savedNote)
    }catch(err){
        res.status(500).json(err)
        res.redirect("/retrospective")
    }
})

//update note
router.put("/:id", async(req,res)=>{
    try{
        const note = await Note.findById(req.params.id);
        if (note.userId === req.body.userId){
            await note.updateOne({$set: req.body})
            res.status(200).json("Note has been updated")
        }else{
            res.status(403).json("You do not have permission to edit this post");
        }
    }catch(err){
        res.status(500).json(err);
    }
})

//delete note
router.delete("/:id", async(req,res)=>{
    try{
        const note = await Note.findById(req.params.id);
        if (note.userId === req.body.userId){
            await note.deleteOne();
            res.status(200).json("Note has been deleted")
        }else{
            res.status(403).json("You do not have permission to delete this post");
        }
    }catch(err){
        res.status(500).json(err);
    }
})


//like note
router.put("/:id/like", async(req,res)=>{
    try{
        const note = await Note.findById(req.params.id);
        if (!note.likes.includes(req.body.userId)){
            await note.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("Liked note");
        } else {
            await note.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json("Disliked note");
        }      
    }catch(err){
        res.status(500).json(err)
    }
    
})
//get all notes
router.get("/retrospective", async(req, res)=>{
    try{
       const allNotes = await Note.find();
       res.json({allNotes: message});

    }catch(err){
        res.status(500).json(err);
    }
})
//sort notes by number of likes



















// router.post("/add",async (req,res)=>{
//     try {
//         const note = await new Note({
//             message: req.body.message,
//             userId: req.body.userId,
//             likes: req.body.likes
//         })

//         await note.save((err)=>{
//             if(err) {
//                 res.status(400).send("Unable to create note")
//                 console.log('Unable to add note');
//             } else {
//                 res.send(201)
//                 console.log("New note added");
//             } 
//         })
//     } catch(err) {
//         res.status(500).send("Please try adding note again")
//     }
// })

module.exports = router;