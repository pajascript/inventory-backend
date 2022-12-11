const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken'); 
const { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts } = require('../controllers/productController');

//Add Product
router.post('/', createProduct);

//Update Product
router.put('/:id', updateProduct);

//Delete Product
router.delete('/:id', deleteProduct);

//Get Product
router.get('/find/:id', getProduct );

//Get All Products
router.get('/', getAllProducts)


module.exports = router;