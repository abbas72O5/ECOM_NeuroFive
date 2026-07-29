const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mock Data
const dataStore = {
  seller1: {
    salesOverTime: [
      { name: 'Mon', sales: 4000, impressions: 2400 },
      { name: 'Tue', sales: 3000, impressions: 1398 },
      { name: 'Wed', sales: 2000, impressions: 9800 },
      { name: 'Thu', sales: 2780, impressions: 3908 },
      { name: 'Fri', sales: 1890, impressions: 4800 },
      { name: 'Sat', sales: 2390, impressions: 3800 },
      { name: 'Sun', sales: 3490, impressions: 4300 },
    ],
    clicksByCategory: [
      { name: 'Electronics', clicks: 400 },
      { name: 'Clothing', clicks: 300 },
      { name: 'Home', clicks: 300 },
      { name: 'Sports', clicks: 200 },
    ],
    reviews: [
      { name: '5 Stars', value: 400 },
      { name: '4 Stars', value: 300 },
      { name: '3 Stars', value: 100 },
      { name: '2 Stars', value: 50 },
      { name: '1 Star', value: 20 },
    ],
    totals: {
      sales: 19550,
      impressions: 31306,
      clicks: 1200,
      reviews: 870
    }
  },
  seller2: {
    salesOverTime: [
      { name: 'Mon', sales: 1200, impressions: 800 },
      { name: 'Tue', sales: 1500, impressions: 950 },
      { name: 'Wed', sales: 900, impressions: 1200 },
      { name: 'Thu', sales: 1100, impressions: 850 },
      { name: 'Fri', sales: 1600, impressions: 1300 },
      { name: 'Sat', sales: 2100, impressions: 2000 },
      { name: 'Sun', sales: 2500, impressions: 2200 },
    ],
    clicksByCategory: [
      { name: 'Electronics', clicks: 100 },
      { name: 'Clothing', clicks: 500 },
      { name: 'Home', clicks: 150 },
      { name: 'Sports', clicks: 50 },
    ],
    reviews: [
      { name: '5 Stars', value: 150 },
      { name: '4 Stars', value: 80 },
      { name: '3 Stars', value: 30 },
      { name: '2 Stars', value: 10 },
      { name: '1 Star', value: 5 },
    ],
    totals: {
      sales: 10900,
      impressions: 9300,
      clicks: 800,
      reviews: 275
    }
  }
};

const products = [
  { id: 1, name: 'Premium Wireless Headphones', price: 299.99, category: 'Electronics', sellerId: 'seller1' },
  { id: 2, name: 'Ergonomic Desk Chair', price: 199.50, category: 'Home', sellerId: 'seller2' },
  { id: 3, name: 'Minimalist Watch', price: 149.00, category: 'Accessories', sellerId: 'seller2' },
  { id: 4, name: 'Mechanical Keyboard', price: 129.99, category: 'Electronics', sellerId: 'seller1' },
];

const filterData = (range, sellerId) => {
  const sellerData = dataStore[sellerId];
  if (!sellerData) return null;

  if (range === 'last7days') {
    return sellerData; // Default mock data is for 7 days
  }
  
  if (range === 'today') {
    return {
      salesOverTime: [{ name: 'Today', sales: Math.floor(sellerData.totals.sales / 7), impressions: Math.floor(sellerData.totals.impressions / 7) }],
      clicksByCategory: sellerData.clicksByCategory.map(c => ({...c, clicks: Math.floor(c.clicks / 7)})),
      reviews: sellerData.reviews,
      totals: {
        sales: Math.floor(sellerData.totals.sales / 7),
        impressions: Math.floor(sellerData.totals.impressions / 7),
        clicks: Math.floor(sellerData.totals.clicks / 7),
        reviews: Math.floor(sellerData.totals.reviews / 7)
      }
    };
  }
  
  if (range === 'last30days') {
    return {
      salesOverTime: [...sellerData.salesOverTime, ...sellerData.salesOverTime, ...sellerData.salesOverTime, ...sellerData.salesOverTime],
      clicksByCategory: sellerData.clicksByCategory.map(c => ({...c, clicks: c.clicks * 4})),
      reviews: sellerData.reviews.map(r => ({...r, value: r.value * 4})),
      totals: {
        sales: sellerData.totals.sales * 4,
        impressions: sellerData.totals.impressions * 4,
        clicks: sellerData.totals.clicks * 4,
        reviews: sellerData.totals.reviews * 4
      }
    };
  }

  return sellerData;
};

// Login Mock API
app.post('/api/login', (req, res) => {
  const { username } = req.body;
  if (username === 'user') {
    res.json({ role: 'user', name: 'Shopper' });
  } else if (username === 'seller1') {
    res.json({ role: 'seller', sellerId: 'seller1', name: 'Acme Electronics' });
  } else if (username === 'seller2') {
    res.json({ role: 'seller', sellerId: 'seller2', name: 'Globex Clothing' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/seller/stats', (req, res) => {
  const { range, sellerId } = req.query; // 'today', 'last7days', 'last30days'
  if (!sellerId) {
    return res.status(400).json({ error: 'Seller ID is required' });
  }

  const stats = filterData(range || 'last7days', sellerId);
  if (!stats) {
    return res.status(404).json({ error: 'Seller not found' });
  }
  
  setTimeout(() => {
    res.json(stats);
  }, 500); // Simulate network delay
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/checkout', (req, res) => {
  const { cartItems } = req.body;
  if (!cartItems || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: 'cartItems array is required' });
  }

  const salesBySeller = {};
  cartItems.forEach(item => {
    if (item.sellerId) {
      if (!salesBySeller[item.sellerId]) salesBySeller[item.sellerId] = 0;
      salesBySeller[item.sellerId] += item.price;
    }
  });

  for (const sellerId in salesBySeller) {
    if (dataStore[sellerId]) {
      const salesAmount = Math.round(salesBySeller[sellerId]);
      dataStore[sellerId].totals.sales += salesAmount;
      
      // Update the first day (Monday) in the chart so they see a visual difference
      dataStore[sellerId].salesOverTime[0].sales += salesAmount;
    }
  }

  res.json({ success: true, message: 'Checkout complete' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
