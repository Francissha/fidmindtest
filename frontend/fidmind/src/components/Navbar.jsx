import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import avatarImg from '../assets/avatar.png';  
import axios from 'axios';  
import { useTheme } from '../context/ThemeContext';

const navigation = [
    { name: "About Us", href: "/about" },
    { name: "Admin", href: "/admin" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" }
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");  
  const [filteredBooks, setFilteredBooks] = useState([]);  
  const [noResults, setNoResults] = useState(false);  
  const cartItems = useSelector(state => state.cart.cartItems);
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogOut = () => {
    logout();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;  

    try {
      const response = await axios.get(`https://xyztest.onrender.com/api/books?query=${query}`);
      
      if (response.data.length === 0) {
        setNoResults(true);
        setFilteredBooks([]);
      } else {
        setNoResults(false);
        setFilteredBooks(response.data);
      }
    } catch (error) {
      console.error("Error fetching filtered books", error);
      setNoResults(true);
      setFilteredBooks([]);
    }
  };

  const handleBookClick = () => {
    setFilteredBooks([]);  
    setQuery("");  
  };

  return (
    <header className='max-w-screen-2xl px-4 py-6'>
      <nav className='flex justify-between items-center'>
        
        {/* Left Section - Logo & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
          <Link to="/" className="font-semibold text-blue-500 text-2xl lg:text-2xl">
            fidmind
          </Link>

          {/* Search Bar (Visible on Large Screens) */}
          <form onSubmit={handleSearch} className="relative hidden sm:flex sm:w-64">
            <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-slate-100 w-full py-2 pl-10 rounded-md focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Right Section - User Menu & Cart */}
        <div className='relative flex items-center md:space-x-3 space-x-2'>
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="User Avatar"
                    className={`size-2 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''} sm:w-10 sm:h-10 w-8 h-8`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                    <ul className='py-2'>
                      {navigation.map((item) => (
                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                          <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="login"><HiOutlineUser className='size-6' /></Link>
            )}
          </div>

          <button onClick={toggleTheme}
                className="p-1 bg-blue-500 text-white rounded">
                {theme === "light" ? "🌙" : "☀️"}
            </button>

          <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm ml-4 sm:ml-6">
            <HiOutlineShoppingCart />
            <span className="text-sm font-semibold sm:ml-1">
              {cartItems.length > 0 ? cartItems.length : "0"}
            </span>
          </Link>
        </div>
      </nav>

      {/* Search Bar - Moves Below on Small Screens */}
      <div className="mt-4 sm:hidden">
        <form onSubmit={handleSearch} className="relative w-full flex items-center">
          <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search here"
            className="bg-slate-100 w-full py-2 pl-10 rounded-md focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Display filtered books if any */}
      {filteredBooks.length > 0 && query && (
        <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-md z-40">
          <ul className="py-2 max-h-60 overflow-y-auto">
            {filteredBooks.map((book) => (
              <li key={book._id}>
                <Link
                  to={`/books/${book._id}`}  
                  className="block px-4 py-2 text-sm text-blue-500 hover:bg-gray-100"
                  onClick={handleBookClick}
                >
                  {book.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No results message */}
      {noResults && query && (
        <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-md z-40 p-4 text-center">
          <p className="text-gray-600">Oops! Sorry"{query}".</p>
          <p className="text-gray-500 mt-2">Need help to get the book? <a href="https://wa.me/254708432543" target="_blank" rel="noopener noreferrer" className="text-blue-500">WhatsApp us</a>.</p>
        </div>
      )}
    </header>
  );
};

export default Navbar;

