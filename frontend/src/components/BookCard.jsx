import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CartContext } from '../utils/CartContext';
import './BookCard.css';

const BookCard = ({ book }) => {
  const { addToCart } = useContext(CartContext);
  return (
    <div className="book-card">
      {}
      {book.imageUrl && <img src={book.imageUrl} alt={book.title} className="book-image" />}

      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>₹{book.price}</p>

      <div className="book-card-buttons">
        <Link to={`/book/${book._id}`} className="view-button">View Details</Link>
        <button onClick={() => addToCart(book)} className="cart-button">Add to Cart</button>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string, 
  }).isRequired
};

export default BookCard;
