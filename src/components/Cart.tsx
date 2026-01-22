import { useState, useEffect } from 'react';
import { useCartStore } from '../store/cartStore';

interface CartProps {
  onCheckout: () => void;
}

export const Cart = ({ onCheckout }: CartProps) => {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      setIsOpen(false);
    }
  }, [items.length]);

  useEffect(() => {
    const saveCart = () => {
      localStorage.setItem('cart', JSON.stringify(items));
      setLastSaved(new Date().toLocaleTimeString());
    };

    const intervalId = setInterval(saveCart, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleRemoveItem = (id: number) => {
    setRemovingItemId(id);
    setTimeout(() => {
      removeItem(id);
      setRemovingItemId(null);
    }, 300);
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = getTotal();
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          backgroundColor: '#1a1a1a',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 100,
          transition: 'transform 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
        }}
      >
        🛒
        {totalItems > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: '#ef4444',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '100%',
            maxWidth: '450px',
            height: '100vh',
            backgroundColor: 'white',
            boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            transform: 'translateX(0)',
            transition: 'transform 0.3s'
          }}
        >
          <div
            style={{
              padding: '24px',
              borderBottom: '1px solid #e5e5e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Shopping Cart</h2>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '32px',
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1
              }}
            >
              ×
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 24px', color: '#666' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛍️</div>
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {items.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '16px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '12px',
                      opacity: removingItemId === item.id ? 0 : 1,
                      transform: removingItemId === item.id ? 'translateX(100%)' : 'translateX(0)',
                      transition: 'all 0.3s'
                    }}
                  >
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>

                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px 0' }}>
                        {item.name}
                      </h3>
                      <p style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 12px 0', color: '#1a1a1a' }}>
                        ${item.price.toFixed(2)}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            style={{
                              width: '28px',
                              height: '28px',
                              border: '1px solid #e5e5e5',
                              borderRadius: '4px',
                              backgroundColor: 'white',
                              fontSize: '16px',
                              cursor: 'pointer'
                            }}
                          >
                            -
                          </button>
                          <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            style={{
                              width: '28px',
                              height: '28px',
                              border: '1px solid #e5e5e5',
                              borderRadius: '4px',
                              backgroundColor: 'white',
                              fontSize: '16px',
                              cursor: 'pointer'
                            }}
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            fontSize: '14px',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div
              style={{
                padding: '24px',
                borderTop: '1px solid #e5e5e5',
                backgroundColor: '#fafafa'
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: '#666' }}>Subtotal</span>
                  <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: '#666' }}>Tax (10%)</span>
                  <span style={{ fontWeight: 600 }}>${tax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: '#666' }}>Shipping</span>
                  <span style={{ fontWeight: 600 }}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {lastSaved && (
                  <p style={{ fontSize: '11px', color: '#999', margin: '8px 0 0 0' }}>
                    Auto-saved at {lastSaved}
                  </p>
                )}
                {subtotal > 0 && subtotal < 100 && (
                  <p style={{ fontSize: '12px', color: '#22c55e', margin: '8px 0 0 0' }}>
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid #e5e5e5',
                  fontSize: '18px',
                  fontWeight: 700
                }}
              >
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onCheckout();
                }}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
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
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 150
          }}
        />
      )}
    </>
  );
};
