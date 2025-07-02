import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ user: '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRes = await fetch(`http://localhost:5000/api/books/${id}`);
        if (!bookRes.ok) throw new Error('Failed to fetch book');
        const bookData = await bookRes.json();
        setBook(bookData);

        const reviewRes = await fetch(`http://localhost:5000/api/books/${id}/reviews`);
        if (!reviewRes.ok) throw new Error('Failed to fetch reviews');
        const reviewData = await reviewRes.json();
        setReviews(reviewData);
      } catch (error) {
        console.error('Error fetching book or reviews:', error);
        setErrorMsg('Something went wrong. Please try again later.');
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch(`http://localhost:5000/api/books/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const result = await res.json();
        setReviews([result.review, ...reviews]);
        setForm({ user: '', rating: 5, comment: '' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const errData = await res.json();
        throw new Error(errData.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrorMsg('Could not submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (errorMsg) return <p className="error-message">{errorMsg}</p>;
  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="book-detail-container">
      {/* ✅ Book Image */}
      {book.imageUrl && (
        <img
          src={book.imageUrl}
          alt={book.title}
          className="book-detail-image"
          onError={(e) => (e.target.src = '/images/placeholder.jpg')} // fallback
        />
      )}

      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Price:</strong> ₹{book.price}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Rating:</strong> ⭐ {book.rating || 'Not rated yet'}</p>

      <div className="review-section">
        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul>
            {reviews.map((r) => (
              <li key={r._id}>
                <strong>{r.user}</strong> ({r.rating}⭐): {r.comment}
              </li>
            ))}
          </ul>
        )}

        <h4>Submit a Review</h4>
        <form onSubmit={handleReviewSubmit}>
          <input
            type="text"
            name="user"
            placeholder="Your name"
            value={form.user}
            onChange={handleChange}
            required
          /><br />
          <select name="rating" value={form.rating} onChange={handleChange}>
            {[5, 4, 3, 2, 1].map(num => (
              <option key={num} value={num}>{num} ⭐</option>
            ))}
          </select><br />
          <textarea
            name="comment"
            placeholder="Write your review"
            value={form.comment}
            onChange={handleChange}
            required
          ></textarea><br />
          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookDetail;
