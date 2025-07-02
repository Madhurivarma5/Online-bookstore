import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email'); // optional
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2>
        
        Online Bookstore
      </h2>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>

        {isLoggedIn ? (
          <>
            <Link to="/account">My Account</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
