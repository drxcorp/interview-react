import { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { useCartStore } from '../store/cartStore';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  const addItem = useCartStore(state => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onClose();
    }, 500);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const relatedImages = [
    product.image,
    product.image,
    product.image
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '24px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
          transition: 'transform 0.3s'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          ×
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '48px' }}>
          <div>
            <div
              style={{
                width: '100%',
                paddingBottom: '100%',
                position: 'relative',
                backgroundColor: '#f5f5f5',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '16px'
              }}
            >
              <img
                src={selectedImage}
                alt={product.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {relatedImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: selectedImage === img ? '2px solid #1a1a1a' : '2px solid transparent',
                    transition: 'border 0.2s'
                  }}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ marginBottom: '8px' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '12px',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  color: '#666',
                  fontWeight: 600
                }}
              >
                {product.category}
              </span>
            </div>

            <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#1a1a1a' }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} style={{ color: star <= Math.floor(product.rating) ? '#fbbf24' : '#d1d5db', fontSize: '18px' }}>
                    ★
                  </span>
                ))}
              </div>
              <span style={{ fontSize: '16px', color: '#666' }}>
                {product.rating} / 5.0
              </span>
            </div>

            <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '24px', color: '#1a1a1a' }}>
              ${product.price.toFixed(2)}
            </div>

            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666', marginBottom: '32px' }}>
              {product.description}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Stock:</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: product.stock > 10 ? '#22c55e' : '#ef4444' }}>
                  {product.stock} units available
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1a1a1a' }}>
                Quantity
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    fontSize: '20px',
                    cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                    opacity: quantity <= 1 ? 0.5 : 1
                  }}
                >
                  -
                </button>
                <span style={{ fontSize: '18px', fontWeight: 600, minWidth: '40px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    fontSize: '20px',
                    cursor: quantity >= product.stock ? 'not-allowed' : 'pointer',
                    opacity: quantity >= product.stock ? 0.5 : 1
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                style={{
                  flex: 1,
                  padding: '16px 32px',
                  backgroundColor: product.stock === 0 ? '#ccc' : '#1a1a1a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (product.stock > 0) {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#333';
                  }
                }}
                onMouseLeave={(e) => {
                  if (product.stock > 0) {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#1a1a1a';
                  }
                }}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
