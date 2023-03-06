const { Schema, model } = require('mongoose');
// const isEmail = require('validator');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // validate: [isEmail, 'invalid email']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
        ],
        friends: [
            {
                type:Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
);

const User = model('user', userSchema)

module.exports = User;
