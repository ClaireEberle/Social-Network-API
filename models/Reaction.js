const { Schema, Types } = require('mongoose');


const reactionSchema = new Schema(
    {
        readctionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody:{
            type:String,
            required:true,
            len:[280]
        },
        username:{
            type:String,
            required:true,

        },
        createdAt:{
            type:Date,
            default: Date.now,
        }

    }
);

module.exports = reactionSchema;