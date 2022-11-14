const { Thought, User, } = require('../models');
// const User = require('../models/users');

const thoughtsController = {
    getThoughts(req, res) {
        Thought.find()
            .then((socialNetworkDb) =>{
                console.log(socialNetworkDb)
                res.json(socialNetworkDb)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getThoughtsByID(req, res){
        Thought.findOne({ _id: req.params.thoughtsId})
        .then((socialNetworkDb) => {
            res.json(socialNetworkDb);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
        
    }, 

    createNewThoughts(req, res){
        Thought.create(req.body)
        .then((socialNetworkDb)=>{
            res.json({message:'Thought created'});
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    deleteNewThoughts(req, res) {
        Thought.findOneAndRemove({_id: req. params.thoughtsId})
            .then((socialNetworkDb) => {
                
                return User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                );

            })
            .then((socialNetworkDb) => {
                res.json({message: "Thought deleted."});
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    editThoughts(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtsId},{$set: req.body}, { runValidators: true, new: true})
        .then((socialNetworkDb) => {
            res.json(socialNetworkDb);
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
        .then((socialNetworkDb) => {
         
          res.json(socialNetworkDb);
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
        .then(socialNetworkDb => {
            if (!socialNetworkDb) {
                res.status(404).json({ message: 'Incorrect reaction!' });
                return;
            }
            res.json(socialNetworkDb);
        }).catch(err=> {
            console.log(err);
            res.status(500).json(err);
        });
    },
};    

module.exports = thoughtsController;