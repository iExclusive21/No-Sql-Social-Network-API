const {Types, model, Schema} = require("mongoose")
const reactionSchema = require('./reaction')


// const reactionSchema = new Schema({
//     username:{
//         type:String,
//         required:true,
//     },
//     replyID:{
//         type:Schema.Types.ObjectId,
//         default:()=> newTypes.ObjectId()
//     },
//     replyText:{
//         type:String,
//         required:true,
//     },
//     createdAt:{
//         type:Date,
//         default:Date.now,
//     },
// },{
//     toJSON:{virtuals:true}
// });
const thoughtSchema = new Schema({
    username:{
        type:String,
        required: true,
        trim:true,
        unique:true,
    },
    thoughtText:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    reactions: [reactionSchema],
},{
    toJSON:{virtuals:true}
} );

thoughtSchema.virtual("reactionCount").get(function(){return this.reactions.length})

const Thought = model ("Thought", thoughtSchema)
module.exports = Thought