const { thoughts, users } = require('../models');

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
        .then((socialNetworkDb) => {
            res.json(socialNetworkDb);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
        
    }, 

    createNewThoughts(req, res){
        thoughts.create(req.body)
        .then((userDataDB)=>{
            res.json({message:'Thought created'});
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },

    editThoughts(req, res) {
        thoughts.findOneAndUpdate({                 })
    }
    


}