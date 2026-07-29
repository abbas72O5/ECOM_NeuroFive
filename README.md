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

The application includes a comprehensive test suite covering the frontend, backend, and End-to-End user flows.

### Frontend Tests (Vitest & React Testing Library)
To run the frontend component and interaction tests:
```bash
cd frontend
npm run test
```

### Backend Tests (Jest & Supertest)
To run the backend API tests:
```bash
cd backend
npm run test
```

### End-to-End Tests (Cypress)
To run the E2E user flow simulation, make sure both your frontend (`npm run dev`) and backend (`node server.js`) are running first. Then, in a new terminal at the project root, run:
```bash
npm run cypress:open
```
*Note: You may need to add `"cypress:open": "cypress open"` to the root package.json if it isn't there, or simply use `npx cypress open` or `npx cypress run`.*

## Tech Stack

- **Frontend**: React, React Router DOM, Recharts, Lucide React, Vanilla CSS, Vite, Vitest.
- **Backend**: Node.js, Express, CORS, Jest, Supertest.
- **E2E**: Cypress.
