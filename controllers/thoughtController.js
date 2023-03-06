const {Thought, User} = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req,res){
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
//get a thought
    getSingleThought(req,res){
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with that ID'})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },
    //create a thought
    createThought(req,res){
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId},
                { $addToSet: { thoughts: thought._id}},
                { new: true }
            );
        })
        .then((user) =>
        !user
        ? res.status(404).json({
            message: 'thought created, but found no user with that id'
        })
        : res.json('Created the thought')

        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //update a user
    updateThought(req,res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $set: req.body },
        
        )
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought with that ID'})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req,res){
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought with that ID'})
        : Thought.deleteMany({ _id: req.params.thouhtId}))
    },


// /api/thoughts/:thoughtId/reactions
addReaction(req,res) {
Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: {reactions: req.body } }

)
.then((thought) =>
!thought
? res.status(404).json({ message: 'No thought with this id!' })
: res.json(thought)
)
.catch((err) => res.status(500).json(err));
},

deleteReaction(req,res){
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
    
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
};