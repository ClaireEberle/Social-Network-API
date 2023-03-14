const {Thought, User} = require('../models');

module.exports = {
    //get all users
    getUsers(req,res){
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
//get a course
    getSingleUser(req,res){
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json(user)
        )
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    //create a user
    createUser(req,res){
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    //update a user
    updateUser(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req,res){
        User.findOneAndDelete({ _id: req.params.userId})
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with that ID'})
        : User.deleteMany({ _id: req.params.userId}))
    },

    addFriend(req,res){
        User.findOneAndUpdate({ _id: req.params.userId}, {$addToSet: {friends: req.params.friendId}})
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json(user))
        .catch((err) => {
            console.log
            res.status(500).json(err)})
    },

    removeFriend(req,res){
        User.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: {friends: {friendId: req.params.friendId}}},
        )
          .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json(user))
        .catch((err) => res.status(500).json(err))
        
        
    }
}