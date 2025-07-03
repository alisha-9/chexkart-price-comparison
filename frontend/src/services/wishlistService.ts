import api from './authService';
import { WishlistItem } from '../types';

export const wishlistService = {
  // Get user's wishlist
  getWishlist: async (): Promise<WishlistItem[]> => {
    const response = await api.get('/wishlist');
    return response.data.wishlist;
  },

  // Add product to wishlist
  addToWishlist: async (productId: string, priceAlert?: { enabled: boolean; targetPrice?: number }): Promise<void> => {
    await api.post(`/wishlist/add/${productId}`, { priceAlert });
  },

  // Remove product from wishlist
  removeFromWishlist: async (productId: string): Promise<void> => {
    await api.delete(`/wishlist/remove/${productId}`);
  },

  // Update price alert for wishlist item
  updatePriceAlert: async (productId: string, enabled: boolean, targetPrice?: number): Promise<void> => {
    await api.put(`/wishlist/price-alert/${productId}`, {
      enabled,
      targetPrice
    });
  },

  // Check if product is in wishlist
  checkWishlist: async (productId: string): Promise<boolean> => {
    const response = await api.get(`/wishlist/check/${productId}`);
    return response.data.isInWishlist;
  },

  // Clear entire wishlist
  clearWishlist: async (): Promise<void> => {
    await api.delete('/wishlist/clear');
  }
};
