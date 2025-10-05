# Netlify Deployment Guide

## Quick Deploy

1. **Connect Repository to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Import an existing project"
   - Connect your GitHub/GitLab repository
   - Select the OpenCut repository

2. **Build Configuration**
   The `netlify.toml` file is already configured with:
   - Build command: `cd apps/web && bun install && bun run build`
   - Publish directory: `apps/web/.next`
   - Node version: 20
   - Next.js plugin support

3. **Environment Variables**
   Add these environment variables in Netlify Dashboard > Site Configuration > Environment variables:

   **Required for production:**
   ```
   DATABASE_URL=your_postgresql_connection_string
   BETTER_AUTH_SECRET=generate_secure_secret_here
   BETTER_AUTH_URL=https://your-site.netlify.app
   NEXT_PUBLIC_BETTER_AUTH_URL=https://your-site.netlify.app
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   ```

   **Required for features:**
   ```
   # Freesound API (for sound effects)
   FREESOUND_CLIENT_ID=your_freesound_client_id
   FREESOUND_API_KEY=your_freesound_api_key

   # Cloudflare R2 (for media storage)
   CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
   R2_ACCESS_KEY_ID=your_r2_access_key
   R2_SECRET_ACCESS_KEY=your_r2_secret_key
   R2_BUCKET_NAME=your_bucket_name

   # Modal (for transcription)
   MODAL_TRANSCRIPTION_URL=your_modal_url
   ```

4. **Deploy**
   - Click "Deploy" in Netlify
   - The site will build and deploy automatically
   - Future pushes to your main branch will trigger automatic deployments

## Post-Deployment Steps

1. **Update Domain**
   - Configure your custom domain in Netlify > Site Configuration > Domain management
   - Update the `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` environment variables with your domain

2. **Database Setup**
   - Ensure your PostgreSQL database is accessible from Netlify's servers
   - Run database migrations if needed

3. **Monitor Build Times**
   - Initial builds may take 3-5 minutes
   - Subsequent builds should be faster due to caching

## Troubleshooting

- **Build Failures**: Check the Netlify build logs for specific errors
- **Environment Variables**: Ensure all required variables are set in Netlify dashboard
- **Database Connection**: Verify DATABASE_URL is correct and database is accessible
- **Memory Issues**: The Next.js standalone output mode is configured to optimize memory usage

## Local Testing

Test the production build locally before deploying:
```bash
cd apps/web
bun install
bun run build
bun run start
```

## Notes

- The app uses default/dummy values for missing environment variables during build time to allow the build to complete
- Actual environment variables must be set in Netlify for the app to function properly in production
- Security headers and redirects are configured in `netlify.toml`