
import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  return (
    <div className="rounded-lg transition-shadow duration-300 h-full flex flex-col border p-4 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-full sm:justify-center gap-4">

        {/* Image Section */}
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md overflow-hidden">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt={book.title}
              className="w-full h-72 object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between h-full w-full">
          <Link to={`/books/${book._id}`}>
            <h3 className="text-sm font-semibold hover:text-blue-600 mb-2 min-h-[50px] sm:min-h-[60px] leading-tight">
              {book.title}
            </h3>
          </Link>

          <p className="text-gray-600 mb-3 text-xs sm:text-sm min-h-[60px] sm:min-h-[80px] leading-relaxed">
            {book?.description.length > 80
              ? `${book?.description.slice(0, 80)}...`
              : book.description}
          </p>

          <p className="font-medium mb-3 text-sm sm:text-base">
            Ksh {book?.newPrice}{" "}
            <span className="line-through font-normal ml-2 text-gray-500">
              Ksh {book?.oldPrice}
            </span>
          </p>

          <button
            onClick={() => handleAddToCart(book)}
            className="btn-primary px-6 space-x-1 flex items-center gap-1 py-2 w-full justify-center text-sm sm:text-base"
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default BookCard

