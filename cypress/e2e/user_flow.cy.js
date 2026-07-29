describe('User Shopping Flow', () => {
  it('logs in as a user, views products, and adds to cart', () => {
    // Start at login page
    cy.visit('/login');

    // Verify login page loaded
    cy.contains('Welcome Back').should('be.visible');

    // Type username
    cy.get('input[type="text"]').type('user');

    // Click login
    cy.contains('button', 'Login').click();

    // Verify redirected to user portal
    cy.url().should('eq', 'http://localhost:5173/');
    cy.contains('Welcome, Shopper').should('be.visible');

    // Wait for products to load (assuming backend is running)
    cy.contains('Premium Wireless Headphones').should('be.visible');

    // Add first item to cart
    cy.get('button').contains('Add to Cart').first().click();

    // The frontend currently uses a standard alert() for adding to cart
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Added');
    });

    // View cart
    cy.contains('button', 'View Cart').click();

    // Verify item is in cart
    cy.contains('Your Cart').should('be.visible');
    cy.contains('Premium Wireless Headphones').should('be.visible');
    
    // Note: To fully checkout, the backend server must be running. We can click checkout and check for success alert.
    cy.contains('button', 'Checkout & Pay').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Checkout successful');
    });
  });
});
