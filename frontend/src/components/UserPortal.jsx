import React, { useState } from 'react';

const mockProducts = [
  { id: 1, name: 'Premium Wireless Headphones', price: '$299.99', category: 'Electronics' },
  { id: 2, name: 'Ergonomic Desk Chair', price: '$199.50', category: 'Home' },
  { id: 3, name: 'Minimalist Watch', price: '$149.00', category: 'Accessories' },
  { id: 4, name: 'Mechanical Keyboard', price: '$129.99', category: 'Electronics' },
];

const UserPortal = ({ authUser }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = cartItems.length;

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div>
          <h1>Welcome, {authUser?.name || 'Guest'}</h1>
          <p>Discover our curated collection of premium items.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsCartOpen(true)}>View Cart ({cartCount})</button>
      </div>

      <div className="grid grid-cols-4">
        {mockProducts.map((product) => (
          <div key={product.id} className="glass-panel product-card">
            <div className="product-img"></div>
            <h3>{product.name}</h3>
            <p style={{ fontSize: '0.875rem' }}>{product.category}</p>
            <div className="product-price">{product.price}</div>
            <button 
              className="btn-primary" 
              style={{ width: '100%' }}
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass-panel" style={{ width: '400px', maxHeight: '80vh', overflowY: 'auto', backgroundColor: '#1a1a1a', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2>Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}>&times;</button>
            </div>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cartItems.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </div>
                ))}
                <div style={{ marginTop: '1rem', textAlign: 'right', fontWeight: 'bold' }}>
                  Total Items: {cartCount}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPortal;
