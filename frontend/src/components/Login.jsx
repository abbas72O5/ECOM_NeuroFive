import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthUser }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      if (!response.ok) {
        throw new Error('Invalid credentials (try: user, seller1, seller2)');
      }

      const data = await response.json();
      setAuthUser(data);
      
      if (data.role === 'seller') {
        navigate('/seller');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center" style={{ minHeight: '80vh' }}>
      <div className="glass-panel" style={{ width: '400px', padding: '2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Welcome Back</h2>
        {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Username</label>
            <select 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="select-filter"
              style={{ width: '100%', marginBottom: '1rem' }}
              required
            >
              <option value="" disabled>Select a user to login</option>
              <option value="user">Shopper (User)</option>
              <option value="seller1">Acme Electronics (Seller 1)</option>
              <option value="seller2">Globex Clothing (Seller 2)</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
