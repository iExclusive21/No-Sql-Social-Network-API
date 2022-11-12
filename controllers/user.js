const { user } = require('../models')

const userController = {
    // get all users
    getAllUsers(req, res) {
      User.find()
        .select('-__v')
        .then((userDataDB) => {
          res.json(userDataDB);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    // get single user by id
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((userDataDB) => {
          if (!userDataDB) {
            return res.status(404).json({ message: 'No user mentioned wwith this id!' });
          }
          res.json(userDataDB);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    // create a new user
    createNewUser(req, res) {
      User.create(req.body)
        .then((userDataDB) => {
          res.json(userDataDB);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    editUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        {$set: req.body,},
        {
          runValidators: true,
          new: true,
        }
      )
        .then((userDataDB) => {
          if (!userDataDB) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
          res.json(userDataDB);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
        .then((userDataDB) => {
          if (!userDataDB) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
        })
        .then(() => {
          res.json({ message: 'User and associated thoughts deleted!' });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
  
    addFriend(req, res) {
      User.findOneAndUpdate({_id:req.params.userId}, {$push:{ friends: req.params.friendId } }, { new: true })
        .then((userDataDB) => {
          console.log("friend added")
          res.json(userDataDB);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    removeFriend(req, res) {
      User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } },{ new: true })
        .then((userDataDB) => {
         
          res.json(userDataDB);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  };
  
  module.exports = userController;