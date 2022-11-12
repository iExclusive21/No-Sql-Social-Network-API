const router = require('express').Router();
const {getThoughts, getThoughtsByID, createNewThoughts,editThoughts, deleteNewThoughts, addReaction, removeReaction}= require("../../controllers/Thought"); 



router.route("/").get(getThoughts).post(createNewThoughts);

router.route("/:thoughtId").get(getThoughtsByID).put(editThoughts).delete(deleteNewThoughts);

router.route("/:thoughtId/reactions").post(addReaction); 
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports=router;