import axios from 'axios';
import { Product, ProductFilters, Category } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface SearchSuggestion {
  type: 'product' | 'category' | 'brand';
  text: string;
  count?: number;
}

export interface SearchResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  filters: {
    categories: Array<{ name: string; count: number }>;
    brands: Array<{ name: string; count: number }>;
    priceRanges: Array<{ min: number; max: number; count: number }>;
    ratings: Array<{ rating: number; count: number }>;
  };
}

export const productService = {
  // Get all products with filters
  getProducts: async (filters: ProductFilters = {}, page = 1, limit = 20): Promise<SearchResponse> => {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.subcategory) params.append('subcategory', filters.subcategory);
    if (filters.brand) params.append('brand', filters.brand);
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.rating) params.append('rating', filters.rating.toString());
    if (filters.inStock !== undefined) params.append('inStock', filters.inStock.toString());
    if (filters.featured) params.append('featured', filters.featured.toString());
    if (filters.trending) params.append('trending', filters.trending.toString());
    if (filters.sort) params.append('sort', filters.sort);
    
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
  },

  // Get single product by ID
  getProduct: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async (limit = 10): Promise<Product[]> => {
    const response = await api.get(`/products/featured?limit=${limit}`);
    return response.data;
  },

  // Get trending products
  getTrendingProducts: async (limit = 10): Promise<Product[]> => {
    const response = await api.get(`/products/trending?limit=${limit}`);
    return response.data;
  },

  // Get products on sale
  getSaleProducts: async (limit = 20): Promise<Product[]> => {
    const response = await api.get(`/products/sale?limit=${limit}`);
    return response.data;
  },

  // Get search suggestions
  getSearchSuggestions: async (query: string): Promise<SearchSuggestion[]> => {
    if (!query || query.length < 2) return [];
    
    const response = await api.get(`/products/suggestions?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  // Get categories
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get brands
  getBrands: async (category?: string): Promise<string[]> => {
    const params = category ? `?category=${encodeURIComponent(category)}` : '';
    const response = await api.get(`/products/brands${params}`);
    return response.data;
  },

  // Get price range for category
  getPriceRange: async (category?: string): Promise<{ min: number; max: number }> => {
    const params = category ? `?category=${encodeURIComponent(category)}` : '';
    const response = await api.get(`/products/price-range${params}`);
    return response.data;
  },

  // Add product review
  addReview: async (productId: string, review: { rating: number; comment: string }): Promise<void> => {
    await api.post(`/products/${productId}/reviews`, review);
  },

  // Track product view
  trackView: async (productId: string): Promise<void> => {
    await api.post(`/products/${productId}/view`);
  },

  // Track product click
  trackClick: async (productId: string, storeName: string): Promise<void> => {
    await api.post(`/products/${productId}/click`, { storeName });
  },

  // Compare products
  compareProducts: async (productIds: string[]): Promise<Product[]> => {
    const response = await api.post('/products/compare', { productIds });
    return response.data;
  }
};

export default productService;
