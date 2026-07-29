# E-Commerce Platform & Seller Dashboard

A full-stack e-commerce application featuring a clean user storefront and a robust, data-rich seller dashboard.

![alt text](image.png)

## Overview

This project consists of:
1. **Frontend (Vite + React)**: A responsive, premium-styled web app built with React, React Router, Recharts, and custom CSS glassmorphism aesthetics.
2. **Backend (Express)**: A lightweight Node.js API that provides dynamic, mock aggregation data for the seller dashboard.

## Features

- **User Portal**: A beautifully styled storefront where users can view featured products and add them to their cart.
- **Seller Dashboard**: 
  - Dynamic visualizations using **Recharts** (Line chart, Bar chart, and Donut pie chart).
  - High-level metric summary cards (Sales, Impressions, Clicks, Reviews).
  - Interactive date filtering that queries the backend API.
- **Premium Design**: Dark mode aesthetic, glassmorphism panels, and vibrant micro-interactions built with Vanilla CSS.

## Getting Started

To run the application locally, you will need to start both the backend server and the frontend development server.

### 1. Start the Backend API

Open a terminal window and run:

```bash
cd backend
npm install
node server.js
```

The backend server will start running on `http://localhost:5000`.

### 2. Start the Frontend App

Open a second, separate terminal window and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend application will start on your local Vite development server (usually `http://localhost:5173`). Open the provided local URL in your browser to view the app!

## Testing

This project includes a comprehensive, multi-layered testing suite to ensure high reliability across all components.

### 1. Frontend Tests (Vitest & React Testing Library)
The frontend relies on **Vitest** for its fast execution and **React Testing Library** for component rendering. These tests simulate a browser environment using `jsdom`.
- **What it tests**: 
  - Component rendering (e.g., verifying the Navigation and Login forms load correctly).
  - User interactions (e.g., typing into inputs and clicking buttons).
  - State changes (e.g., showing a "Logging in..." state upon form submission).
- **How to run**:
  ```bash
  cd frontend
  npm run test
  ```

### 2. Backend Tests (Jest & Supertest)
The backend uses **Jest** as the test runner and **Supertest** to execute mock HTTP requests against the Express API.
- **What it tests**: 
  - Validates all core API endpoints (`/api/products`, `/api/login`, `/api/checkout`, `/api/seller/stats`).
  - **Happy paths**: Ensuring a 200 OK response and correct data structures for valid requests.
  - **Failure cases**: Ensuring 400/401 errors are properly thrown for missing IDs or invalid credentials.
- **How to run**:
  ```bash
  cd backend
  npm run test
  ```

### 3. End-to-End Tests (Cypress)
For full integration testing, **Cypress** simulates a real user driving the web app.
- **What it tests**: 
  - The complete user checkout flow (`user_flow.cy.js`).
  - It logs in as a shopper, verifies the dashboard loads, adds items to the cart, opens the modal, and clicks the checkout button, validating alerts along the way.
- **How to run**:
  > **Note:** Your backend (`node server.js`) and frontend (`npm run dev`) must be running before starting Cypress!
  
  In a new terminal at the project root, run:
  ```bash
  npx cypress open
  ```
  *(Select "E2E Testing", choose your browser, and click the test file to run it).*

## Tech Stack

- **Frontend**: React, React Router DOM, Recharts, Lucide React, Vanilla CSS, Vite, Vitest.
- **Backend**: Node.js, Express, CORS, Jest, Supertest.
- **E2E**: Cypress.
