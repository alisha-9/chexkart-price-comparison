import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, TrashIcon, BellIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../contexts/AuthContext';
import { wishlistService } from '../services/wishlistService';
import { WishlistItem } from '../types';
import { formatPriceIndian, getImageUrl, getImageAlt } from '../utils/currency';

const WishlistPage: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      const items = await wishlistService.getWishlist();
      setWishlistItems(items);
    } catch (error) {
      setError('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await wishlistService.removeFromWishlist(productId);
      setWishlistItems(items => items.filter(item => item.productId._id !== productId));
    } catch (error) {
      setError('Failed to remove item from wishlist');
    }
  };

  const togglePriceAlert = async (productId: string, enabled: boolean, targetPrice?: number) => {
    try {
      await wishlistService.updatePriceAlert(productId, enabled, targetPrice);
      setWishlistItems(items =>
        items.map(item =>
          item.productId._id === productId
            ? {
                ...item,
                priceAlert: { ...item.priceAlert, enabled, targetPrice }
              }
            : item
        )
      );
    } catch (error) {
      setError('Failed to update price alert');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Please sign in</h3>
          <p className="mt-1 text-sm text-gray-500">
            You need to be signed in to view your wishlist.
          </p>
          <div className="mt-6">
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
          
          <div className="text-center py-12">
            <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Your wishlist is empty</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start adding products to your wishlist to keep track of items you love.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Wishlist ({wishlistItems.length} items)
          </h1>
          <button
            onClick={() => wishlistService.clearWishlist().then(fetchWishlist)}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Clear All
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => {
            const product = item.productId;
            const minPrice = Math.min(...product.prices.map(p => p.price));

            return (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={getImageUrl(product.images[0])}
                      alt={getImageAlt(product.images[0], product.name)}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                  >
                    <TrashIcon className="h-5 w-5 text-red-500" />
                  </button>
                </div>

                <div className="p-4">
                  <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPriceIndian(minPrice)}
                      </span>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600 ml-1">
                          {product.rating} ({product.reviewCount || 0})
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      from {product.prices.length} stores
                    </p>
                  </div>

                  {/* Price Alert Section */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Price Alert</span>
                      <button
                        onClick={() => togglePriceAlert(
                          product._id,
                          !item.priceAlert.enabled,
                          item.priceAlert.targetPrice
                        )}
                        className={`p-1 rounded ${
                          item.priceAlert.enabled
                            ? 'text-blue-600 bg-blue-100'
                            : 'text-gray-400 bg-gray-200'
                        }`}
                      >
                        <BellIcon className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {item.priceAlert.enabled && (
                      <div className="mt-2">
                        <input
                          type="number"
                          placeholder="Target price"
                          value={item.priceAlert.targetPrice || ''}
                          onChange={(e) => {
                            const targetPrice = parseFloat(e.target.value);
                            if (!isNaN(targetPrice)) {
                              togglePriceAlert(product._id, true, targetPrice);
                            }
                          }}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Get notified when price drops below this amount
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Link
                      to={`/product/${product._id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 text-sm font-medium"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
