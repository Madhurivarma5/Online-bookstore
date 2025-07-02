const express = require('express');
const router = express.Router({ mergeParams: true });
const { addReview, getReviews } = require('../controllers/reviewController');

router.get('/', getReviews);     
router.post('/', addReview);     

module.exports = router;
