# Ranganayaka Temple Website

**A production-ready temple website with admin panel for Lord Ranganayaka Swamy**

Built with React + Vite, Tailwind CSS, and Supabase. Fully responsive, with bilingual (Telugu/English) support and secure admin authentication.

---

## Features

✨ **Public Pages:**
- Home page with hero section, devotional audio, and announcements
- About page with temple history (Telugu + English)
- Image gallery with dynamic loading
- Upcoming events and festivals listing
- Contact information with Google Maps embed

🔐 **Admin Panel:**
- Secure email/password authentication
- Create/edit/delete announcements
- Upload and manage gallery images
- Event management system
- Protected admin dashboard

🎨 **Design:**
- Devotional color theme (maroon, gold, saffron)
- Fully responsive (mobile, tablet, desktop)
- Accessible components
- Fast load times (Vite)

📱 **Tech Stack:**
- Frontend: React 18.2 + Vite
- Styling: Tailwind CSS
- Backend: Supabase (Auth, Database, Storage)
- Deployment: Vercel / Netlify ready

---

## Project Structure

```
raganayaka-temple/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Gallery.jsx
│   │   ├── Events.jsx
│   │   ├── Contact.jsx
│   │   ├── AdminLogin.jsx
│   │   └── AdminDashboard.jsx
│   ├── utils/               # Utility functions
│   │   ├── supabase.js
│   │   ├── auth.js
│   │   └── constants.js
│   ├── styles/              # Global styles
│   ├── App.jsx
│   └── main.jsx
├── public/
│   ├── assets/
│   │   ├── audio/          # Devotional audio files
│   │   └── images/         # Static images
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .env.example
├── .gitignore
└── README.md
```

---

## Local Setup

