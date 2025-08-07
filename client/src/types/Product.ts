export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'arabian' | 'english' | 'oil' | 'luxury';
  description: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  value: string;
}