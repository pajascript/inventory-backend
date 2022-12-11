const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const { updateUser, deleteUser, getUser, getAllUsers, getUserStats } = require('../controllers/userController');

//Update User
router.put('/:id', updateUser );

//Delete User
router.delete("/:id", deleteUser);

//Get User
router.get("/find/:id", getUser);

//Get All Users
router.get('/', getAllUsers);

//Get User Stats
router.get('/stats', getUserStats);


module.exports = router;