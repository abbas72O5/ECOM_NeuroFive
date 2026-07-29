const request = require('supertest');
const app = require('./server');

describe('API Endpoints', () => {
  it('GET /api/products returns a list of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('POST /api/login succeeds with valid user', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'user' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.role).toBe('user');
  });

  it('POST /api/login fails with invalid user', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'invalid' });
    expect(res.statusCode).toEqual(401);
    expect(res.body.error).toBe('Invalid credentials');
  });

  it('GET /api/seller/stats fails if missing sellerId', async () => {
    const res = await request(app).get('/api/seller/stats');
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe('Seller ID is required');
  });

  it('POST /api/checkout succeeds with valid cart items', async () => {
    const res = await request(app)
      .post('/api/checkout')
      .send({
        cartItems: [
          { id: 1, price: 100, sellerId: 'seller1' }
        ]
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });
});
