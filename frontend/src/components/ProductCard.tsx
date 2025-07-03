import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Product } from '../types';
import { formatPriceIndian, getImageUrl, getImageAlt } from '../utils/currency';
import { wishlistService } from '../services/wishlistService';
import { useAuth } from '../contexts/AuthContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const lowestPrice = Math.min(...product.prices.map((p) => p.price));
  const highestPrice = Math.max(...product.prices.map((p) => p.price));
  const savings = ((highestPrice - lowestPrice) / highestPrice) * 100;

  // Check if product is in wishlist when component mounts
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (isAuthenticated) {
        try {
          const inWishlist = await wishlistService.checkWishlist(product._id);
          setIsInWishlist(inWishlist);
        } catch (error) {
          console.error('Error checking wishlist status:', error);
        }
      }
    };

    checkWishlistStatus();
  }, [product._id, isAuthenticated]);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail page
    e.stopPropagation();

    if (!isAuthenticated) {
      // Redirect to login or show login modal
      alert('Please login to add items to wishlist');
      return;
    }

    setIsLoading(true);
    try {
      if (isInWishlist) {
        await wishlistService.removeFromWishlist(product._id);
        setIsInWishlist(false);
      } else {
        await wishlistService.addToWishlist(product._id);
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      alert('Failed to update wishlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link to={`/product/${product._id}`} className="block group">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md group-hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          disabled={isLoading}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isInWishlist ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
          )}
        </button>

        <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center">
          <img
            src={getImageUrl(product.images[0])}
            alt={getImageAlt(product.images[0], product.name)}
            className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-300 drop-shadow-xl"
          />
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-1">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.rating.toFixed(1)} ({product.reviews.length} reviews)
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatPriceIndian(lowestPrice)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                from {product.prices.length} stores
              </span>
            </div>
          </div>

          {savings >= 15 && (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse z-10">
              Best Deal
            </div>
          )}
          {savings >= 5 && (
            <div className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-200 mt-2">
              Save up to {savings.toFixed(0)}%
            </div>
          )}
          {/* Price Comparison Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{ width: `${100 - savings}%` }}></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
