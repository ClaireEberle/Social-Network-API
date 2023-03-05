const {Schema, model} = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required:true,
            len: [1,280]
        },
        username: {
            type: String,
            required:true,
        }
        reactions: {
            ['']
        }
    }
)