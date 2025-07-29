# Deployment Guide for Render

## Prerequisites
- Node.js 18+ installed
- Git repository connected to Render
- NASA API key (optional, demo key will be used if not provided)

## Render Deployment Steps

### 1. Connect Repository
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Web Service"
3. Connect your GitHub/GitLab repository
4. Select the repository containing this backend

### 2. Configure Build Settings
- **Name**: `nasa-data-explorer-backend`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 3. Environment Variables
Set these environment variables in Render dashboard:

| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Environment mode |
| `PORT` | `10000` | Port for the application |
| `NASA_API_KEY` | `your-api-key` | NASA API key (optional) |
| `NASA_API_BASE_URL` | `https://api.nasa.gov` | NASA API base URL |
| `CORS_ORIGIN` | `https://your-frontend-url.onrender.com` | Frontend URL for CORS |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limiting window (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |
| `CACHE_ENABLED` | `true` | Enable caching |
| `CACHE_DEFAULT_TTL` | `300000` | Cache TTL (5 min) |
| `LOG_LEVEL` | `info` | Logging level |
| `LOG_REQUESTS` | `true` | Enable request logging |

### 4. Deploy
1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Wait for the build to complete (usually 2-5 minutes)

### 5. Verify Deployment
- Check the deployment logs for any errors
- Test the health endpoint: `https://your-app-name.onrender.com/health`
- Test the API documentation: `https://your-app-name.onrender.com/docs`

## Troubleshooting

### Shell Script Errors
If you encounter shell script syntax errors:
1. Make sure the `build.sh` file has Unix line endings (LF, not CRLF)
2. Verify the build command is correct: `npm install && npm run build`
3. Check that all dependencies are properly listed in `package.json`

### Build Failures
1. Check the build logs in Render dashboard
2. Ensure all TypeScript errors are resolved locally
3. Verify that `npm run build` works locally
4. Check that all required environment variables are set

### Runtime Errors
1. Check the application logs in Render dashboard
2. Verify the start command: `npm start`
3. Ensure the `dist/` directory exists and contains compiled files
4. Check that the PORT environment variable is set correctly

## API Endpoints
Once deployed, your API will be available at:
- **Health Check**: `GET /health`
- **API Documentation**: `GET /docs`
- **APOD**: `GET /api/apod`
- **Mars Rovers**: `GET /api/mars-rovers`
- **EPIC**: `GET /api/epic`
- **NEO**: `GET /api/neo`
- **Image Search**: `GET /api/image-search`

## Support
If you encounter issues:
1. Check the Render documentation
2. Review the application logs
3. Test the API endpoints locally first
4. Ensure all environment variables are properly configured 