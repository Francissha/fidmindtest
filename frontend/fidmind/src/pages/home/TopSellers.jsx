import React, { useState } from 'react';
import BookCard from '../books/BookCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import required modules
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useFetchAllBooksQuery } from '../../redux/books/booksApi';

// Function to split books into chunks
const chunkArray = (array, size) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

const TopSellers = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  // Split books into chunks (Each chunk contains books for 3 rows)
  const booksPerPage = 9;
  const bookChunks = chunkArray(books, booksPerPage);

  return (
    <div className='py-10'>
      <h2 className='text-3xl font-semibold mb-6'>Fidmind Collection</h2>

      {/* Swiper Slider for Books */}
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        modules={[Pagination]} // Removed Navigation
        className="mySwiper"
      >
        {bookChunks.length > 0 ? bookChunks.map((chunk, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {chunk.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          </SwiperSlide>
        )) : (
          <p className="text-gray-500 text-center col-span-full">No books available.</p>
        )}
      </Swiper>
    </div>
  );
};

export default TopSellers;


