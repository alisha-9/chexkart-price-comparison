export interface Price {
  storeName: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  productUrl: string;
  inStock?: boolean;
  stockCount?: number;
  lastUpdated?: Date;
}

export interface Review {
  userName: string;
  userEmail?: string;
  comment: string;
  rating: number;
  verified?: boolean;
  helpful?: number;
  createdAt: Date;
}

export interface Specification {
  name: string;
  value: string;
  unit?: string;
}

export interface Variant {
  name: string;
  value: string;
  priceModifier: number;
  inStock: boolean;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  shortDescription?: string;
  category: string;
  subcategory?: string;
  brand?: string;
  model?: string;
  sku?: string;
  images: Array<{
    url: string;
    alt?: string;
    isPrimary: boolean;
  } | string>;
  specifications?: Specification[];
  variants?: Variant[];
  prices: Price[];
  priceHistory?: Array<{
    storeName: string;
    price: number;
    date: Date;
  }>;
  rating: number;
  reviewCount?: number;
  reviews: Review[];
  tags?: string[];
  features?: string[];
  warranty?: {
    duration: string;
    type: string;
    provider: string;
  };
  dimensions?: {
    length: number;
    width: number;
    height: number;
    weight: number;
    unit: string;
  };
  availability?: {
    inStock: boolean;
    stockCount?: number;
    restockDate?: Date;
  };
  analytics?: {
    views: number;
    clicks: number;
    wishlistCount: number;
  };
  status?: 'active' | 'inactive' | 'discontinued';
  featured?: boolean;
  trending?: boolean;
  createdAt: Date;
  updatedAt?: Date;
  // Virtual fields
  minPrice?: number;
  maxPrice?: number;
  savingsPercentage?: number;
  averageRating?: number;
  onSale?: boolean;
}

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  featured?: boolean;
  trending?: boolean;
  sort?: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular' | 'name';
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  location?: {
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  preferences?: {
    categories: string[];
    brands: string[];
    priceRange: {
      min: number;
      max: number;
    };
    notifications: {
      email: boolean;
      priceAlerts: boolean;
      newDeals: boolean;
    };
    currency: string;
    language: string;
  };
  role: 'user' | 'admin' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
  wishlistCount?: number;
  createdAt: Date;
}

export interface WishlistItem {
  _id: string;
  productId: Product;
  addedAt: Date;
  priceAlert: {
    enabled: boolean;
    targetPrice?: number;
    notified: boolean;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  subcategories: Array<{
    name: string;
    slug: string;
    description?: string;
    image?: string;
    productCount: number;
    featured: boolean;
  }>;
  productCount: number;
  featured: boolean;
  order: number;
}
