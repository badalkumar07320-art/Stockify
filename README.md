# Stockify

> Smart Retail Billing & Inventory Management System built as a MERN-style full-stack application.

Stockify is a retail management application for handling products, inventory, billing, customers, suppliers, users and business reports from one web interface.

This README is the current project reference for future development. It describes what is implemented in the repository now and separates completed functionality from planned enhancements.

## Current Status

**Current architecture:** React + Vite frontend, Node.js + Express backend, MongoDB + Mongoose database.

**Repository:** `badalkumar07320-art/Stockify`

**Default branch:** `main`

### Implemented today

- User registration and login
- JWT authentication
- Protected routes
- Admin/user role-based access
- Admin user management
- Product catalogue management
- SKU and optional barcode support
- Inventory stock increase/decrease/adjustment
- Stock history/audit trail
- Low-stock and out-of-stock monitoring
- Retail billing/POS flow
- Cash, UPI, Card and Credit payment modes
- Paid, Pending, Partial and Failed payment statuses
- Automatic invoice number generation
- Printable invoice page and browser Save-as-PDF flow
- Customer management and purchase history
- Supplier management and inventory product mapping
- Admin dashboard
- Sales, profit and inventory analytics
- Payment-mode sales analytics
- Top-selling product analytics
- Search, pagination and filtering in major modules
- Basic security middleware: Helmet, CORS allow-list and rate limiting
- Centralized API error handling
- Render deployment configuration

## Technology Stack

### Frontend

- React 18
- Vite
- React Router
- Axios
- Bootstrap 5
- Lucide React
- Recharts
- Custom CSS

### Backend

- Node.js
- Express 4
- Mongoose 8
- MongoDB
- JWT
- bcryptjs
- Helmet
- CORS
- express-rate-limit
- dotenv
- Nodemon for development

### Deployment

- Render configuration is present in `render.yaml`
- Backend is configured as a Node web service
- Frontend is configured as a Render static site
- MongoDB is expected through `MONGO_URI`

## Project Structure

```
Stockify/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   ├── .env.example
│   └── package.json
└── render.yaml
```

## Authentication & Authorization

Stockify currently uses JWT bearer-token authentication.

### User features

- Register
- Login
- Fetch current profile
- Update profile
- Change password
- Logout by clearing the client-side session

Passwords are hashed with bcrypt before storage.

The frontend stores the JWT and basic user information in localStorage.

### Roles

There are two roles:

- `user`
- `admin`

Admin-only backend operations are protected by `adminOnly` middleware.

Admins can currently:

- View/search users
- Change user roles
- Block/unblock users
- Access admin dashboard
- Manage products
- Manage inventory
- Manage customers
- Manage suppliers
- View reports

A user cannot remove their own admin role or block their own account.

## Product Management

The product system currently supports:

- Product name
- SKU
- Optional barcode
- Category
- Brand
- Purchase price
- Selling price
- MRP
- Current stock
- Low-stock limit
- Unit
- Expiry date
- Supplier name
- Product image URL
- Active/inactive state
- Creator information
- Stock history

Validation currently prevents:

- Negative monetary/stock values
- Selling price below purchase price
- Selling price above MRP
- Duplicate SKU
- Duplicate barcode where provided

Products can be searched and filtered by:

- Name
- SKU
- Barcode
- Category
- Active state
- Available/low/out-of-stock status

Pagination is implemented.

## Inventory Management

Inventory supports three stock operations:

1. Increase
2. Decrease
3. Adjustment

Every stock movement can record:

- Movement type
- Quantity
- Previous stock
- New stock
- Note
- User who performed the movement
- Timestamp

Stock cannot become negative.

The system also exposes:

- Low-stock products
- Out-of-stock products
- Stock alert counts

## Billing / POS

The billing module works with the product inventory.

A bill can contain multiple products and stores:

- Invoice number
- Customer snapshot
- Product snapshot
- Quantity
- Selling price
- Item discount
- Item tax
- Subtotal
- Total discount
- Total tax
- Grand total
- Payment mode
- Payment status
- User/cashier
- Creation time

Supported payment modes:

- Cash
- UPI
- Card
- Credit

Supported payment statuses:

- Paid
- Pending
- Partial
- Failed

When a bill is created:

- Product availability is checked
- Requested quantity is validated
- Product stock is reduced
- Stock history records the sale
- Invoice number is generated
- Bill data is stored
- Customer purchase history can be returned

Invoice numbers currently follow the pattern:

`STK-YYYYMMDD-00001`

The frontend provides:

