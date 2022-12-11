const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const { createCart, updateCart, deleteCart, getUserCart, getAll } = require('../controllers/cartController');
const router = require('express').Router();

//Create Cart
router.post('/', verifyToken, createCart);

//Update Cart
router.put('/:id', verifyTokenAndAuthorization, updateCart);

//Delete Cart
router.delete('/:id', verifyTokenAndAuthorization, deleteCart);

//Get User Cart
router.get('/find/:userId', verifyTokenAndAuthorization, getUserCart);

//Get All
router.get('/', verifyTokenAndAdmin, getAll)


module.exports = router;