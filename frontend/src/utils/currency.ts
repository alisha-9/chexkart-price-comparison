// Currency conversion and formatting utilities

// Approximate USD to INR conversion rate (you can make this dynamic later)
const USD_TO_INR_RATE = 83.5;

/**
 * Convert USD price to INR
 */
export const convertUsdToInr = (usdPrice: number): number => {
  return usdPrice * USD_TO_INR_RATE;
};

/**
 * Format price in Indian Rupees
 */
export const formatPriceInr = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Format price with Indian number system (lakhs, crores)
 */
export const formatPriceIndian = (price: number): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(price);
};

// Helper function to get image URL from either string or object format
export const getImageUrl = (image: string | { url: string; alt?: string; isPrimary: boolean }): string => {
  return typeof image === 'string' ? image : image.url;
};

// Helper function to get image alt text
export const getImageAlt = (
  image: string | { url: string; alt?: string; isPrimary: boolean },
  fallback: string
): string => {
  return typeof image === 'string' ? fallback : image.alt || fallback;
};