- Invoice detail page
- Print action
- Browser print-dialog PDF workflow
- Customer details
- Cashier details
- Item table
- Totals
- Payment information

## Customers

Customer records currently contain:

- Name
- Mobile
- Email
- Address
- Total purchases
- Total spent
- Last purchase date

Features include:

- Add customer
- Search customer
- View customer details
- Edit customer
- Delete customer
- Purchase history
- Pagination

Mobile number is unique.

Customer purchase statistics are synchronized from bill history when customer records are read/updated.

## Suppliers

Supplier records currently contain:

- Name
- Phone
- Email
- Company name
- Address
- GST number
- Supplied products
- Total purchase value

Features include:

- Add supplier
- Search supplier
- View supplier details
- Edit supplier
- Delete supplier
- Product mapping
- Inventory purchase-value calculation
- Pagination

Supplier phone number is unique.

Product-to-supplier mapping currently uses the product's `supplierName` field and supplier/company names.

## Dashboard & Reports

Admin dashboard currently provides:

- Total products
- Total customers
- Total suppliers
- Total invoices
- Today's sales
- Monthly revenue
- Monthly profit
- Monthly purchase value
- Monthly sales value
- Monthly discount
- Monthly tax
- Low-stock count
- Out-of-stock count
- Recent bills
- Category-wise stock
- Payment-mode-wise sales
- Top-selling products

Reports currently provide:

- Date range filters
- Payment mode filter
- Daily sales
- Monthly sales
- Filtered sales
- Revenue/profit line chart
- Payment-mode pie chart
- Top-products bar chart
- Filtered bill list

Sales charts can be requested by year.

## Frontend Pages Currently Present

### Authentication

- Login
- Register
- Forgot Password UI placeholder

### Main application

- Dashboard
- Billing
- Invoice
- Products
- Product details
- Product add/edit form
- Customers
- Customer details
- Inventory
- Low Stock
- Suppliers
- Reports
- Admin Panel
- Settings placeholder
- Not Found page

Protected and admin route guards are implemented.

## Backend API Areas

The backend currently exposes these API groups:

- `/api/health`
- `/api/auth`
- `/api/admin`
- `/api/products`
- `/api/bills`
- `/api/customers`
- `/api/suppliers`
- `/api/dashboard`

The API uses centralized error handling and consistent authentication middleware.

## Security Already Present

Current backend security-related measures include:

- JWT authentication
- bcrypt password hashing
- Helmet
- CORS origin allow-list
- Express rate limiting
- Protected routes
- Admin authorization middleware
- Password exclusion from normal user queries
- Input validation in major controllers
- Environment variables for secrets/configuration

## Current Limitations / Known Gaps

These are important because they should not be treated as completed features.

### 1. Forgot-password flow is not implemented

The frontend contains a Forgot Password page, but it is currently a UI placeholder. There is no complete email-based reset-token workflow.

### 2. Invoice PDF is browser-based

The current Download PDF action opens the browser print flow and relies on the user selecting Save as PDF. There is no dedicated server-side PDF generation service.

### 3. Supplier purchasing is not a full purchase-management system

Supplier records and product mapping exist, but there is no complete purchase-order / goods-receiving workflow that automatically increases stock and records purchase transactions.

### 4. Barcode scanning is not implemented

A barcode field exists, but there is no camera scanner or dedicated barcode-reader workflow.

### 5. Payment integration is not implemented

UPI/Card are currently payment modes recorded in bills. There is no Razorpay/Stripe or bank/payment-gateway transaction integration.

### 6. Notifications are not implemented

There is no email, SMS, WhatsApp or push notification system for low stock, invoices or password recovery.

### 7. Settings page is a placeholder

A Settings route exists, but a complete store/profile/settings management module is still future work.

### 8. No automated test suite is currently part of the repository

Unit, integration and end-to-end testing should be added as the project grows.

### 9. Billing stock updates are not transactional

Bill creation and subsequent product saves are separate database operations. A future version should use MongoDB transactions so a partial failure cannot leave billing and inventory inconsistent.

### 10. Some analytics are calculated from current product purchase prices

Historical profit can change if a product's purchase price is edited later, because analytics look up the current product purchase price. A production-grade accounting model should snapshot cost price inside each bill item.

## Recommended Future Roadmap

Future development should be incremental. Do not implement everything at once.

### Phase 1 — Stability & correctness

- Fix and verify all current runtime issues
- Add request validation with a dedicated validation library
- Add automated API tests
- Add frontend error/loading/empty states consistently
- Add MongoDB transactions for billing + stock changes
- Improve pagination/filtering consistency
- Add database indexes based on actual query patterns
- Improve logging and production error monitoring
- Add API documentation

