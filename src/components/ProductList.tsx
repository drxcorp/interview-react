import { useState, useEffect } from 'react';
import { products, Product } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  onProductClick: (product: Product) => void;
}

const searchProducts = async (query: string, category: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, Math.random() * 300));

  let result = [...products];

  if (category !== 'all') {
    result = result.filter(p => p.category === category);
  }

  if (query) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  return result;
};

export const ProductList = ({ onProductClick }: ProductListProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['all', 'audio', 'wearables', 'apparel', 'home', 'accessories', 'fitness'];

  useEffect(() => {
    setIsLoading(true);

    searchProducts(searchQuery, selectedCategory).then(result => {
      if (sortBy === 'price-low') {
        result.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        result.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
      } else {
        result.sort((a, b) => a.name.localeCompare(b.name));
      }

      setFilteredProducts(result);
      setIsLoading(false);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px', color: '#1a1a1a' }}>
          Discover Products
        </h1>

        <div style={{ marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '16px',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              style={{
                padding: '8px 16px',
                backgroundColor: selectedCategory === category ? '#1a1a1a' : 'white',
                color: selectedCategory === category ? 'white' : '#1a1a1a',
                border: '1px solid #e5e5e5',
                borderRadius: '20px',
                fontSize: '14px',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #e5e5e5',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
          <span style={{ fontSize: '14px', color: '#666' }}>
            {filteredProducts.length} products
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          opacity: isLoading ? 0.6 : 1,
          transition: 'opacity 0.2s'
        }}
      >
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onProductClick(product)}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && !isLoading && (
        <div style={{ textAlign: 'center', padding: '48px', color: '#666' }}>
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
};
