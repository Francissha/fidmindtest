
import React from 'react'
import Banner from './Banner'
import TopSellers from './TopSellers'
import Recommended from './Recommended'
import News from './News'
import Feedback from './Feedback'
import Kenyan from './Kenyan'


const Home = () => {
  return (
    <>
    <Banner/>
     <TopSellers/>
    <Recommended/>
    <Kenyan/>
    <News/>    
    <Feedback/>  
    </>
  )
}

export default Home
