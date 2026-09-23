# Stockify

<p align="center">
  <img src="frontend/public/favicon.svg" alt="Stockify Logo" width="88" />
</p>

<h1 align="center">Stockify</h1>

<p align="center">
  <strong>Smart Retail Billing & Inventory Management System</strong>
</p>

<p align="center">
  A full-stack MERN application for managing products, inventory, billing, customers, suppliers, users, and business analytics from one modern dashboard.
</p>

<p align="center">
  <a href="https://github.com/badalkumar07320-art/Stockify">Repository</a>
  ·
  <a href="https://github.com/badalkumar07320-art/Stockify/issues">Issues</a>
</p>

---

## Overview

**Stockify** is a production-oriented retail management application designed to bring day-to-day store operations into a single digital workspace.

It combines a React-based dashboard with a Node.js/Express REST API and MongoDB database to provide inventory control, billing, customer and supplier management, authentication, administrative controls, and business reporting.

The project is structured as a separate **frontend + backend** application and includes a Render Blueprint configuration for deployment.

## Core Capabilities

### 📦 Inventory Management
- Create, view, update, and delete products
- Track stock quantities and pricing
- Increase or decrease stock
- Product detail views
- Low-stock monitoring
- Out-of-stock monitoring
- Stock-aware billing validation

### 🧾 Billing & Invoicing
- Create retail bills from the application
- Validate available stock before billing
- Generate invoice numbers automatically
- View invoice details
- Printable invoice experience
- Track payment-related sales information
- Automatically reflect sold quantities in inventory

### 👥 Customer Management
- Add and manage customers
- View customer details
- Update customer records
- Delete customer records
- Connect customer information with retail operations

### 🚚 Supplier Management
- Add and manage suppliers
- View supplier records
- Update supplier information
- Delete supplier records
- Maintain supplier-side inventory relationships

### 📊 Dashboard & Reports
- Business summary metrics
- Sales chart data
- Top-selling product analytics
- Stock alerts
- Payment-mode reporting
- Profit calculations
- Dedicated reports interface

### 🔐 Authentication & Administration
- User registration and login
- JWT-based authentication
- Password hashing with bcryptjs
- Protected application routes
- Admin-only routes
- Admin user management
- User block/unblock controls
- Profile management
- Password change flow
- Forgot-password interface

### 🎨 Modern Frontend Experience
- Responsive React dashboard
- Bootstrap-based UI
- Dark/light theme support
- Reusable components
- Toast notifications
- Confirmation modals
- Pagination
- Stock status badges
- Protected and admin route guards
- Charts powered by Recharts
- Icons powered by Lucide React

### 🛡️ Backend Security & Reliability
- Helmet security headers
- API rate limiting
- Configurable CORS
- Centralized error handling
- Environment-based configuration
- Async request handling
- Structured API responses
- JWT token generation and verification

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| UI | Bootstrap 5, Custom CSS |
| Routing | React Router |
| HTTP Client | Axios |
| Charts | Recharts |
| Icons | Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT |
| Password Security | bcryptjs |
| Security | Helmet, express-rate-limit, CORS |
| Deployment | Render |
| Architecture | MERN / REST API |

---

## Architecture

```text
┌───────────────────────────────┐
│        Stockify Frontend      │
│     React + Vite + Bootstrap  │
│                               │
│  Dashboard • Billing • Stock  │
│  Customers • Suppliers •      │
│  Products • Reports • Admin   │
└───────────────┬───────────────┘
                │
                │ Axios / REST API
                ▼
┌───────────────────────────────┐
│        Stockify Backend       │
│      Node.js + Express.js     │
│                               │
│ Controllers • Routes • Auth    │
│ Middleware • Business Logic   │
└───────────────┬───────────────┘
                │
                │ Mongoose
                ▼
┌───────────────────────────────┐
│          MongoDB              │
│                               │
│ Users • Products • Bills      │
│ Customers • Suppliers         │
└───────────────────────────────┘
```

---

## Project Structure

```text
Stockify/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   ├── controllers/
│   │   │   ├── adminUserController.js
│   │   │   ├── authController.js
│   │   │   ├── billController.js
│   │   │   ├── customerController.js
│   │   │   ├── dashboardController.js
│   │   │   ├── productController.js
│   │   │   └── supplierController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── errorMiddleware.js
│   │   ├── models/
│   │   │   ├── Bill.js
│   │   │   ├── Customer.js
│   │   │   ├── Product.js
│   │   │   ├── Supplier.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── adminUserRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── billRoutes.js
│   │   │   ├── customerRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   └── supplierRoutes.js
│   │   ├── scripts/
│   │   │   └── seedAdmin.js
│   │   ├── utils/
│   │   │   ├── apiResponse.js
│   │   │   ├── asyncHandler.js
│   │   │   ├── ensureAdmin.js
│   │   │   ├── generateInvoiceNo.js
│   │   │   ├── generateToken.js
│   │   │   └── logger.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── routes/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── render.yaml
├── .gitignore
└── README.md
```

---

## REST API

The backend exposes REST endpoints grouped by application domain.

### Authentication
```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/profile
PUT    /api/auth/change-password
```

### Admin
```text
PUT    /api/admin/users/:id/block
```

