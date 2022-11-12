const { User } = require('../models')

const userControllers = {
   
    getAllUsers(req, res) {
      User.find()
        .select('-__v')
        .then((socialNetworkDb) => {
          res.json(socialNetworkDb);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
   
    createNewUser(req, res) {
      User.create(req.body)
        .then((socialNetworkDb) => {
          res.json(socialNetworkDb);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
   
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((socialNetworkDb) => {
          if (!socialNetworkDb) {
            return res.status(404).json({ message: 'No user matches this id!' });
          }
          res.json(socialNetworkDb);
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
        .then((socialNetworkDb) => {
          if (!socialNetworkDb) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
          res.json(socialNetworkDb);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
        .then((socialNetworkDb) => {
          if (!socialNetworkDb) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
        })
        .then(() => {
          res.json({ message: 'User thoughts deleted!' });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
  
    addFriend(req, res) {
      User.findOneAndUpdate({_id:req.params.userId}, {$push:{ friends: req.params.friendId } }, { new: true })
        .then((socialNetworkDb) => {
          console.log("friend added")
          res.json(socialNetworkDb);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    removeFriend(req, res) {
      User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } },{ new: true })
        .then((socialNetworkDb) => {
         
          res.json(socialNetworkDb);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  };
  
  module.exports = userControllers;