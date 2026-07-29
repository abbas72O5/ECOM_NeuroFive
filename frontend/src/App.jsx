import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import UserPortal from './components/UserPortal';
import SellerDashboard from './components/SellerDashboard';
import Login from './components/Login';

const Navigation = ({ authUser, onLogout }) => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <h2>✨ E-Commerce</h2>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
        {authUser?.role === 'user' && (
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>User Portal</Link>
        )}
        {authUser?.role === 'seller' && (
          <Link to="/seller" className={location.pathname === '/seller' ? 'active' : ''}>Seller Dashboard</Link>
        )}
        {authUser ? (
          <button onClick={onLogout} style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', marginLeft: '1rem', fontWeight: 'bold' }}>
            Logout ({authUser.name})
          </button>
        ) : (
          <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
        )}
      </div>
    </nav>
  );
};

const ProtectedRoute = ({ authUser, requiredRole, children }) => {
  if (!authUser) {
    return <Navigate to="/login" />;
  }
  if (requiredRole && authUser.role !== requiredRole) {
    if (authUser.role === 'seller') return <Navigate to="/seller" />;
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const [authUser, setAuthUser] = useState(null);

  const handleLogout = () => {
    setAuthUser(null);
  };

  return (
    <Router>
      <div className="container">
        <Navigation authUser={authUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<Login setAuthUser={setAuthUser} />} />
          <Route path="/" element={
            <ProtectedRoute authUser={authUser} requiredRole="user">
              <UserPortal authUser={authUser} />
            </ProtectedRoute>
          } />
          <Route path="/seller" element={
            <ProtectedRoute authUser={authUser} requiredRole="seller">
              <SellerDashboard authUser={authUser} />
            </ProtectedRoute>
          } />
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
