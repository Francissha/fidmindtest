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
import news4 from '../../assets/news/news4.webp';


import { Link } from 'react-router-dom';

const news = [
    {
        "id": 1,
        "title": "Major Book Awards",
        "description": "The Pulitzer Prize for Fiction 2025 has been awarded to Jesmyn award for her novel Let Us Descend! This powerful novel explores themes of resilience and survival.Interested in award-winning books? Check out Pulitzer Prize collection ",
        "image": news1
    },
    {
        "id": 2,
        "title": "Fidmind Book Club Monthly Read ",
        "description": "This month, our FIDMIND Book Club is reading  Surrounded by Idiots by Thomas Erikson.Join the Discussion! Our next meeting is February 2nd at 3:00 PM in google meet.To join Whatsapp +254708432543.",
        "image": news2
    },
    {
        "id": 3,
        "title": "Literary Events & Festivals",
        "description": "The Nairobi International Book Fair 2025 is happening from March 20-24 at Sarit Expo Centre! Meet authors like Ngũgĩ wa Thiong'o, explore new books, and attend writing workshops.FIDMIND Book will be there! Visit our stand for exclusive discounts and a chance to win free books!",
        "image": news3
    },
    {
        "id": 4,
        "title": "Fidmind Podcast",
        "description": " Book Review: Atomic Habits by James ClearThis book is a must-read for anyone looking to improve their habits! Small daily changes lead to massive success.Want to change your life? Get Atomic Habits at Fidmind Book store today!",
        "image": news4
    }]

const News = () => {
  return (
    <div className='py-16'>
        <h2 className='text-3xl font-semibold mb-6'>Fidmind News</h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {
            news.map((item, index) => (
              <SwiperSlide key={index}>
                <div className='relative flex flex-col sm:flex-row sm:justify-between items-center gap-12'>
                  {/* Image Container */}
                  <div className='w-full h-72 sm:h-80 relative'>
                    <img src={item.image} alt={item.title} className='w-full h-full object-cover rounded-lg'/>
                    {/* Overlay Text */}
                    <div className='absolute top-0 left-0 w-full h-full rounded-lg bg-black bg-opacity-60 flex flex-col justify-center items-center p-4'>
                      <Link to="/">
                        <h3 className='text-xl font-semibold text-white mb-8'>{item.title}</h3>
                      </Link>
                      <p className='text-sm font-bold text-white'>{item.description}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
    </div>
  )
}

export default News;
