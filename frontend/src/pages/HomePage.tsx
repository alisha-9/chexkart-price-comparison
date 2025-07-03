import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { productService } from '../services/productService';

const FEATURED_CATEGORIES = [
  { name: 'Electronics', icon: '🔌' },
  { name: 'Fashion', icon: '👕' },
  { name: 'Home & Garden', icon: '🏡' },
  { name: 'Sports & Fitness', icon: '⚽' },
  { name: 'Books & Media', icon: '📚' },
];

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getFeaturedProducts(8);
        setFeaturedProducts(products);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-700 dark:via-indigo-600 dark:to-purple-700 text-white relative overflow-hidden">
  <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1515168833906-d2a3b82b1e1b?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Find the Best Deals Across Multiple Stores
          </h1>
          <p className="text-xl text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
            Compare prices, save money, and make smart shopping decisions with
            Chexkart
          </p>
          <Link
            to="/search"
            className="inline-block bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-200 transition-colors"
          >
            Start Comparing
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURED_CATEGORIES.map((category) => (
            <Link
              key={category.name}
              to={`/search?category=${encodeURIComponent(category.name)}`}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all group border dark:border-gray-700"
            >
              <span className="text-4xl mb-2 block group-hover:scale-110 transition-transform">
                {category.icon}
              </span>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Featured Products</h2>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
