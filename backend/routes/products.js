const express = require('express');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);

router.route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

router.route('/:id/reviews')
    .post(protect, createProductReview);

module.exports = router; 