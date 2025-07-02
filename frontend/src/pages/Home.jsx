import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import './Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  // Debounce effect for search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(data => {
        setAllBooks(data);
        setBooks(data);
      })
      .catch(err => console.error('Error:', err));
  }, []);

  useEffect(() => {
    let filtered = [...allBooks];

    if (search.trim()) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (authorFilter) {
      filtered = filtered.filter(book => book.author === authorFilter);
    }

    if (priceFilter) {
      const [min, max] = priceFilter.split('-').map(Number);
      filtered = filtered.filter(book => book.price >= min && book.price <= max);
    }

    setBooks(filtered);
  }, [search, authorFilter, priceFilter, allBooks]);

  const clearFilters = () => {
    setSearch('');
    setSearchInput('');
    setAuthorFilter('');
    setPriceFilter('');
    setBooks(allBooks);
  };

  const uniqueAuthors = [...new Set(allBooks.map(book => book.author))];

  return (
    <div className="home">
      <h2>Available Books</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <select value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)}>
          <option value="">All Authors</option>
          {uniqueAuthors.map(author => (
            <option key={author} value={author}>{author}</option>
          ))}
        </select>

        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="">All Prices</option>
          <option value="0-199">₹0 - ₹199</option>
          <option value="200-399">₹200 - ₹399</option>
          <option value="400-1000">₹400+</option>
        </select>

        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      <div className="book-list">
        {books.length > 0 ? (
          books.map(book => (
            <BookCard key={book._id} book={book} />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
