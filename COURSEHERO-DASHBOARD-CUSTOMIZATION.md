# 🛠️ KARGANOT Dashboard - Customization Guide

## 🎯 Quick Customization

### 1. Change Brand Colors

#### Primary Color (Blue)
```tsx
// In tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... your custom blue shades
          500: '#3b82f6', // Main blue
          600: '#2563eb',
        }
      }
    }
  }
}
```

#### Accent Color (Orange)
```tsx
// Replace all instances of:
from-orange-400 to-orange-500
// With your color:
from-yourcolor-400 to-yourcolor-500
```

### 2. Change User Information

**File:** `src/components/dashboard/DashboardLayout.tsx`

```tsx
// Replace mock data with real user data
const user = {
  name: 'Your Name',
  email: 'your@email.com',
  avatar: '/path/to/avatar.png',
  isPremium: true // Change to true for premium users
};
```

**With Authentication:**
```tsx
import { useSession } from 'next-auth/react';

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession();
  
  const user = {
    name: session?.user?.name || 'Guest',
    email: session?.user?.email || '',
    avatar: session?.user?.image || '/image/logo.png',
    isPremium: session?.user?.isPremium || false
  };
  
  // ... rest of component
}
```

### 3. Add New Navigation Items

**File:** `src/components/dashboard/DashboardLayout.tsx`

```tsx
import { Home, FileText, HelpCircle, BookOpen, Settings } from 'lucide-react';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'uploads', label: 'My Uploads', icon: FileText },
  { id: 'help', label: 'Homework Help', icon: HelpCircle },
  // Add your new items:
  { id: 'courses', label: 'My Courses', icon: BookOpen },
  { id: 'settings', label: 'Settings', icon: Settings }
];
```

### 4. Customize Sample Questions

**File:** `src/components/dashboard/DashboardContent.tsx`

```tsx
const sampleQuestions = [
  { 
    emoji: '🎨', 
    text: 'Explain color theory in art', 
    category: 'Art' 
  },
  { 
    emoji: '💻', 
    text: 'What is machine learning?', 
    category: 'Computer Science' 
  },
  { 
    emoji: '🌍', 
    text: 'Explain climate change', 
    category: 'Environmental Science' 
  },
  { 
    emoji: '🎵', 
    text: 'What are musical scales?', 
    category: 'Music' 
  }
];
```

### 5. Change Welcome Message

```tsx
// Static message
<h1 className="text-3xl font-bold text-gray-900 mb-2">
  Welcome back, {user.name}! 🎓
</h1>

// Dynamic message based on time
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

<h1 className="text-3xl font-bold text-gray-900 mb-2">
  {getGreeting()}, {user.name}! 👋
</h1>
```

---

## 🔌 API Integration

### Connect AI Question Feature

**File:** `src/components/dashboard/DashboardContent.tsx`

```tsx
const [question, setQuestion] = useState('');
const [loading, setLoading] = useState(false);
const [response, setResponse] = useState('');

const handleAskQuestion = async () => {
  if (!question.trim()) return;
  
  setLoading(true);
  try {
    const res = await fetch('/api/ask-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    
    const data = await res.json();
    setResponse(data.answer);
  } catch (error) {
    console.error('Error asking question:', error);
    alert('Failed to get answer. Please try again.');
  } finally {
    setLoading(false);
  }
};

// Update button
<Button 
  variant="gradient" 
  onClick={handleAskQuestion}
  loading={loading}
  disabled={!question.trim() || loading}
>
  {loading ? 'Thinking...' : 'Ask Question'}
</Button>
```

### Connect File Upload

```tsx
const [uploading, setUploading] = useState(false);

const handleFileUpload = async (file: File) => {
  if (!file) return;
  
  setUploading(true);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', user.id);
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    // Refresh uploads list
    fetchUserUploads();
    
    alert('File uploaded successfully!');
  } catch (error) {
    console.error('Upload error:', error);
    alert('Failed to upload file.');
  } finally {
    setUploading(false);
  }
};

// Add file input
<input
  type="file"
  ref={fileInputRef}
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  }}
  style={{ display: 'none' }}
/>

<Button 
  icon={Upload}
  onClick={() => fileInputRef.current?.click()}
  loading={uploading}
>
  {uploading ? 'Uploading...' : 'Upload Document'}
</Button>
```

### Load Real Uploads

```tsx
const [uploads, setUploads] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchUserUploads();
}, []);

const fetchUserUploads = async () => {
  setLoading(true);
  try {
    const response = await fetch('/api/uploads/my-uploads');
    const data = await response.json();
    setUploads(data.uploads);
  } catch (error) {
    console.error('Error fetching uploads:', error);
  } finally {
    setLoading(false);
  }
};
```

---

## 🌐 Add Turkish Localization

### Option 1: Simple Object

**Create:** `src/locales/tr.ts`

