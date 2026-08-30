# My API Backend

Modular Express.js backend REST API with MongoDB, JWT Authentication, Google OAuth2, TMDB API Integration, Razorpay Payments, and Video Streaming.

## Project Structure

```
my-api/
│
├── src/
│   ├── config/
│   │   ├── db.js          # Mongoose database connection setup
│   │   └── env.js         # Environment variables configuration
│   │
│   ├── controllers/
│   │   ├── auth.controller.js     # Auth request handlers
│   │   ├── user.controller.js     # User & wishlist request handlers
│   │   ├── discover.controller.js # TMDB discover request handlers
│   │   ├── movie.controller.js    # Movie request handlers
│   │   ├── tv.controller.js       # TV show request handlers
│   │   ├── payment.controller.js  # Razorpay payment handlers
│   │   └── video.controller.js    # Premium video & thumbnail handlers
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── discover.routes.js
│   │   ├── movie.routes.js
│   │   ├── tv.routes.js
│   │   ├── payment.routes.js
│   │   └── video.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js     # Auth business logic & email sending
│   │   ├── user.service.js     # Profile & wishlist business logic
│   │   ├── tmdb.service.js     # TMDB API client with caching & retries
│   │   ├── payment.service.js  # Razorpay logic
│   │   └── video.service.js    # FFmpeg & video streaming logic
│   │
│   ├── models/
│   │   └── user.model.js      # Mongoose User model & Wishlist schema
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js       # JWT & Passport Google OAuth middleware
│   │   ├── error.middleware.js      # Global error handling middleware
│   │   └── validation.middleware.js # Request validator middleware
│   │
│   ├── utils/
│   │   ├── jwt.js        # JWT sign & verify helpers
│   │   ├── password.js   # Bcrypt hash & compare helpers
│   │   └── response.js   # Standard API response helpers
│   │
│   ├── validators/
│   │   ├── auth.validator.js # Auth request validators
│   │   └── user.validator.js # User request validators
│   │
│   ├── app.js       # Express app setup & middleware configuration
│   └── server.js    # Server entry point & DB startup
│
├── tests/
│   ├── auth.test.js # Auth unit tests
│   └── user.test.js # User unit tests
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v24+)
- MongoDB Atlas or local MongoDB instance

### Environment Setup

Copy `.env.example` to `.env` and fill in your configuration:

```bash
cp .env.example .env
```

### Installation

```bash
npm install
```

### Running the Application

- **Development Mode** (with nodemon):
  ```bash
  npm run dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

### Running Tests

```bash
npm test
```

## API Endpoints

- **Health Check**: `GET /test`
- **Auth**: `/api/auth` (`/signup`, `/login`, `/logout`, `/forgetPassword`, `/resetPassword`, `/google`, `/google/callback`)
- **User**: `/api/user` (`/`, `/wishlist`)
- **Discover**: `/api/discover` (`/now-playing`, `/trending`, `/top-rated`, `/upcoming`, `/popular`)
- **Movies**: `/api/movies` (`/action`, `/comedy`, `/horror`, `/romance`, `/anime`, `/details`, `/search`)
- **TV Shows**: `/api/tv` (`/action`, `/comedy`, `/crime`, `/drama`, `/mystery`, `/details`)
- **Premium Videos**: `/api/premium` (`/video`, `/video/stream`, `/video/thumbnail`)
- **Payment**: `/api/payment` (`/order`, `/update-premium-access`)
