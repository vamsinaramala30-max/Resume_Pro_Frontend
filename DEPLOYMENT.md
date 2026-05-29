# Deployment Guide

This guide explains how to deploy the Resume Pro application to production using **Render** for the backend and **Vercel** for the frontend.

## 1. Backend Deployment (Render)
The backend must be deployed first so you can get the production URL for the frontend.

1. **Push your code**: Commit and push the `Resume_Pro-Backend` directory to a GitHub repository.
2. **Create Render Service**: Log into [Render.com](https://render.com) and click **New > Web Service**.
3. **Connect Repository**: Connect your GitHub repository.
4. **Configuration**: Render will automatically detect the `render.yaml` file in the repository root and configure the Node.js environment automatically.
5. **Set Secrets**: Go to the **Environment** tab of your new service and set the following variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure, random string (e.g., generate one with `openssl rand -hex 32`).
   - `FRONTEND_URL`: `https://vamsinaramala30-max-startfixvk.vercel.app`
   - `NODE_ENV`: `production`
6. **Deploy**: Click Deploy. Once it finishes, copy the public URL (e.g., `https://resume-pro-backend.onrender.com`).

## 2. Frontend Deployment (Vercel)
The frontend connects to the backend using an environment variable.

1. **Go to Vercel**: Log into [Vercel.com](https://vercel.com) and select your project (`vamsinaramala30-max-startfixvk`).
2. **Settings**: Go to **Settings > Environment Variables**.
3. **Add Variable**:
   - **Key**: `VITE_API_BASE`
   - **Value**: `https://<YOUR-RENDER-URL>/api` *(Make sure to include `/api` at the end)*
4. **Redeploy**: Go to the **Deployments** tab and click **Redeploy** on your latest build.
5. **Verify**: Vercel will bake the `VITE_API_BASE` into the production build. Port-scanning is disabled in production, so it will securely route to your new Render backend.

## 3. Verify System
1. Go to your frontend URL.
2. Attempt to register an account.
3. Refresh the page to verify the session persists (JWT token in LocalStorage).
4. Monitor the Render logs for the `/api/auth/register` and `/api/auth/login` requests.
