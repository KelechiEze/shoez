export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  colors?: number;
  isNew?: boolean;
  bestSeller?: boolean;
  description?: string;
  themeColor?: string; // For hero background transitions
  sizes?: string[];
  features?: string[];
}
