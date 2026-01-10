import { useState } from 'react';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Product } from './data/products';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <header
        style={{
          borderBottom: '1px solid #e5e5e5',
          padding: '24px',
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 50
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>
            MODERN STORE
          </h1>
        </div>
      </header>

      <main>
        <ProductList onProductClick={setSelectedProduct} />
      </main>

      <Cart onCheckout={() => setShowCheckout(true)} />

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {showCheckout && (
        <Checkout onClose={() => setShowCheckout(false)} />
      )}
    </div>
  );
}

export default App;
