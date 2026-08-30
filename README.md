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

## Docker & CI/CD Deployment to AWS EC2

### Docker Local Usage

To build and run the Docker image locally:

```bash
docker build -t strew-backend .
docker run -p 8080:8080 --env-file .env strew-backend
```

### GitHub Actions CI/CD Setup

The workflow in `.github/workflows/deploy.yml` automatically triggers on `push` to `main` / `master` branches:
1. **Build & Test Check**: Installs dependencies and runs unit tests (`npm test`).
2. **SCP Code Transfer**: Uses `appleboy/scp-action` to securely copy files to the AWS EC2 instance.
3. **SSH Remote Build & Deploy**: Uses `appleboy/ssh-action` to generate `.env` from GitHub Secrets, build the Docker container image, and start the app container (`docker run -d --name strew-backend -p 8080:8080 ...`).

#### Required GitHub Repository Secrets

Configure the following secrets in your GitHub repository (**Settings > Secrets and variables > Actions**):

- `EC2_HOST`: Public IP address or DNS of your AWS EC2 instance.
- `EC2_USERNAME`: SSH username (e.g. `ubuntu` or `ec2-user`).
- `EC2_SSH_KEY`: Private SSH Key (`.pem` contents) for EC2 access.
- `DB_USER`, `DB_PASSWORD`, `DB_LINK`
- `SECRECT_KEY`, `FRONT_END_URL`
- `TMDB_API_KEY`
- `RAZORPAY_PUBLIC_KEY`, `RAZORPAY_PRIVATE_KEY`
- `GOOGLE_APP_USER`, `GOOGLE_APP_PASSWORD`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`

