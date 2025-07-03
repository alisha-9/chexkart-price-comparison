import { Product, ProductFilters, Review } from '../types';

// Mock data for development
const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Sony WH-1000XM4 Wireless Headphones',
    description: 'Industry-leading noise canceling with Dual Noise Sensor technology',
    category: 'Electronics',
    images: [
      'https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81yD9yJ2r6L._AC_SL1500_.jpg'
    ],
    prices: [
      {
        storeName: 'Amazon',
        price: 29058,
        productUrl: 'https://www.amazon.in/Sony-WH-1000XM4-Cancelling-Headphones-Bluetooth/dp/B0863TXGM3',
        inStock: true,
        lastUpdated: new Date()
      },
      {
        storeName: 'Flipkart',
        price: 29224,
        productUrl: 'https://www.flipkart.com/sony-wh-1000xm4-bluetooth-headphones/p/itm9f84f49ad6ac8',
        inStock: true,
        lastUpdated: new Date()
      }
    ],
    rating: 4.8,
    reviews: [
      {
        userName: 'John Doe',
        rating: 5,
        comment: 'Best headphones I have ever owned!',
        createdAt: new Date('2025-04-14')
      },
      {
        userName: 'Priya Sharma',
        rating: 5,
        comment: 'Excellent sound quality and battery life. Worth every rupee!',
        createdAt: new Date('2025-04-12')
      },
      {
        userName: 'Rahul Mehta',
        rating: 4,
        comment: 'Great for work from home. Noise cancellation is amazing.',
        createdAt: new Date('2025-04-10')
      }
    ],
    createdAt: new Date('2025-04-01'),
    onSale: true
  },
  {
    _id: '2',
    name: 'Samsung 55" 4K Smart TV',
    description: 'Crystal clear display with smart features',
    category: 'Electronics',
    images: [
      'https://m.media-amazon.com/images/I/71LJJrKbezL._AC_SL1500_.jpg'
    ],
    prices: [
      {
        storeName: 'Amazon',
        price: 41582,
        productUrl: 'https://www.amazon.in/gaming-laptops/s?k=gaming+laptops'
      },
      {
        storeName: 'Flipkart',
        price: 41749,
        productUrl: 'https://www.flipkart.com/gaming-laptops/pr?sid=6bo%2Cb5g'
      }
    ],
    rating: 4.5,
    reviews: [
      {
        userName: 'Amit Kumar',
        rating: 5,
        comment: 'Amazing laptop! Perfect for gaming and work.',
        createdAt: new Date('2025-04-13')
      },
      {
        userName: 'Sneha Patel',
        rating: 4,
        comment: 'Good performance but gets a bit warm during heavy usage.',
        createdAt: new Date('2025-04-11')
      }
    ],
    createdAt: new Date('2025-04-01'),
    onSale: true
  },
  {
    _id: '5',
    name: 'Nike Air Max 270',
    description: 'Comfortable athletic shoes with Air cushioning',
    category: 'Fashion',
    images: ['https://m.media-amazon.com/images/I/71jeoX0rMBL._AC_UX575_.jpg'],
    prices: [
      { storeName: 'Nike', price: 12525, productUrl: 'https://www.nike.com/in/t/air-max-270-mens-shoes-KkLcGR/AH8050-002', inStock: true, lastUpdated: new Date() },
      { storeName: 'Amazon', price: 12524, productUrl: 'https://amazon.in', inStock: true, lastUpdated: new Date() }
    ],
    rating: 4.6,
    reviews: [
      {
        userName: 'Ravi Singh',
        rating: 5,
        comment: 'Super comfortable shoes! Great for running and daily wear.',
        createdAt: new Date('2025-04-09')
      },
      {
        userName: 'Neha Gupta',
        rating: 4,
        comment: 'Good quality but sizing runs a bit small.',
        createdAt: new Date('2025-04-08')
      },
      {
        userName: 'Karan Joshi',
        rating: 5,
        comment: 'Love the design and comfort. Highly recommended!',
        createdAt: new Date('2025-04-07')
      }
    ],
    createdAt: new Date('2025-04-01'),
    onSale: true
  },
  {
    _id: '6',
    name: 'Levi\'s 501 Original Fit Jeans',
    description: 'Classic straight leg jeans',
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800'],
    prices: [
      { storeName: 'Amazon', price: 5009, productUrl: 'https://amazon.in' },
      { storeName: 'Myntra', price: 5803, productUrl: 'https://myntra.com' }
    ],
    rating: 4.5,
    reviews: [
      {
        userName: 'Deepika Rao',
        rating: 4,
        comment: 'Good quality jeans. Fit is perfect and comfortable.',
        createdAt: new Date('2025-04-06')
      },
      {
        userName: 'Suresh Kumar',
        rating: 5,
        comment: 'Classic Levis quality. These jeans last for years!',
        createdAt: new Date('2025-04-05')
      }
    ],
    createdAt: new Date('2025-04-01'),
    onSale: false
  },
  {
    _id: '7',
    name: 'Ray-Ban Aviator Sunglasses',
    description: 'Classic aviator style with UV protection',
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800'],
    prices: [
      { storeName: 'Amazon', price: 154.00, productUrl: 'https://www.amazon.in/Ray-Ban-Aviator-Sunglasses/dp/B001GNBJQ4' },
      { storeName: 'Sunglass Hut', price: 169.00, productUrl: 'https://www.sunglasshut.com/us/ray-ban-aviator-classic-gold/8052896020578' }
    ],
    rating: 4.7,
    reviews: [
      {
        userName: 'Arjun Malhotra',
        rating: 5,
        comment: 'Classic aviators! Great quality and style.',
        createdAt: new Date('2025-04-04')
      },
      {
        userName: 'Pooja Agarwal',
        rating: 4,
        comment: 'Good sunglasses but a bit pricey. UV protection is excellent.',
        createdAt: new Date('2025-04-03')
      }
    ],
    createdAt: new Date('2025-04-01'),
    onSale: true
  },
  {
    _id: '8',
    name: 'Casio G-Shock Watch',
    description: 'Durable digital watch with multiple features',
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800'],
    prices: [
      { storeName: 'Amazon', price: 99.00, productUrl: 'https://www.amazon.in/Casio-G-Shock-Digital-Watch/dp/B07DQZQZQZ' },
      { storeName: 'Casio', price: 110.00, productUrl: 'https://www.casio.com/us/watches/gshock/product.GA2100-1A/' }
    ],
    rating: 4.8,
    reviews: [
      {
        userName: 'Vikash Sharma',
        rating: 5,
        comment: 'Tough watch! Perfect for outdoor activities.',
        createdAt: new Date('2025-04-02')
      },
      {
        userName: 'Manisha Jain',
        rating: 5,
        comment: 'Bought for my husband. He loves all the features!',
        createdAt: new Date('2025-04-01')
      },
      {
        userName: 'Rohit Verma',
        rating: 4,
        comment: 'Good watch but takes time to learn all functions.',
        createdAt: new Date('2025-03-30')
      }
    ],
    createdAt: new Date('2025-04-01'),
    onSale: false
  },
  {
    _id: '17',
    name: 'Adidas Ultraboost 21',
    description: 'Premium running shoes with responsive cushioning',
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800'],
    prices: [
      { storeName: 'Adidas', price: 180.00, productUrl: 'https://www.adidas.com/us/ultraboost-21-shoes/FY0377.html' },
      { storeName: 'Amazon', price: 169.95, productUrl: 'https://amazon.com' }
    ],
    rating: 4.8,
    reviews: [
      {
        userName: 'Sanjay Reddy',
        rating: 5,
        comment: 'Best running shoes I have ever owned! Great cushioning.',
        createdAt: new Date('2025-03-28')
      },
      {
        userName: 'Kavita Nair',
        rating: 5,
        comment: 'Perfect for marathon training. Very comfortable.',
        createdAt: new Date('2025-03-26')
      },
      {
        userName: 'Rajesh Gupta',
        rating: 4,
        comment: 'Good shoes but a bit expensive. Quality is excellent.',
        createdAt: new Date('2025-03-24')
      }
    ],
    createdAt: new Date('2025-04-01'),
    onSale: true
  },
  {
    _id: '18',
    name: 'Michael Kors Leather Crossbody Bag',
    description: 'Elegant leather bag with adjustable strap',
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800'],
    prices: [
      { storeName: 'Michael Kors', price: 298.00, productUrl: 'https://www.michaelkors.com/leather-crossbody-bag/_/R-30F2G7CM2L' },
      { storeName: 'Amazon', price: 278.95, productUrl: 'https://amazon.com' }
    ],
    rating: 4.7,
    reviews: [
      {
        userName: 'Priyanka Singh',
        rating: 5,
        comment: 'Beautiful bag! Perfect size for daily use.',
        createdAt: new Date('2025-03-22')
      },
      {
        userName: 'Anjali Sharma',
        rating: 4,
        comment: 'Good quality leather. A bit pricey but worth it.',
        createdAt: new Date('2025-03-20')
      },
      {
        userName: 'Meera Patel',
        rating: 5,
        comment: 'Love the design and quality. Highly recommended!',
        createdAt: new Date('2025-03-18')
      }
    ],
    createdAt: new Date('2025-04-01'),
    onSale: true
  },
  // Home & Garden Category
  {
    _id: '19',
    name: 'Philips Hue Smart LED Bulb Set',
    description: 'Color-changing smart LED bulbs with wireless control',
    category: 'Home & Garden',
    images: ['https://images.unsplash.com/photo-1563461660947-507ef49e9c47?auto=format&fit=crop&w=800'],
    prices: [
      { storeName: 'Philips', price: 199.99, productUrl: 'https://www.philips-hue.com/en-us/p/hue-white-and-color-ambiance-starter-kit-e26/046677555334' },
      { storeName: 'Amazon', price: 189.95, productUrl: 'https://amazon.com' },
      { storeName: 'Best Buy', price: 194.99, productUrl: 'https://bestbuy.com' }
    ],
    rating: 4.7,
    reviews: [
      {
        userName: 'Ravi Kumar',
        rating: 5,
        comment: 'Amazing smart lights! Easy to set up and control.',
        createdAt: new Date('2025-03-16')
      },
      {
        userName: 'Sunita Joshi',
        rating: 4,
        comment: 'Good product but app could be better. Colors are vibrant.',
        createdAt: new Date('2025-03-14')
      },
      {
        userName: 'Anil Verma',
        rating: 5,
        comment: 'Perfect for mood lighting. Great value for money.',
        createdAt: new Date('2025-03-12')
      }
    ],
    createdAt: new Date('2025-04-01'),
    onSale: true
  },
  {
    _id: '20',
    name: 'KitchenAid Stand Mixer',
    description: 'Professional 5-quart stand mixer with multiple attachments',
    category: 'Home & Garden',
    images: ['https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800'],
    prices: [
      { storeName: 'KitchenAid', price: 399.99, productUrl: 'https://www.kitchenaid.com/countertop-appliances/stand-mixers/tilt-head-stand-mixers/p.artisan-series-5-quart-tilt-head-stand-mixer.ksm150psob.html' },
      { storeName: 'Amazon', price: 379.95, productUrl: 'https://amazon.com' },
      { storeName: 'Williams Sonoma', price: 429.99, productUrl: 'https://www.williams-sonoma.com/products/kitchenaid-artisan-stand-mixer/' }
    ],
    rating: 4.9,
    reviews: [
      {
        userName: 'Lakshmi Iyer',
        rating: 5,
        comment: 'Excellent mixer! Makes baking so much easier.',
        createdAt: new Date('2025-03-10')
      },
      {
        userName: 'Rajesh Agarwal',
        rating: 5,
        comment: 'Heavy duty and reliable. Perfect for my bakery.',
        createdAt: new Date('2025-03-08')
      },
      {
        userName: 'Nisha Kapoor',
        rating: 4,
        comment: 'Great quality but quite expensive. Worth the investment.',
        createdAt: new Date('2025-03-06')
      },
      {
        userName: 'Suresh Reddy',
        rating: 5,
        comment: 'Best kitchen appliance I have ever bought!',
        createdAt: new Date('2025-03-04')
      }
    ],
    createdAt: new Date('2025-04-01'),
    onSale: false
  },
  {
    _id: '21',
    name: 'DEWALT Power Tool Set',
    description: '20V MAX Cordless Drill Combo Kit with 2 batteries',
    category: 'Home & Garden',
    images: ['https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800'],
    prices: [
      { storeName: 'Home Depot', price: 299.00, productUrl: 'https://www.homedepot.com/p/DEWALT-20-Volt-MAX-Cordless-Drill-Combo-Kit-2-Tool-with-2-Batteries-Charger-and-Bag-DCK240C2/204373168' },
      { storeName: 'Amazon', price: 289.99, productUrl: 'https://amazon.com' },
      { storeName: 'Lowes', price: 294.99, productUrl: 'https://www.lowes.com/pd/DEWALT-20-Volt-Max-2-Tool-Combo-Kit/1000191169' }
    ],
    rating: 4.8,
    reviews: [
      {
        userName: 'Manoj Singh',
        rating: 5,
        comment: 'Excellent tools! Great for home projects.',
        createdAt: new Date('2025-03-02')
      },
      {
        userName: 'Kavya Nair',
        rating: 4,
        comment: 'Good quality but batteries could last longer.',
        createdAt: new Date('2025-02-28')
      },
      {
        userName: 'Ashok Kumar',
        rating: 5,
        comment: 'Professional grade tools. Highly recommended!',
        createdAt: new Date('2025-02-26')
      }
    ],
    createdAt: new Date('2025-04-01'),
    onSale: true
  },
  {
    _id: '22',
    name: 'Dyson V15 Detect Vacuum',
    description: 'Cordless vacuum with laser dust detection',
    category: 'Home & Garden',
    images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800'],
    prices: [
      { storeName: 'Dyson', price: 699.99, productUrl: 'https://www.dyson.com/vacuum-cleaners/stick-vacuum-cleaners/dyson-v15-detect-nickel-yellow' },
      { storeName: 'Amazon', price: 679.95, productUrl: 'https://amazon.com' },
      { storeName: 'Best Buy', price: 689.99, productUrl: 'https://bestbuy.com' }
    ],
    rating: 4.7,
    reviews: [
      {
        userName: 'Shweta Sharma',
        rating: 5,
        comment: 'Amazing vacuum! The laser detection is incredible.',
        createdAt: new Date('2025-02-24')
      },
      {
        userName: 'Vinod Gupta',
        rating: 4,
        comment: 'Powerful suction but quite expensive.',
        createdAt: new Date('2025-02-22')
      },
      {
        userName: 'Rekha Patel',
        rating: 5,
        comment: 'Best vacuum cleaner I have ever used!',
        createdAt: new Date('2025-02-20')
      }
    ],
    createdAt: new Date('2025-04-01'),
    onSale: false
  },
  // Sports Category
  {
    _id: '23',
    name: 'NordicTrack Commercial 1750 Treadmill',
    description: 'Smart treadmill with 14-inch HD touchscreen and iFit integration',
    category: 'Sports',
    images: ['https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?auto=format&fit=crop&w=800'],
    prices: [
      { storeName: 'NordicTrack', price: 1899.00, productUrl: 'https://www.nordictrack.com/treadmills/commercial-1750-treadmill' },
      { storeName: 'Amazon', price: 1799.00, productUrl: 'https://amazon.com' },
      { storeName: 'Dick\'s Sporting Goods', price: 1849.99, productUrl: 'https://dickssportinggoods.com' }
    ],
    rating: 4.8,
    reviews: [
      {
        userName: 'Fitness Guru',
        rating: 5,
        comment: 'Excellent treadmill! Perfect for home workouts.',
        createdAt: new Date('2025-02-18')
      },
      {
        userName: 'Ramesh Joshi',
        rating: 4,
        comment: 'Good machine but takes up a lot of space.',
        createdAt: new Date('2025-02-16')
      },
      {
        userName: 'Sneha Reddy',
        rating: 5,
        comment: 'Great investment for health. Love the iFit features.',
        createdAt: new Date('2025-02-14')
      },
      {
        userName: 'Kiran Kumar',
        rating: 4,
        comment: 'Solid build quality. Assembly was a bit challenging.',
        createdAt: new Date('2025-02-12')
      }
    ],
    createdAt: new Date('2025-04-01'),
    onSale: true
  },
  {
    _id: '24',
    name: 'Wilson Evolution Basketball',
    description: 'Official size indoor game basketball with moisture-wicking technology',
    category: 'Sports',
    images: ['https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800'],
    prices: [
      { storeName: 'Wilson', price: 59.99, productUrl: 'https://www.wilson.com/en-us/product/evolution-basketball-WTB0516' },
      { storeName: 'Amazon', price: 54.95, productUrl: 'https://amazon.com' },
      { storeName: 'Dick\'s Sporting Goods', price: 57.99, productUrl: 'https://dickssportinggoods.com' }
    ],
    rating: 4.9,
    reviews: [
      {
        userName: 'Basketball Pro',
        rating: 5,
        comment: 'Perfect basketball! Great grip and bounce.',
        createdAt: new Date('2025-02-10')
      },
      {
        userName: 'Arjun Singh',
        rating: 5,
        comment: 'Best basketball for indoor games. Highly recommended!',
        createdAt: new Date('2025-02-08')
      },
      {
        userName: 'Rohit Sharma',
        rating: 4,
        comment: 'Good quality ball. Worth the price.',
        createdAt: new Date('2025-02-06')
      }
    ],
    createdAt: new Date('2025-04-01'),
    onSale: false
  },
  {
    _id: '25',
    name: 'Garmin Forerunner 945 GPS Watch',
    description: 'Advanced running watch with full-color mapping and training metrics',
    category: 'Sports',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800'],
    prices: [
      { storeName: 'Garmin', price: 599.99, productUrl: 'https://garmin.com' },
      { storeName: 'Amazon', price: 579.95, productUrl: 'https://amazon.com' },
      { storeName: 'REI', price: 589.99, productUrl: 'https://rei.com' }
    ],
    rating: 4.7,
    reviews: [
      {
        userName: 'Tech Runner',
        rating: 5,
        comment: 'Amazing GPS watch! Perfect for serious runners.',
        createdAt: new Date('2025-02-04')
      },
      {
        userName: 'Marathon Man',
        rating: 4,
        comment: 'Great features but battery life could be better.',
        createdAt: new Date('2025-02-02')
      },
      {
        userName: 'Fitness Freak',
        rating: 5,
        comment: 'Best running watch in the market. Love the mapping!',
        createdAt: new Date('2025-01-31')
      },
      {
        userName: 'Priya Runner',
        rating: 4,
        comment: 'Good watch but takes time to learn all features.',
        createdAt: new Date('2025-01-29')
      }
    ],
    createdAt: new Date('2025-04-01'),
    onSale: true
  },
  {
    _id: '26',
    name: 'Yeti Tundra 45 Cooler',
    description: 'Premium hard cooler for outdoor activities and camping',
    category: 'Sports',
    images: ['https://picsum.photos/id/26/800/800'],
    prices: [
      { storeName: 'Yeti', price: 325.00, productUrl: 'https://www.yeti.com/en_US/coolers/hard-coolers/tundra-45-cooler/YT45.html' },
      { storeName: 'Amazon', price: 299.99, productUrl: 'https://amazon.com' },
      { storeName: 'REI', price: 319.99, productUrl: 'https://rei.com' }
    ],
    rating: 4.8,
    reviews: [
      {
        userName: 'Outdoor Explorer',
        rating: 5,
        comment: 'Best cooler for camping! Keeps ice for days.',
        createdAt: new Date('2025-01-27')
      },
      {
        userName: 'Adventure Seeker',
        rating: 5,
        comment: 'Premium quality cooler. Worth every penny!',
        createdAt: new Date('2025-01-25')
      },
      {
        userName: 'Camping Expert',
        rating: 4,
        comment: 'Great cooler but quite heavy when full.',
        createdAt: new Date('2025-01-23')
      },
      {
        userName: 'Nature Lover',
        rating: 5,
        comment: 'Perfect for long camping trips. Highly durable!',
        createdAt: new Date('2025-01-21')
      }
    ],
    createdAt: new Date('2025-04-01'),
    onSale: false
  }
];