### Prerequisites
- Node.js 16+ and npm/yarn
- Supabase account (https://supabase.io)
- Modern web browser

### Step 1: Clone Repository
```bash
git clone https://github.com/PATHIADARSH/Raganayakatemple.git
cd Raganayakatemple
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

To get these values:
1. Create a Supabase project at https://supabase.io
2. Go to Project Settings > API
3. Copy `Project URL` and `anon public key`

### Step 4: Set Up Supabase Database

#### Create Tables

**Announcements Table:**
```sql
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  language VARCHAR(20) DEFAULT 'mixed',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Events Table:**
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name VARCHAR(255) NOT NULL,
  event_description TEXT,
  event_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Gallery Table:**
```sql
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url VARCHAR(500) NOT NULL,
  title VARCHAR(255),
  uploaded_at TIMESTAMP DEFAULT NOW()
);
```

#### Create Storage Buckets

In Supabase Storage, create two public buckets:
1. `gallery-images` - for temple gallery photos
2. `announcements-files` - for announcement files (optional)

#### Set Up Authentication

1. Go to Authentication > Providers
2. Enable Email/Password provider
3. Configure email templates if needed

#### Create Admin User

1. Go to Authentication > Users
2. Click "Create new user" or use signup in your app
3. Use admin email for authentication

### Step 5: Run Development Server
```bash
npm run dev
```

Server starts at `http://localhost:3000`

### Step 6: Build for Production
```bash
npm run build
```

This creates a `dist/` folder ready for deployment.

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project" > select your GitHub repository
4. Add environment variables in project settings:
   ```
   VITE_SUPABASE_URL=your-url
   VITE_SUPABASE_ANON_KEY=your-key
   ```
5. Deploy!

### Deploy to Netlify

1. Push code to GitHub
2. Go to https://netlify.com
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Add environment variables
8. Deploy!

### Custom Domain Setup

For `.in` domain (e.g., `ranganayakatemple.in`):

1. **Register domain:** Use registrars like GoDaddy, Namecheap, or Domains.com
2. **Point DNS to Vercel/Netlify:**
   - Get DNS records from your hosting provider
   - Update domain registrar's DNS settings
   - Add `CNAME` or `A` records
3. **Enable HTTPS:** Auto-configured by Vercel/Netlify
4. **Verify:** Check with `nslookup` or `dig` commands

---

## Usage

### Admin Login
1. Navigate to `/admin`
2. Login with your Supabase credentials
3. Access the admin dashboard

### Managing Content

**Announcements:**
- Create, edit, or delete announcements
- Support for Telugu and English
- Stored in `announcements` table

**Gallery:**
- Upload temple images
- Images stored in Supabase Storage (`gallery-images` bucket)
- Auto-fetch and display on gallery page

**Events:**
- Add upcoming festivals and poojas
- Set event dates
- Manage event descriptions

---

## Database Schema

### Announcements
| Column | Type | Details |
|--------|------|----------|
| id | UUID | Primary key |
| title | VARCHAR(255) | Announcement title |
| description | TEXT | Full announcement text |
| language | VARCHAR(20) | 'telugu', 'english', 'mixed' |
| created_at | TIMESTAMP | Auto-set |
| updated_at | TIMESTAMP | Auto-update |

### Events
| Column | Type | Details |
|--------|------|----------|
| id | UUID | Primary key |
| event_name | VARCHAR(255) | Event title |
| event_description | TEXT | Event details |
| event_date | DATE | Date of event |
| created_at | TIMESTAMP | Auto-set |
| updated_at | TIMESTAMP | Auto-update |

### Gallery
| Column | Type | Details |
|--------|------|----------|
| id | UUID | Primary key |
| image_url | VARCHAR(500) | Supabase storage URL |
| title | VARCHAR(255) | Image title |
| uploaded_at | TIMESTAMP | Auto-set |

---

## Security Best Practices

✅ **Implemented:**
- Environment variables for sensitive data
- Protected admin routes (ProtectedRoute component)
- Supabase Row-Level Security (RLS) enabled
- CORS properly configured
- No hardcoded credentials

✅ **Recommendations:**
- Enable RLS on all tables for admin-only access
- Regularly update dependencies: `npm outdated`
- Monitor Supabase audit logs
- Backup database regularly
- Use strong admin passwords

---

## Customization

### Change Temple Name
Update in `src/constants.js`:
```javascript
export const TEMPLE_NAME = 'Lord Ranganayaka Swamy Temple';
export const TEMPLE_LOCATION = 'Airoli, Maharashtra';
```

### Modify Color Scheme
Edit `tailwind.config.js`:
```javascript
const colors = {
  'temple-red': '#8B3A3A',
  'temple-gold': '#D4AF37',
  // Add more colors
};
```

### Add More Pages
1. Create new component in `src/pages/`
2. Add route in `App.jsx`
3. Update navigation in `Navbar.jsx`

### Configure Devotional Audio
1. Add audio file to `/public/assets/audio/`
2. Update audio path in `Home.jsx`
3. Configure autoplay behavior in `AudioPlayer.jsx`

---

## Troubleshooting

### Issue: "Connection refused" on startup
**Solution:** Ensure Supabase URL and keys are correct in `.env.local`

### Issue: "Gallery images not loading"
**Solution:** 
- Check bucket exists: `gallery-images`
- Verify bucket is public (Storage > Policies)
- Ensure image URLs are correct

### Issue: "Admin login not working"
**Solution:**
- Verify user exists in Supabase Auth
- Check RLS policies allow admin access
- Review browser console for errors

### Issue: "Build fails"
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Performance Optimization

- **Image Optimization:** Use Next.js Image or Cloudinary
- **Caching:** Configure Vercel/Netlify caching headers
- **Code Splitting:** Vite handles this automatically
- **Lazy Loading:** Use React.lazy() for non-critical components
- **Bundle Analysis:** `npm run build` shows bundle size

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and commit: `git commit -m 'Add feature'`
4. Push: `git push origin feature-name`
5. Create Pull Request

---

## License

MIT License - Free for personal and commercial use

---

## Support & Community

- **Issues:** GitHub Issues
- **Discussions:** GitHub Discussions
- **Contact:** Contact page on website

---

## Roadmap

- [ ] Online donation system
- [ ] Prayer request management
- [ ] Priest availability booking
- [ ] Priest names and details
- [ ] Puja packages and prices
- [ ] Mobile app (React Native)
- [ ] Multi-language support (Hindi, Kannada)
- [ ] Email notifications
- [ ] SMS alerts for events

---

**Made with devotion for Lord Ranganayaka Swamy** 🙏
