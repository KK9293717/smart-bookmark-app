# Smart Bookmark App

Live URL: https://smart-bookmark-app-eta-six.vercel.app  
GitHub Repo: https://github.com/KK9293717/smart-bookmark-app  

---

## Project Overview

Smart Bookmark App is a simple bookmark manager where users can sign in using Google and manage their personal bookmarks. Each user's bookmarks are private and update in real time.

---

## Features

- Google Sign In using Supabase Authentication
- Add bookmarks (Title + URL)
- Delete bookmarks
- Bookmarks are private per user
- Real-time updates using Supabase Realtime
- Fully deployed on Vercel

---

## Tech Stack

- Next.js (App Router)
- Supabase (Authentication, Database, Realtime)
- Tailwind CSS
- Vercel (Deployment)

---

## Challenges Faced and How I Solved Them

### 1. OAuth redirecting to localhost instead of Vercel

**Problem:**  
After deployment, Google login redirected to localhost instead of the live URL.

**Solution:**  
Updated Supabase settings:

Authentication → URL Configuration

Set:

Site URL:
```
https://smart-bookmark-app-eta-six.vercel.app
```

Added Redirect URLs:

```
https://smart-bookmark-app-eta-six.vercel.app
http://localhost:3000
```

---

### 2. Environment variables not working after deployment

**Problem:**  
Supabase authentication failed in production.

**Solution:**  
Added environment variables in Vercel:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Then redeployed the project.

---

### 3. Multiple Vercel URLs confusion

**Problem:**  
Vercel generated multiple deployment URLs.

**Solution:**  
Used the stable production URL:

```
https://smart-bookmark-app-eta-six.vercel.app
```

Preview URLs are temporary and not required to share.

---

### 4. Supabase connection errors

**Problem:**  
Supabase authentication initially failed due to incorrect URL configuration.

**Solution:**  
Copied correct Supabase Project URL and API keys from Supabase Dashboard and configured them properly.

---

## What I Learned

- OAuth authentication with Supabase
- Next.js deployment on Vercel
- Environment variable management
- Production debugging
- Full-stack deployment workflow

---

## How to Run Locally

```bash
git clone https://github.com/KK9293717/smart-bookmark-app
cd smart-bookmark-app
npm install
npm run dev
```

---

## Final Result

The app is fully deployed and working:

https://smart-bookmark-app-eta-six.vercel.app
