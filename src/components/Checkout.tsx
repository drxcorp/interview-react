import { useState, useEffect } from 'react';
import { useCartStore } from '../store/cartStore';

interface CheckoutProps {
  onClose: () => void;
}

export const Checkout = ({ onClose }: CheckoutProps) => {
  const { items, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const validateEmail = (email: string) => {
    return email.includes('@') && email.includes('.');
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!formData.country) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setOrderComplete(true);

    setTimeout(() => {
      clearCart();
      onClose();
    }, 3000);
  };

  const subtotal = getTotal();
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  if (orderComplete) {
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
          zIndex: 1000
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '48px',
            maxWidth: '500px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>✓</div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', color: '#22c55e' }}>
            Order Confirmed!
          </h2>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '8px' }}>
            Thank you for your purchase, {formData.firstName}!
          </p>
          <p style={{ fontSize: '14px', color: '#999' }}>
            A confirmation email has been sent to {formData.email}
          </p>
        </div>
      </div>
    );
  }

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
        padding: '24px',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative'
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

        <div style={{ padding: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Checkout</h1>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
            <div
              style={{
                flex: 1,
                height: '4px',
                backgroundColor: step >= 1 ? '#1a1a1a' : '#e5e5e5',
                borderRadius: '2px',
                transition: 'background-color 0.3s'
              }}
            />
            <div
              style={{
                flex: 1,
                height: '4px',
                backgroundColor: step >= 2 ? '#1a1a1a' : '#e5e5e5',
                borderRadius: '2px',
                transition: 'background-color 0.3s'
              }}
            />
          </div>

          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Shipping Information</h2>

              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `1px solid ${errors.email ? '#ef4444' : '#e5e5e5'}`,
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                  {errors.email && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${errors.firstName ? '#ef4444' : '#e5e5e5'}`,
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    {errors.firstName && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.firstName}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${errors.lastName ? '#ef4444' : '#e5e5e5'}`,
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    {errors.lastName && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `1px solid ${errors.address ? '#ef4444' : '#e5e5e5'}`,
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                  {errors.address && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.address}</p>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${errors.city ? '#ef4444' : '#e5e5e5'}`,
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    {errors.city && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.city}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${errors.postalCode ? '#ef4444' : '#e5e5e5'}`,
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    {errors.postalCode && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.postalCode}</p>}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `1px solid ${errors.country ? '#ef4444' : '#e5e5e5'}`,
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                  {errors.country && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.country}</p>}
                </div>
              </div>

              <button
                onClick={handleNext}
                style={{
                  marginTop: '24px',
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Payment Information</h2>

              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
                      const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                      handleInputChange('cardNumber', formatted);
                    }}
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `1px solid ${errors.cardNumber ? '#ef4444' : '#e5e5e5'}`,
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                  {errors.cardNumber && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.cardNumber}</p>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `1px solid ${errors.cardName ? '#ef4444' : '#e5e5e5'}`,
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                  {errors.cardName && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.cardName}</p>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2, 4);
                        }
                        handleInputChange('expiryDate', value);
                      }}
                      maxLength={5}
                      placeholder="MM/YY"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${errors.expiryDate ? '#ef4444' : '#e5e5e5'}`,
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    {errors.expiryDate && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.expiryDate}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                      CVV
                    </label>
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        handleInputChange('cvv', value);
                      }}
                      maxLength={3}
                      placeholder="123"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${errors.cvv ? '#ef4444' : '#e5e5e5'}`,
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    {errors.cvv && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.cvv}</p>}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: '32px',
                  padding: '24px',
                  backgroundColor: '#fafafa',
                  borderRadius: '12px'
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Order Summary</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                  {items.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span>{item.name} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '12px' }}>
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 700 }}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    padding: '16px',
                    backgroundColor: 'white',
                    color: '#1a1a1a',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  style={{
                    padding: '16px',
                    backgroundColor: isProcessing ? '#ccc' : '#1a1a1a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    flex: 2
                  }}
                >
                  {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