```tsx
export const tr = {
  nav: {
    dashboard: 'Kontrol Paneli',
    uploads: 'Yüklemelerim',
    help: 'Ödev Yardımı'
  },
  dashboard: {
    welcome: 'Tekrar hoş geldin',
    subtitle: 'Bugün ne öğrenmek istersin?',
    askAI: 'Yapay Zekaya Sor',
    placeholder: 'Sorunuzu buraya yazın...',
    attachImage: 'Resim Ekle',
    uploadDoc: 'Belge Yükle',
    askQuestion: 'Soru Sor',
    tryAsking: 'Şunları sorabilirsin:',
    yourUploads: 'Yüklemeleriniz',
    viewAll: 'Tümünü Gör',
    noUploads: 'Henüz yükleme yok',
    uploadNow: 'Şimdi Yükle'
  },
  premium: {
    title: 'Premium Ol',
    description: 'Tüm çalışma materyallerine sınırsız erişim',
    upgrade: 'Yükselt'
  }
};
```

**Use in components:**

```tsx
import { tr } from '@/locales/tr';

export default function DashboardContent() {
  const t = tr.dashboard;
  
  return (
    <div>
      <h1>{t.welcome}, {user.name}! 👋</h1>
      <p>{t.subtitle}</p>
      {/* ... */}
    </div>
  );
}
```

### Option 2: next-intl

**Install:**
```bash
npm install next-intl
```

**Setup:**
```tsx
// src/i18n.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default
}));

// src/messages/en.json
{
  "Dashboard": {
    "welcome": "Welcome back",
    "subtitle": "What would you like to learn today?"
  }
}

// src/messages/tr.json
{
  "Dashboard": {
    "welcome": "Tekrar hoş geldin",
    "subtitle": "Bugün ne öğrenmek istersin?"
  }
}
```

**Use:**
```tsx
import { useTranslations } from 'next-intl';

export default function DashboardContent() {
  const t = useTranslations('Dashboard');
  
  return (
    <h1>{t('welcome')}, {user.name}! 👋</h1>
  );
}
```

---

## 🎨 Theme Customization

### Add Dark Mode

**Create:** `src/contexts/ThemeContext.tsx`

```tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {}
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) setTheme(stored);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

**Update Layout:**
```tsx
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      {/* Add theme toggle button */}
      <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      {/* ... rest of layout */}
    </div>
  );
}
```

**Update Tailwind:**
```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Add dark mode colors
      }
    }
  }
}
```

**Update styles:**
```tsx
// Change classes to support dark mode
<div className="bg-white dark:bg-gray-900">
<p className="text-gray-900 dark:text-gray-100">
<button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
```

---

## 📊 Add Analytics

### Google Analytics

**Install:**
```bash
npm install @next/third-parties
```

**Add to layout:**
```tsx
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
```

### Track Events

```tsx
// Track button clicks
const trackEvent = (action: string, category: string, label: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
};

// Usage
<Button 
  onClick={() => {
    handleAskQuestion();
    trackEvent('click', 'AI Question', question);
  }}
>
  Ask Question
</Button>
```

---

## 🔐 Add Authentication Guards

**Create:** `src/middleware.ts`

```tsx
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/course-hero-dashboard/:path*']
};
```

**Or with component:**
```tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}
```

---

## 🚀 Performance Optimization

### 1. Code Splitting

```tsx
import dynamic from 'next/dynamic';

// Lazy load heavy components
const DashboardContent = dynamic(() => import('@/components/dashboard/DashboardContent'), {
  loading: () => <div>Loading...</div>
});
```

### 2. Image Optimization

```tsx
import Image from 'next/image';

// Replace img tags with Next Image
<Image 
  src={user.avatar} 
  alt={user.name}
  width={48}
  height={48}
  className="rounded-full"
/>
```

### 3. Memoization

```tsx
import { memo, useMemo } from 'react';

// Memoize expensive components
const UploadCard = memo(({ upload }) => {
  return (
    <div className="card">
      {/* ... */}
    </div>
  );
});

// Memoize expensive calculations
const filteredUploads = useMemo(() => {
  return uploads.filter(u => u.isActive);
}, [uploads]);
```

---

## 📱 Progressive Web App (PWA)

**Install:**
```bash
npm install next-pwa
```

**Configure:**
```js
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true
});

module.exports = withPWA({
  // ... your next config
});
```

**Add manifest:**
```json
// public/manifest.json
{
  "name": "KARGANOT",
  "short_name": "KARGANOT",
  "description": "Educational platform for students",
  "start_url": "/course-hero-dashboard",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

---

## 🎯 Ready to Deploy!

Your dashboard is now fully customizable and ready for:
- ✅ Real authentication
- ✅ API integration
- ✅ Localization
- ✅ Dark mode
- ✅ Analytics
- ✅ Performance optimization
- ✅ PWA support

**Happy coding! 🚀**
