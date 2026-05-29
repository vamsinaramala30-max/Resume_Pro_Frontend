# Environment Variables Configuration

This document lists all the environment variables required to run the Resume Pro application in development and production.

## Backend Variables (`Resume_Pro-Backend/.env.local` or Render Dashboard)

These variables must be set securely on your backend hosting provider (e.g., Render) and in your local `.env.local` file.

| Variable | Description | Example / Default | Required in Production |
|----------|-------------|-------------------|------------------------|
| `NODE_ENV` | Sets the application environment. Controls CORS strictness and logging. | `production` or `development` | Yes |
| `PORT` | The port the Express server listens on. Render provides this automatically. | `5000` | No (Managed by host) |
| `MONGO_URI` | The connection string to your MongoDB database (e.g., MongoDB Atlas). | `mongodb+srv://...` | Yes |
| `JWT_SECRET` | A highly secure, random cryptographic string used to sign user tokens. | `your-secret-key-here` | Yes |
| `FRONTEND_URL` | Used by CORS to explicitly allow requests from the deployed frontend. | `https://vamsinaramala30-max-startfixvk.vercel.app` | Yes |
| `JSON_LIMIT` | Controls the maximum payload size for incoming JSON requests. | `1mb` | No |
| `RATE_LIMIT_MAX` | How many requests an IP can make per 15 minutes. | `200` | No |

## Frontend Variables (`Resume_Pro_Frontend/.env.local` or Vercel Dashboard)

These variables must be set in your Vercel Project Settings.

| Variable | Description | Example / Default | Required in Production |
|----------|-------------|-------------------|------------------------|
| `VITE_API_BASE` | The exact URL pointing to your deployed backend API endpoints. | `https://resume-pro-backend.onrender.com/api` | Yes |

> **Warning:** Do NOT put trailing slashes at the end of `VITE_API_BASE`. It should end with `/api`.