### Products & Inventory
```text
POST   /api/products
GET    /api/products
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id
PATCH  /api/products/:id/stock
GET    /api/products/low-stock
GET    /api/products/out-of-stock
```

### Billing
```text
POST   /api/bills
GET    /api/bills
GET    /api/bills/:id
DELETE /api/bills/:id
GET    /api/bills/invoice/:invoiceNo
```

### Customers
```text
POST   /api/customers
GET    /api/customers
GET    /api/customers/:id
PUT    /api/customers/:id
DELETE /api/customers/:id
```

### Suppliers
```text
POST   /api/suppliers
GET    /api/suppliers
GET    /api/suppliers/:id
PUT    /api/suppliers/:id
DELETE /api/suppliers/:id
```

### Dashboard
```text
GET    /api/dashboard/summary
GET    /api/dashboard/sales-chart
GET    /api/dashboard/top-products
GET    /api/dashboard/stock-alerts
```

---

## Getting Started

### Prerequisites

Install the following before running Stockify locally:

- Node.js
- npm
- MongoDB / MongoDB Atlas
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/badalkumar07320-art/Stockify.git
cd Stockify
```

### 2. Configure the Backend

```bash
cd backend
npm install
cp .env.example .env
```

Configure your backend environment variables:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-long-random-secret>
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
CLIENT_URLS=http://localhost:5173
```

Optional admin configuration:

```env
ADMIN_NAME=Stockify Admin
ADMIN_EMAIL=<your-admin-email>
ADMIN_PASSWORD=<your-admin-password>
ADMIN_PHONE=<your-admin-phone>
```

Start the backend:

```bash
npm run dev
```

For production-style execution:

```bash
npm start
```

### 3. Configure the Frontend

Open a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

Set the API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The Vite development server normally runs on:

```text
http://localhost:5173
```

---

## Admin Setup

Stockify includes an admin seed script.

Configure the admin environment variables in `backend/.env`, then run:

```bash
cd backend
npm run seed:admin
```

The application also contains admin-provisioning support through the backend configuration.

**Never commit real admin credentials, JWT secrets, or MongoDB credentials to GitHub.**

---

## Environment Variables

### Backend

| Variable | Purpose |
|---|---|
| `NODE_ENV` | Application environment |
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret |
| `JWT_EXPIRES_IN` | JWT expiration period |
| `CLIENT_URL` | Primary frontend origin |
| `CLIENT_URLS` | Allowed frontend origins |
| `ADMIN_NAME` | Admin account name |
| `ADMIN_EMAIL` | Admin account email |
| `ADMIN_PASSWORD` | Admin account password |
| `ADMIN_PHONE` | Admin account phone |

### Frontend

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Backend API base URL |

Example:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## Deployment with Render

The repository includes a `render.yaml` Blueprint configuration for both services.

### Backend Service

- Runtime: Node
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`

### Frontend Service

- Runtime: Static Site
- Root directory: `frontend`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- SPA rewrite: `/* → /index.html`

### Deployment Flow

```text
MongoDB Atlas
      │
      ▼
Stockify Backend ───────► Render Web Service
      │
      │ REST API
      ▼
Stockify Frontend ──────► Render Static Site
```

After deployment:

1. Deploy the backend.
2. Add MongoDB and JWT environment variables.
3. Copy the deployed backend URL.
4. Set frontend `VITE_API_URL` to the backend `/api` URL.
5. Deploy the frontend.
6. Configure backend `CLIENT_URL` / `CLIENT_URLS` with the deployed frontend origin.
7. Verify authentication, billing, inventory, and dashboard flows.

---

## Security

Stockify includes several server-side security measures:

- JWT authentication
- bcryptjs password hashing
- Protected and admin-only routes
- Helmet security headers
- API rate limiting
- CORS origin configuration
- Environment-based secrets
- Centralized error handling

Security-sensitive configuration should remain outside the repository.

---

## Development Commands

### Backend

```bash
cd backend
npm install
npm run dev
```

```bash
npm start
```

```bash
npm run seed:admin
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

---

## Design & Engineering Highlights

Stockify is organized around clear separation of responsibilities:

- **Routes** define API endpoints.
- **Controllers** contain request/business logic.
- **Models** define MongoDB schemas.
- **Middleware** handles authentication, authorization, errors, and request-level concerns.
- **Utils** contain reusable backend helpers.
- **React pages** represent application modules.
- **Reusable components** keep common UI behavior consistent.
- **Context providers** manage shared authentication and theme state.
- **Axios** centralizes frontend API communication.
- **Render Blueprint** keeps deployment configuration version-controlled.

---

## Roadmap

Potential future improvements include:

- Automated testing and CI/CD
- More granular role and permission management
- Advanced inventory movement history
- Barcode/QR-based product workflows
- Exportable sales and inventory reports
- More payment integrations
- Automated notifications
- Audit logs
- Enhanced analytics and forecasting
- Cloud image storage integration
- Improved observability and monitoring

---

## License

This project is released under the **MIT License** as specified by the backend package configuration.

---

## Author

**Badal Kumar**

GitHub: [@badalkumar07320-art](https://github.com/badalkumar07320-art)

---

<p align="center">
  Built with React, Node.js, Express, MongoDB, and a focus on practical retail automation.
</p>
