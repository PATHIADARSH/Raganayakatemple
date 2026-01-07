# Implementation Guide - Ranganayaka Temple Website

## Quick Start for Developers

This file contains all the source code templates needed to complete the project.

## Folder Structure to Create

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProtectedRoute.jsx
│   └── AudioPlayer.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Gallery.jsx
│   ├── Events.jsx
│   ├── Contact.jsx
│   ├── AdminLogin.jsx
│   └── AdminDashboard.jsx
├── utils/
│   ├── supabase.js
│   ├── auth.js
│   └── constants.js
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx

public/
├── assets/
│   ├── audio/
│   │   └── devotional-audio.mp3
│   └── images/
│       └── lord-ranganayaka.jpg
index.html
postcss.config.js
```

## Key Files - Complete Code Templates

### 1. src/utils/supabase.js

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase credentials not configured');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 2. src/utils/auth.js

```javascript
import { supabase } from './supabase';

export const authService = {
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};
```

### 3. src/utils/constants.js

```javascript
export const TEMPLE_NAME = 'Lord Ranganayaka Swamy Temple';
export const TEMPLE_LOCATION = 'Airoli, Maharashtra';
export const TEMPLE_PHONE = '+91-XXXXXXXXXX';
export const TEMPLE_EMAIL = 'contact@ranganayakatemple.in';
export const TEMPLE_ADDRESS = 'Your Temple Address Here';

export const COLORS = {
  primary: '#8B3A3A',
  secondary: '#D4AF37',
  accent: '#FF9933',
  dark: '#1A1A1A',
  light: '#F5F0E8',
};
```

### 4. src/components/ProtectedRoute.jsx

```javascript
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authService } from '../utils/auth';

export const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authService.getCurrentUser();
      setIsAuthenticated(!!user);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/admin" replace />;

  return children;
};
```

### 5. src/App.jsx

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authService } from './utils/auth';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => unsubscribe?.subscription?.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-temple-cream">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
```

### 6. src/main.jsx

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 7. postcss.config.js

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 8. index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ranganayaka Temple | Lord Ranganayaka Swamy</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Inter:wght@300;400;500;600&family=Noto+Serif+Telugu:wght@400;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## Component Implementation Steps

1. **Create Navbar component** - Navigation with links to all pages
2. **Create Footer component** - Temple information and links
3. **Implement Home page** - Hero section with audio, announcements
4. **Implement About page** - Temple history in Telugu & English
5. **Implement Gallery** - Images from Supabase storage
6. **Implement Events** - Fetch from Supabase database
7. **Implement Contact** - Google Maps embed + contact form
8. **Create AdminLogin** - Email/password authentication
9. **Create AdminDashboard** - CRUD for content
10. **Style with Tailwind** - Use custom temple colors

## Database Queries Reference

### Fetch Announcements
```javascript
const { data, error } = await supabase
  .from('announcements')
  .select('*')
  .order('created_at', { ascending: false });
```

### Create Event
```javascript
const { data, error } = await supabase
  .from('events')
  .insert([
    { event_name, event_description, event_date }
  ]);
```

### Upload Image to Storage
```javascript
const { data, error } = await supabase.storage
  .from('gallery-images')
  .upload(`images/${file.name}`, file);
```

## Testing the Site

1. Run `npm run dev` - Start development server
2. Navigate to http://localhost:3000
3. Test public pages (Home, About, Gallery, Events, Contact)
4. Go to /admin to test login
5. Test admin dashboard CRUD operations

## Deployment Checklist

- [ ] All environment variables configured
- [ ] Supabase tables created with proper RLS policies
- [ ] Images uploaded to Supabase storage
- [ ] Admin user created in Supabase Auth
- [ ] Build successful: `npm run build`
- [ ] dist/ folder contains all assets
- [ ] Connected to Vercel/Netlify
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Test site in production

## Common Issues & Solutions

**Issue:** Images not loading
- Solution: Check Supabase storage bucket policies are public

**Issue:** Admin login fails
- Solution: Verify user exists in Supabase Auth, check email format

**Issue:** Announcements not showing
- Solution: Check database table exists and RLS policies allow SELECT

**Issue:** Build fails
- Solution: Clear node_modules and reinstall: `rm -rf node_modules && npm install`
