import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { TrendingUp, Eye, MousePointerClick, Star } from 'lucide-react';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];

const SellerDashboard = ({ authUser }) => {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState('last7days');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/seller/stats?range=${filter}&sellerId=${authUser?.sellerId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [filter]);

  if (loading) {
    return <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
      <h2>Loading Dashboard...</h2>
    </div>;
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '60vh', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ color: 'var(--secondary)' }}>Failed to load dashboard data</h2>
        <p>Please make sure the Express backend server is running on port 5000.</p>
        <p>Run: <code>cd backend && node server.js</code></p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div>
          <h1>Seller Dashboard</h1>
          <p>Welcome, {authUser?.name}. Here is the overview of your store's performance.</p>
        </div>
        <select 
          className="select-filter" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
        </select>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel stat-card">
          <TrendingUp className="stat-icon" size={24} />
          <span className="stat-title">Total Sales</span>
          <span className="stat-value">${data.totals.sales.toLocaleString()}</span>
        </div>
        <div className="glass-panel stat-card">
          <Eye className="stat-icon" size={24} />
          <span className="stat-title">Impressions</span>
          <span className="stat-value">{data.totals.impressions.toLocaleString()}</span>
        </div>
        <div className="glass-panel stat-card">
          <MousePointerClick className="stat-icon" size={24} />
          <span className="stat-title">Clicks</span>
          <span className="stat-value">{data.totals.clicks.toLocaleString()}</span>
        </div>
        <div className="glass-panel stat-card">
          <Star className="stat-icon" size={24} />
          <span className="stat-title">Total Reviews</span>
          <span className="stat-value">{data.totals.reviews.toLocaleString()}</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2" style={{ marginBottom: '2rem' }}>
        
        {/* Line Chart: Sales & Impressions */}
        <div className="glass-panel" style={{ height: '400px' }}>
          <h3>Sales & Impressions</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.salesOverTime} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis yAxisId="left" stroke="#94a3b8" />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="sales" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="impressions" stroke="var(--secondary)" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Clicks by Category */}
        <div className="glass-panel" style={{ height: '400px' }}>
          <h3>Clicks by Category</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.clicksByCategory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
              <Bar dataKey="clicks" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1">
        {/* Donut Chart: Reviews */}
        <div className="glass-panel" style={{ height: '400px' }}>
          <h3>Reviews Breakdown</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.reviews}
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={140}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.reviews.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default SellerDashboard;
