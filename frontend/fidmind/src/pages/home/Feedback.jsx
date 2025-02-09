import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

import news1 from '../../assets/news/news1.webp';
import news2 from '../../assets/news/news2.webp';
import news3 from '../../assets/news/news3.webp';

import { Link } from 'react-router-dom';

const news = [
    {
        "id": 1,
        "title": " Eunice M., Nakuru",
        "description": "Fidmind has completely changed how I buy books! I found rare titles I had been searching for at unbelievably affordable prices. The quality of the books and the customer service is excellent. I’ll definitely be buying all my future reads from Fidmind!",
        "image": news1
    },
    {
        "id": 2,
        "title": "Ayub Joel, Kirinyaga",
        "description": "I ordered ‘Starts with why’ and ‘Talking with confidence’ from Fidmind, and I was impressed by how quickly they delivered! The books were in great condition, and the prices were unbeatable. If you love reading, Fidmind is the best place to shop!",
        "image": news2
    },
    {
        "id": 3,
        "title": "Chris M.,Voi",
        "description": "As a bookworm, Fidmind is my go-to bookstore. Their collection is diverse, from self-help to fiction.The customer support is top-notch.I highly recommend Fidmind to everyone who loves books or trying to start reading.",
        "image": news3
    }

];

const Feedback = () => {
  return (
    <div className='py-16'>
        <h2 className='text-3xl font-semibold mb-6 text-center'>Fidmind Testimonials</h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 3, spaceBetween: 50 },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {news.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
                
                {/* Circular Image on Top */}
                <div className="w-28 h-28 bg-white rounded-full overflow-hidden absolute top-[-1px] shadow-lg">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-full" />
                </div>

                {/* Square Content Box */}
                <div className="mt-28 p-6 bg-gray-100 rounded-lg text-center">
                  <Link to="/">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                  </Link>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  );
}

export default Feedback;
