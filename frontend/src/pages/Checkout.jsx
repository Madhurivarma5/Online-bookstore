import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../utils/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to proceed to checkout.');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item._id}>
                {item.title} - ₹{item.price}
              </li>
            ))}
          </ul>
          <p><strong>Total: ₹{total}</strong></p>
          <p>Thank you for your purchase! 🎉</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