### Phase 2 — Authentication & security

- Complete forgot-password flow
- Email verification
- Refresh-token/session strategy
- Password reset tokens with expiry
- Stronger password policy
- Login attempt protection
- Audit logs for sensitive admin actions
- Better session/device management

### Phase 3 — Retail operations

- Barcode scanner
- Barcode label generation/printing
- Purchase orders
- Goods receiving
- Supplier purchase history
- Automatic stock receiving
- Stock transfer between locations
- Stock adjustment reasons
- Expiry alerts
- Batch/lot tracking
- Returns and refunds
- Damaged/expired stock handling

### Phase 4 — Billing improvements

- Tax/GST configuration
- Store-specific invoice details
- Invoice templates
- Real PDF generation
- Thermal receipt format
- Invoice reprint
- Bill cancellation/void flow
- Returns/refunds linked to original invoices
- Credit/customer outstanding balance
- Payment collection history

### Phase 5 — Analytics

- Custom date-range analytics
- Gross margin reports
- Category performance
- Supplier performance
- Inventory valuation
- Dead-stock analysis
- Fast-moving/slow-moving products
- Customer lifetime value
- Outstanding credit report
- Export reports to CSV/Excel/PDF

### Phase 6 — Notifications & integrations

- Email invoices
- Low-stock email alerts
- WhatsApp invoice sharing
- SMS notifications
- Payment gateway integration
- Cloud file/image storage
- Scheduled reports
- Webhooks/API integrations

### Phase 7 — Production architecture

- Docker support
- CI/CD with GitHub Actions
- Separate development/staging/production environments
- Centralized secrets management
- Monitoring and alerting
- Structured logs
- Database backup strategy
- API versioning
- Rate limits per endpoint/user
- Caching where useful
- Background job/queue system

### Phase 8 — Multi-store / SaaS direction

If Stockify is eventually turned into a real multi-business product:

- Store/organization model
- Multi-tenant data isolation
- Multiple branches
- Branch-level inventory
- Branch-level users and permissions
- Owner/manager/cashier roles
- Subscription plans
- Usage limits
- Billing/subscription management
- Tenant-level settings
- Audit logs
- Advanced RBAC

## Suggested Long-Term Architecture

A mature version can evolve toward:

**Frontend**
React/Next.js + TypeScript + Tailwind/shadcn-style component system

**Backend**
Node.js + TypeScript + Express or NestJS

**Database**
MongoDB initially, with careful transaction/index design. PostgreSQL could be considered later if the product becomes heavily relational/accounting-focused.

**Infrastructure**
Vercel/Render/Railway + managed MongoDB/PostgreSQL + object storage

**Supporting services**
Email provider + payment gateway + background jobs + monitoring + analytics

The current project does not need to migrate to this architecture immediately. Improvements should be driven by actual requirements.

## Environment Variables

### Backend

The repository expects environment configuration such as:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLIENT_URL`
- `CLIENT_URLS`
- `ADMIN_NAME`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_PHONE`

### Frontend

- `VITE_API_URL`

Secrets should never be committed to GitHub.

## Development

### Backend

```bash
cd backend
npm install
npm run dev
```

Production:

```bash
cd backend
npm install
npm start
```

Admin seed script:

```bash
npm run seed:admin
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Development Rules for Future Changes

This section is intentionally included as a reference for future Stockify development.

1. Always inspect the current repository before changing code.
2. Do not assume an earlier version of a file is still current.
3. Preserve existing working functionality unless the requested change intentionally modifies it.
4. Fix the root cause instead of adding temporary patches when practical.
5. Keep frontend and backend API contracts synchronized.
6. Validate important business rules on the backend; frontend validation is only a UX layer.
7. Never commit secrets, real credentials or private environment files.
8. For database-changing features, consider migration/backfill/data-integrity impact.
9. For billing/inventory changes, protect against stock inconsistencies and duplicate operations.
10. After changes, verify affected files and, where possible, run the relevant build/test checks.
11. Keep commits focused and use clear commit messages.
12. Update this README when a major feature, architecture decision or limitation changes.

## Current Project Philosophy

Stockify should grow from a working retail management application into a reliable production-grade system in small, verifiable steps.

The priority order for future development should generally be:

**Correctness → Security → Data integrity → Core retail workflows → Reporting → Integrations → Scale/SaaS**

---

**Last repository inspection:** 23 September 2026

This README reflects the repository state inspected on the date above. Future changes should update the relevant sections so this document remains a reliable project reference.
