const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

//Route1:Get loggedin user details using: get "/api/note/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try{
        const note = await Note.find({ user: req.user.id });
        res.json(note);
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
      }
 
});

//Route2:Add a new note using: post "/api/note/addnote". login required
router.post(
  "/addnote",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],fetchuser,
  async (req, res) => {
      try{
        const {title,description,tag} = req.body;
        //If there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
          title, description, tag,user: req.user.id
      })
      const savedNotes = await note.save()
      res.json({"Success":"Note has been added",savedNotes});
      }
      catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
      }    
  }
);

//Route3:Update a note using: put "/api/note/updatenote/:id". login required
router.put("/updatenote/:id",fetchuser, async(req,res)=>{
  try{
    const {title, description, tag} = req.body
    //Create a new note object
    const newNote ={};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag}
    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){ return res.status(404).send("Not Found")}

    //Allow updation if user owns the note
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(note);
  }catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//Route4:Delete a note using: delete "/api/note/deletenote/:id". login required
router.delete("/deletenote/:id",fetchuser, async(req,res)=>{
  try{
    //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if(!note){ return res.status(404).send("Not Found")}

    //Allow deletion if user owns the note
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted", note});
  }catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router;
