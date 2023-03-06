const {Thought, User} = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req,res){
        Thought.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
//get a thought
    getSingleThought(req,res){
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },
    //create a user
    createThought(req,res){
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    //update a user
    updateThought(req,res){
        Thought.findOneAndUpdate(
            {_id: req.params.userId},
            { $set: req.body },
        
        )
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req,res){
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No user with that ID'})
        : Thought.deleteMany({ _id: req.params.thouhtId}))
    }
}