export const productService = {
  // Get all products with optional filters
  getProducts: async (filters?: ProductFilters) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredProducts = [...mockProducts];

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        );
      }

      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => 
          p.category.toLowerCase() === filters.category?.toLowerCase()
        );
      }

      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(p => 
          Math.min(...p.prices.map(price => price.price)) >= (filters.minPrice || 0)
        );
      }

      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(p => 
          Math.max(...p.prices.map(price => price.price)) <= (filters.maxPrice || Infinity)
        );
      }

      if (filters.sort) {
        switch (filters.sort) {
          case 'price-asc':
            filteredProducts.sort((a, b) => 
              Math.min(...a.prices.map(p => p.price)) - Math.min(...b.prices.map(p => p.price))
            );
            break;
          case 'price-desc':
            filteredProducts.sort((a, b) => 
              Math.min(...b.prices.map(p => p.price)) - Math.min(...a.prices.map(p => p.price))
            );
            break;
          case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        }
      }
    }

    return filteredProducts;
  },

  // Get single product by ID
  getProduct: async (id: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const product = mockProducts.find(p => p._id === id);
    if (!product) throw new Error('Product not found');
    return product;
  },

  // Add a review to a product
  addReview: async (productId: string, review: Omit<Review, 'createdAt'>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const product = mockProducts.find(p => p._id === productId);
    if (!product) throw new Error('Product not found');

    const newReview = {
      ...review,
      createdAt: new Date()
    };

    product.reviews.push(newReview);
    
    // Update product rating
    product.rating = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;

    return product;
  },

  // Search products
  searchProducts: async (query: string) => {
    return productService.getProducts({ search: query });
  },

  // Get products by category
  getProductsByCategory: async (category: string) => {
    return productService.getProducts({ category });
  },

  // Get today's deals
  getTodaysDeals: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts.filter(p => p.onSale);
  }
};
