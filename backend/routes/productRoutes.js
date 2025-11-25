const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const auth = require('../middleware/auth');   // if you have auth middleware

// ⭐ Add product review
router.post('/:id/review', auth, async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).json({ message: 'Product not found' });

  // prevent duplicate review
  const alreadyReviewed = product.reviews.find(
    r => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed)
    return res.status(400).json({ message: 'Already reviewed' });

  const newReview = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };

  product.reviews.push(newReview);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, r) => acc + r.rating, 0) /
    product.reviews.length;

  await product.save();
  res.json({ message: 'Review added' });
});

module.exports = router;
