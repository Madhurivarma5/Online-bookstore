const Review = require('../models/Review');
const Book = require('../models/Book');

exports.addReview = async (req, res) => {
  const { user, rating, comment } = req.body;
  const bookId = req.params.bookId;

  try {
    const review = await Review.create({ user, rating, comment, book: bookId });
    await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });
    res.status(201).json({ message: 'Review added', review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error adding review' });
  }
};

exports.getReviews = async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const reviews = await Review.find({ book: bookId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching reviews' });
  }
};
