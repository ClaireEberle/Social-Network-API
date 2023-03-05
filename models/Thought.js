const {Schema, model} = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required:true,
            len: [1,280]
        },
        createdAt:{
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required:true,
        }
        // reactions: {
        //     ['']
        // }
    }
);

module.exports = thoughtSchema