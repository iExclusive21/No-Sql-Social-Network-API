const router = require('express').Router();
const {getAllUsers, createNewUser, editUser,getSingleUser,deleteUser, addFriend, removeFriend} = require("../../controllers/User"); 

router.route("/").get(getAllUsers).post(createNewUser);


router.route("/:userId").get(getSingleUser).put(editUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend); 

module.exports=router;