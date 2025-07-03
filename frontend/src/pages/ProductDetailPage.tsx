import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Product } from '../types';
import { productService } from '../services/productService';
import { wishlistService } from '../services/wishlistService';
import { useAuth } from '../contexts/AuthContext';
import { formatPriceIndian, getImageUrl, getImageAlt } from '../utils/currency';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    userName: '',
    rating: 5,
    comment: '',
  });
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await productService.getProduct(id);
        setProduct(data);
        setError(null);

        // Check wishlist status if user is authenticated
        if (isAuthenticated) {
          try {
            const inWishlist = await wishlistService.checkWishlist(id);
            setIsInWishlist(inWishlist);
          } catch (wishlistError) {
            console.error('Error checking wishlist status:', wishlistError);
          }
        }
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, isAuthenticated]);

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      alert('Please login to add items to wishlist');
      return;
    }

    if (!id) return;

    setWishlistLoading(true);
    try {
      if (isInWishlist) {
        await wishlistService.removeFromWishlist(id);
        setIsInWishlist(false);
      } else {
        await wishlistService.addToWishlist(id);
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      alert('Failed to update wishlist. Please try again.');
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !id) return;

    try {
      await productService.addReview(id, { rating: reviewForm.rating, comment: reviewForm.comment });
      // Refresh the product data to get the updated reviews
      const updatedProduct = await productService.getProduct(id);
      setProduct(updatedProduct);
      setReviewForm({ userName: '', rating: 5, comment: '' });
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Product not found'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-purple-50 via-blue-50 to-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={getImageUrl(product.images[selectedImage])}
              alt={getImageAlt(product.images[selectedImage], product.name)}
              className="w-full h-[500px] object-contain"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg bg-gray-100 ${
                    selectedImage === index
                      ? 'ring-2 ring-primary-500'
                      : 'hover:ring-2 hover:ring-gray-300'
                  }`}
                >
                  <img
                    src={getImageUrl(image)}
                    alt={getImageAlt(image, `${product.name} ${index + 1}`)}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex-1">{product.name}</h1>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              disabled={wishlistLoading}
              className="ml-4 p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
              title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isInWishlist ? (
                <HeartSolidIcon className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors" />
              )}
            </button>
          </div>

          {/* Rating */}
          <div className="mt-4 flex items-center">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-5 w-5 ${
                    star <= product.rating
                      ? 'text-yellow-400'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              ({product.reviews.length} reviews)
            </span>
          </div>

          {/* Price Comparison */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Price Comparison</h2>
            <div className="space-y-4">
              {product.prices
                .slice()
                .sort((a, b) => a.price - b.price)
                .map((price) => (
                  <div
                    key={price.storeName}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div>
                      <h3 className="font-medium">{price.storeName}</h3>
                      <p className="text-2xl font-bold">
                        {formatPriceIndian(price.price)}
                      </p>
                    </div>
                    <a
                      href={price.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Visit Store
                    </a>
                  </div>
                ))}
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Reviews */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">Customer Reviews</h2>

            {/* Review Form */}
            <form onSubmit={handleReviewSubmit} className="card mb-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={reviewForm.userName}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, userName: e.target.value })
                    }
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rating
                  </label>
                  <div className="mt-1 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setReviewForm({ ...reviewForm, rating: star })
                        }
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        {star <= reviewForm.rating ? (
                          <StarIcon className="h-6 w-6 text-yellow-400" />
                        ) : (
                          <StarOutlineIcon className="h-6 w-6 text-gray-300" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Review
                  </label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, comment: e.target.value })
                    }
                    required
                    rows={4}
                    className="input-field"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Submit Review
                </button>
              </div>
            </form>

            {/* Reviews List */}
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div key={index} className="card">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{review.userName}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? 'text-yellow-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
