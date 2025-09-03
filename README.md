# Node.js E-Commerce API


## Description
A RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB, providing comprehensive features for managing products, orders, and payments.

## Technologies Used
- **Backend Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Input Validation**: Joi
- **File Upload**: Multer
- **Email Service**: Nodemailer
- **Payment Integration**: PayPal API

## Database Schema
![Database Schema](media\DB_Scehma.png)

The database design consists of 5 main collections:
- **Users**: Stores user information and authentication details
- **Products**: Contains product information with category references
- **Categories**: Manages product categories
- **Carts**: Handles shopping cart data for users
- **Orders**: Tracks order details and status

## Project Structure
```
src/
├── DB/            # Database configuration and models
├── modules/       # Feature modules (auth, products, orders etc.)
├── middlewares/   # Express middlewares
├── utils/         # Utility functions
├── validations/   # Input validation schemas
└── Events/        # Event handlers
```

## Key Features
- ✅ User Authentication & Authorization
- 🛍️ Product & Category Management
- 🛒 Shopping Cart Functionality
- 📦 Order Processing
- 💳 PayPal Payment Integration
- 📧 Email Notifications
- 🖼️ Image Upload Support

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/signup` | User registration |
| `POST` | `/auth/login` | User login |
| `GET`  | `/products` | Get all products |
| `POST` | `/products` | Create new product |
| `GET`  | `/category` | Get all categories |
| `POST` | `/orders` | Create new order |
| `GET`  | `/cart` | Get user cart |

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/AhmedMohamedomar74/ITI-NodeJS-Ecommerce.git
```

2. Install dependencies:
```bash
npm install
```

3. Create `config/dev.env` file with:
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```

4. Start the server:
```bash
npm run start:dev
```
