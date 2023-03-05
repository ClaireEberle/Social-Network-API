const router = require('express').Router();

const {
    getUsers,
} = require('../../controllers/userController.js')

///api/users
router.route('/').get(getUsers)

// /api/users/userId
router
.route('/:userId')
.get()

module.exports = router
