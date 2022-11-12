const { Thoughts, Users } = require('../models');
const User = require('../models/users');

const thoughtsController = {
    getThoughts(req, res) {
        thoughts.find()
            .then((socialNetworkDb) =>{
                res.json(socialNetworkDb)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getThoughtsByID(req, res){
        thoughts.findOne({ _id: req.params.thoughtsID})
        .then((socialNetwork) => {
            res.json(socialNetwork);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
        
    }, 

    createNewThoughts(req, res){
        thoughts.create(req.body)
        .then((socialNetwork)=>{
            res.json({message:'Thought created'});
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    deleteNewThoughts(req, res) {
        thoughts.findOneAndRemove({_id: req. params.thoughtsID})
            .then((socialNetwork) => {
                
                return User.findOneAndUpdate(
                    { thoughts: req.params.thoughtID },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                );

            })
            .then((socialNetwork) => {
                res.json({message: "Thought deleted."});
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    editThoughts(req, res) {
        thoughts.findOneAndUpdate({_id: req.params.thoughtsID},{$set: req.body}, { runValidators: true, new: true})
        .then((socialNetwork) => {
            res.json(socialNetwork);
        })
        .catch((err) =>{
            console.log(err);
            res.status(500).json(err);
        });
    },

    removeReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
        .then((socialNetwork) => {
         
          res.json(socialNetwork);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    addReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            { new: true, runValidators: true }
        )
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(socialNetwork => {
            if (!socialNetwork) {
                res.status(404).json({ message: 'Incorrect reaction!' });
                return;
            }
            res.json(socialNetwork);
        }).catch(err=> {
            console.log(err);
            res.status(500).json(err);
        });
    },
};    

module.exports = thoughtsController;