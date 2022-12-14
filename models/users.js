const {Schema, model, Types} = require('mongoose')

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    email:{
        type:String, 
        required:true, 
        trim:true, 
        unique:true, 
    }, 
    friends:[
        {
            type:Schema.Types.ObjectId, 
            ref:"User", 
        }
    ],
    thoughts:[
        {
            type:Schema.Types.ObjectId, 
            ref:"Thought", 
        }
    ],

},{
    toJSON:{virtuals:true},
    id:false,
});

userSchema.virtual("friendAccount").get(function(){return this.friends.length});

const User = model ("User", userSchema)
module.exports = User