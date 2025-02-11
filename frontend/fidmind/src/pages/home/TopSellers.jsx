import React, { useState } from 'react';
import BookCard from '../books/BookCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/books/booksApi';

// Define categories
const categories = [
  "Choose a genre", "Business", "Self-Help", "Biographies", "African",
  "Romance", "Thriller", "Adventure", "Horror", "Manga-Japan",
  "Technology", "Leadership", "Religious", "Finance", "Masculinity", "Feminine"
];

// Function to split books into chunks
const chunkArray = (array, size) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const { data: books = [] } = useFetchAllBooksQuery();

  // Filter books based on selected category
  const filteredBooks = selectedCategory === "Choose a genre"
    ? books
    : books.filter(book => book.category === selectedCategory.toLowerCase());

  // Split books into chunks (Each chunk contains books for 3 rows)
  const booksPerPage = 9; // 3 rows * 3 books per row = 9 books per page
  const bookChunks = chunkArray(filteredBooks, booksPerPage);

  return (
    <div className='py-10'>
      <h2 className='text-3xl font-semibold mb-6'>Fidmind Collection</h2>

      {/* Category Filtering */}
      <div className='mb-8 flex items-center'>
        <select 
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category" 
          id="category" 
          className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Swiper Slider for Books */}
      <Swiper
        slidesPerView={1}  // Show 1 full set per swipe
        spaceBetween={20}
        navigation={true}
       
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {bookChunks.length > 0 ? bookChunks.map((chunk, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {chunk.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          </SwiperSlide>
        )) : (
          <p className="text-gray-500 text-center col-span-full">No books available in this category.</p>
        )}
      </Swiper>
    </div>
  );
};

export default TopSellers;
