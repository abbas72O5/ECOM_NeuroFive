import React, { useState, useEffect } from 'react';

const UserPortal = ({ authUser }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to load products", err));
  }, []);

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    alert(`Added ${product.name} to cart!`);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setCheckingOut(true);
    try {
      const response = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems })
      });
      if (response.ok) {
        alert('Checkout successful! The seller dashboards have been updated.');
        setCartItems([]);
        setIsCartOpen(false);
      } else {
        alert('Checkout failed. Is the backend running?');
      }
    } catch (err) {
      console.error(err);
      alert('Error during checkout. Is the backend running?');
    }
    setCheckingOut(false);
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
        {products.map((product) => (
          <div key={product.id} className="glass-panel product-card">
            <div className="product-img"></div>
            <h3>{product.name}</h3>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
              {product.category} (Sold by {product.sellerId === 'seller1' ? 'Acme Electronics' : 'Globex Clothing'})
            </p>
            <div className="product-price">${product.price.toFixed(2)}</div>
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
          <div className="glass-panel" style={{ width: '500px', maxHeight: '80vh', overflowY: 'auto', backgroundColor: '#1a1a1a', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2>Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
            </div>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cartItems.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid #333', paddingBottom: '0.75rem' }}>
                    <span>{item.name} <small style={{ color: '#94a3b8' }}>({item.sellerId})</small></span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ marginTop: '1rem', textAlign: 'right', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                  Total: ${cartTotal.toFixed(2)}
                </div>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', backgroundColor: '#10b981' }}
                  onClick={handleCheckout}
                  disabled={checkingOut}
                >
                  {checkingOut ? 'Processing...' : `Checkout & Pay $${cartTotal.toFixed(2)}`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPortal;
