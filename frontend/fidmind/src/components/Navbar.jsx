import React, { useState } from 'react'
import { Link } from 'react-router-dom'; 
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";


import avatarImg from "../assets/avatar.png"
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

// dropdown menu
const navigation =[
    //{name:"Admin", href:"/admin"},
    {name:"Orders", href:"/orders"},
    {name:"Cart Page", href:"/cart"},
    {name:"Check Out", href:"/checkout"}
]
const Navbar = () => {

const [isDropdownOpen, setIsDropdownOpen] =useState(false)
const cartItems = useSelector(state => state.cart.cartItems);

const {currentUser, logout} = useAuth()

const handleLogOut = () => {
    logout()
}

   {/*user log in or not*/}   return (
  <header className='max-w-screen-2xl px-4 py-6'>
    <nav className='flex justify-between items-center'>

         {/*A.left side*/}
    <div className='flex items-center md:gap-16 gap-4'>
    <Link to="/">
        <span className='text-3xl font-semibold text-blue-500'>fidmind</span>
    </Link>
 
         
       {/* Search Input */}
<div className="relative sm:w-54 w-70 space-x-2 flex items-center">
  <IoSearchOutline className="absolute left-3 sm:left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
  <input 
    type="text" 
    placeholder="Search here" 
    className="bg-slate-100 w-full py-2 pl-10 sm:pl-8 md:pl-10 rounded-md focus:outline-none"
  />
</div>

        </div>


         {/*B.right side*/}
         <div className='relative flex items-center md:space-x-3 space-x-2'>
        <div>
            {
                currentUser? <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}> 
                    <img src={avatarImg} alt="" className={`size-7 rounded-full $ {currentUser ? 'ring-2 ring-blue-500 : ''}`}/>
                </button>
        {/*show dropdown*/}
        {
            isDropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                    <ul className='py-2'>
                        {
                            navigation.map((item) => (
                                <li key={item.name} onClick={()=> setIsDropdownOpen(false)}>
                                    <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                                        {item.name}</Link>
                                </li>
                            ))
                        }
                        <li>
                            <button 
                            onClick={handleLogOut}
                            className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'>Logout</button></li>
                    </ul>
                </div>
            )
        }

                </> :<Link to="login">< HiOutlineUser className='size-6'/></Link>
            }
        </div>

           <button className='hidden sm:block'>
            <HiOutlineHeart className='size-6'/>
           </button>
             {/*show items added in numbers on cart*/}
         <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm">
                        <HiOutlineShoppingCart className='' />
                        {
                            cartItems.length > 0 ?  <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span> :  <span className="text-sm font-semibold sm:ml-1">0</span>
                        }
                        
                       </Link>
           </div>

    </nav>
  </header>
  )
}

export default Navbar
