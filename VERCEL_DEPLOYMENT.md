# Vercel Deployment Guide

This guide will help you deploy your Employee Management System to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your Firebase project credentials

## Step 1: Prepare Your Repository

1. Make sure all your code is committed and pushed to GitHub/GitLab/Bitbucket
2. Ensure `.env.local` is in your `.gitignore` (it should be already)

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your Git repository
4. Vercel will auto-detect Next.js settings
5. **Important**: Before clicking "Deploy", add your environment variables:

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts and add environment variables when asked

## Step 3: Add Environment Variables in Vercel

1. Go to your project dashboard on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables (one by one):

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDKqfTvoC45axxB91d35VV_hrP1rC7cNW4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=employee-management-ems.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=employee-management-ems
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=employee-management-ems.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1020974823194
NEXT_PUBLIC_FIREBASE_APP_ID=1:1020974823194:web:69ddd06705315604e6dea3
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-S76YNY4W9D
```

4. Make sure to select **Production**, **Preview**, and **Development** environments
5. Click **Save**

## Step 4: Configure Firebase for Production

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Add your Vercel domain (e.g., `your-project.vercel.app`)
5. If you have a custom domain, add that too

## Step 5: Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger a new deployment

## Step 6: Verify Deployment

1. Visit your Vercel deployment URL
2. Test the login/signup functionality
3. Verify Firebase connection is working
4. Check browser console for any errors

## Troubleshooting

### Common Issues:

1. **"Missing Firebase configuration" error**
   - Make sure all environment variables are set in Vercel
   - Redeploy after adding variables

2. **Authentication not working**
   - Check Firebase Authorized domains
   - Verify API keys are correct

3. **Build errors**
   - Check Vercel build logs
   - Ensure all dependencies are in `package.json`

## Additional Notes

- Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Never commit `.env.local` to version control
- Use `.env.example` as a template for other developers
- Vercel automatically rebuilds on every push to your main branch

## Support

For more help, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Firebase Setup](https://firebase.google.com/docs/web/setup)

