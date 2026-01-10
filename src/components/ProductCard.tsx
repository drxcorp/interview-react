import { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = product.image;
    img.onload = () => setImageLoaded(true);
  }, [product.image]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);

    // Show temporary feedback
    const button = e.currentTarget as HTMLButtonElement;
    const originalText = button.textContent;
    button.textContent = 'Added!';
    setTimeout(() => {
      button.textContent = originalText;
    }, 1000);
  };

  const stockStatus = () => {
    if (product.stock > 50) return 'In Stock';
    if (product.stock > 10) return 'Low Stock';
    if (product.stock > 0) return 'Very Low Stock';
    return 'Out of Stock';
  };

  return (
    <div
      className="product-card"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: '1px solid #e5e5e5',
        borderRadius: '12px',
        padding: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)'
      }}
    >
      <div style={{ position: 'relative', paddingBottom: '100%', marginBottom: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px', overflow: 'hidden' }}>
        {!imageLoaded && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading...
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s'
          }}
          loading="lazy"
        />
      </div>

      <div style={{ marginBottom: '8px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>
          {product.name}
        </h3>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ fontSize: '14px', color: '#666' }}>★ {product.rating}</span>
        <span style={{ fontSize: '12px', color: product.stock > 10 ? '#22c55e' : '#ef4444' }}>
          {stockStatus()}
        </span>
      </div>

      <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
        {product.description.substring(0, 80)}...
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a' }}>
          ${product.price.toFixed(2)}
        </span>
        <button
          onClick={handleAddToCart}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#333';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#1a1a1a';
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
