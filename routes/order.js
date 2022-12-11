const { createOrder, updateOrder, deleteOrder, getUserOrder, getAllOrders, getMonthlyIncome } = require('../controllers/orderController');
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('./verifyToken');
const router = require('express').Router();


//Create Order
router.post('/', createOrder);

//Update Order
router.put('/:id', verifyTokenAndAdmin, updateOrder);

//Delete Order
router.delete('/:id', deleteOrder);

//Get User Order
router.get('/find/:userId', getUserOrder);

//Get All Orders
router.get('/', getAllOrders);

// Get Monthly Income
router.get('/income', getMonthlyIncome);



module.exports = router;