const {Types, model, Schema} = require("mongoose")

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
    reactions: [replySchema],
},{
    toJSON:{virtuals:true}
} );

const replySchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    replyID:{
        type:Schema.Types.ObjectId,
        default:()=> newTypes.ObjectId()
    },
    replyText:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
},{
    toJSON:{virtuals:true}
});

thoughtSchema.virtual("replyAccount").get(function(){return this.reply.length})

const Thought = model ("Thought", thoughtText)
module.exports = Thought