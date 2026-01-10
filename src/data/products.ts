export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Minimalist Wireless Earbuds",
    price: 129.99,
    description: "Premium sound quality with active noise cancellation. 24-hour battery life.",
    category: "audio",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
    stock: 45,
    rating: 4.8
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 399.99,
    description: "Advanced health tracking with ECG monitoring and always-on display.",
    category: "wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    stock: 28,
    rating: 4.6
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 45.00,
    description: "Sustainably sourced, ultra-soft fabric. Perfect everyday essential.",
    category: "apparel",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    stock: 120,
    rating: 4.9
  },
  {
    id: 4,
    name: "Ceramic Coffee Mug",
    price: 24.99,
    description: "Handcrafted artisan mug with double-wall insulation.",
    category: "home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop",
    stock: 85,
    rating: 4.7
  },
  {
    id: 5,
    name: "Leather Laptop Bag",
    price: 189.99,
    description: "Premium full-grain leather with padded compartments.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    stock: 32,
    rating: 4.8
  },
  {
    id: 6,
    name: "Portable Speaker",
    price: 89.99,
    description: "360° sound with waterproof design. 12-hour playtime.",
    category: "audio",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    stock: 64,
    rating: 4.5
  },
  {
    id: 7,
    name: "Reading Glasses",
    price: 79.99,
    description: "Blue light blocking lenses with titanium frame.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&h=500&fit=crop",
    stock: 91,
    rating: 4.6
  },
  {
    id: 8,
    name: "Yoga Mat Pro",
    price: 68.00,
    description: "Non-slip eco-friendly material with alignment markers.",
    category: "fitness",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
    stock: 55,
    rating: 4.9
  },
  {
    id: 9,
    name: "Stainless Steel Water Bottle",
    price: 34.99,
    description: "Vacuum insulated, keeps drinks cold for 24 hours.",
    category: "fitness",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
    stock: 150,
    rating: 4.8
  },
  {
    id: 10,
    name: "Desk Organizer Set",
    price: 49.99,
    description: "Bamboo construction with modular design.",
    category: "home",
    image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=500&h=500&fit=crop",
    stock: 72,
    rating: 4.7
  },
  {
    id: 11,
    name: "Wireless Charger",
    price: 39.99,
    description: "Fast charging with auto-alignment technology.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1591290619762-d2c9e0d8a8e6?w=500&h=500&fit=crop",
    stock: 103,
    rating: 4.5
  },
  {
    id: 12,
    name: "Plant-Based Protein Powder",
    price: 54.99,
    description: "Organic pea protein with natural vanilla flavor.",
    category: "fitness",
    image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=500&h=500&fit=crop",
    stock: 88,
    rating: 4.6
  }
];
