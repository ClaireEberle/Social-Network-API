const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction.js")

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    len: [1, 280],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
   Reaction
  ],
});
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
