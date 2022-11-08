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
    };

    
}