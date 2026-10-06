# Deployment Guide — GitHub + Render + Vercel

This project is a monorepo with:

- `backend/` — Node.js + Express API, deployed to Render
- `frontend/` — React + Vite application, deployed to Vercel
- MongoDB Atlas — production database

## 1. Push the project to GitHub

Create an empty GitHub repository, then from the project root run:

```bash
git init
git add .
git commit -m "Initial capstone project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Never commit `.env` files or production secrets.

## 2. Create MongoDB Atlas

Create a MongoDB Atlas cluster, database user, and network access rule. Copy the Atlas connection string and use it as `MONGO_URI` on Render.

Example format:

```text
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/baas_mvp?retryWrites=true&w=majority
```

## 3. Deploy the backend to Render

In Render:

1. Create a new **Web Service**.
2. Connect the GitHub repository.
3. Set **Root Directory** to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add the environment variables listed below.

### Render environment variables

```text
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<long random secret>
JWT_EXPIRES_IN=1d
CLIENT_URL=https://YOUR-FRONTEND.vercel.app
PUBLIC_API_URL=https://YOUR-BACKEND.onrender.com
UPLOAD_DIR=uploads
```

Render can automatically redeploy the service whenever the connected branch receives a new commit.

## 4. Deploy the frontend to Vercel

In Vercel:

1. Import the same GitHub repository.
2. Set **Root Directory** to `frontend`.
3. Framework preset: Vite (normally detected automatically).
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add these environment variables:

```text
VITE_API_URL=https://YOUR-BACKEND.onrender.com/api/v1
VITE_API_DOCS_URL=https://YOUR-BACKEND.onrender.com/docs
```

Deploy the project.

## 5. Finish CORS configuration

After Vercel gives you its production URL, update Render's `CLIENT_URL` to that exact URL. For example:

```text
CLIENT_URL=https://baas-capstone.vercel.app
```

If you also need a local development origin, multiple origins can be comma-separated:

```text
CLIENT_URL=http://localhost:5173,https://baas-capstone.vercel.app
```

Redeploy the Render service after changing the variable.

## 6. Verify the deployment

Backend health check:

```text
https://YOUR-BACKEND.onrender.com/api/v1/health
```

Swagger documentation:

```text
https://YOUR-BACKEND.onrender.com/docs
```

Frontend:

```text
https://YOUR-FRONTEND.vercel.app
```

Test this flow:

1. Register a user.
2. Log in.
3. Create a project.
4. Create a collection.
5. Create a JSON record.
6. Read the record through the API key endpoint.
7. Confirm Swagger opens.

## 7. Important file-upload note

The current implementation stores uploaded files in `UPLOAD_DIR` on the backend filesystem. Render's default filesystem is ephemeral, so uploaded files can disappear after a deploy or restart.

For a school/demo deployment this is acceptable if file persistence is not being graded. For production persistence, move file storage to object storage such as Cloudinary, Amazon S3, or another durable object-storage provider. Alternatively, attach a Render persistent disk where appropriate.

## 8. GitHub workflow for the two-person team

Use one `main` branch for production and feature branches for development:

```bash
git checkout -b feature/auth-ui
git add .
git commit -m "Add authentication UI"
git push -u origin feature/auth-ui
```

Open a Pull Request on GitHub, review it with your teammate, then merge into `main`.

Once merged, Render and Vercel can automatically deploy the new commit.
