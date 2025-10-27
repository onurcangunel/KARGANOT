# 📚 KARGANOT CourseHero-Style Dashboard

A modern, responsive educational platform dashboard inspired by CourseHero's clean and intuitive design.

## 🎨 Features

### Layout Components
- **Responsive Navigation Bar**
  - Logo and branding
  - Notification bell with badge indicator
  - Premium upgrade button
  - User profile dropdown menu
  - Mobile hamburger menu

- **Sidebar Navigation**
  - User profile card with avatar
  - Quick access menu (Dashboard, My Uploads, Homework Help)
  - Premium upgrade CTA card
  - Responsive mobile drawer

- **Main Content Area**
  - Welcome header with personalized greeting
  - AI-powered question input box
  - Image and document upload buttons
  - Sample question suggestions (pills)
  - User uploads grid with cards
  - Footer with policy links

## 🚀 Tech Stack

- **React 18** with TypeScript
- **Next.js 14** (App Router)
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

## 📁 File Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── DashboardLayout.tsx    # Main layout with nav & sidebar
│   │   └── DashboardContent.tsx   # Dashboard content components
│   └── ui/
│       ├── Card.tsx               # Reusable card component
│       └── Button.tsx             # Reusable button component
└── app/
    └── course-hero-dashboard/
        └── page.tsx               # Main dashboard page
```

## 🎯 Usage

### Accessing the Dashboard

Navigate to `/course-hero-dashboard` to view the new CourseHero-style dashboard.

```bash
npm run dev
# Open http://localhost:3000/course-hero-dashboard
```

### Component Structure

#### DashboardLayout
Main layout wrapper that provides:
- Top navigation bar
- Left sidebar (desktop) / Mobile drawer
- Content area wrapper

```tsx
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function MyPage() {
  return (
    <DashboardLayout>
      {/* Your content here */}
    </DashboardLayout>
  );
}
```

#### DashboardContent
Main content area with:
- AI question input
- Sample questions
- Upload cards grid
- Footer links

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6 to #9333EA gradient)
- **Accent**: Orange (#FB923C to #FB7185)
- **Background**: Light gray (#F9FAFB)
- **Cards**: White with subtle shadows

### Typography
- **Headings**: Bold, Gray-900
- **Body**: Regular, Gray-700
- **Subtle**: Gray-500

### Spacing
- **Cards**: Rounded-xl (12px)
- **Padding**: 6 units (1.5rem)
- **Gaps**: 3-6 units

## ✨ Animations

All animations use Framer Motion:
- **Stagger children**: Sequential entrance
- **Hover effects**: Scale up (1.05x)
- **Tap effects**: Scale down (0.95x)
- **Sidebar**: Slide in/out
- **Dropdowns**: Fade in/out

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (Single column, hamburger menu)
- **Tablet**: 640px - 1024px (Adjusted padding, collapsed sidebar)
- **Desktop**: > 1024px (Full layout with sidebar)

## 🔧 Customization

### Change User Info
Edit the `user` object in `DashboardLayout.tsx`:

```tsx
const user = {
  name: 'Your Name',
  email: 'your@email.com',
  avatar: '/path/to/avatar.png',
  isPremium: false
};
```

### Add Navigation Items
Modify the `navigationItems` array:

```tsx
const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'custom', label: 'My Custom Page', icon: YourIcon },
  // Add more items...
];
```

### Customize Sample Questions
Edit the `sampleQuestions` array in `DashboardContent.tsx`:

```tsx
const sampleQuestions = [
  { emoji: '🎯', text: 'Your question here', category: 'Your Category' },
  // Add more questions...
];
```

## 🎨 Color Customization

The dashboard uses Tailwind's color system. To customize:

1. **Primary gradient**: Change `from-blue-500 to-purple-600`
2. **Accent gradient**: Change `from-orange-400 to-orange-500`
3. **Background**: Change `bg-gray-50`

## 🔐 Integration Points

### Authentication
Replace mock user data with real authentication:

```tsx
import { useSession } from 'next-auth/react';

const { data: session } = useSession();
const user = session?.user;
```

### API Integration
Connect to your backend:

```tsx
const handleAskQuestion = async () => {
  const response = await fetch('/api/questions', {
    method: 'POST',
    body: JSON.stringify({ question }),
  });
  // Handle response...
};
```

### File Upload
Implement file upload functionality:

```tsx
const handleFileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  // Handle response...
};
```

## 🌐 Localization

To add Turkish translations:

1. Install `next-intl` or similar
2. Create translation files
3. Wrap components with locale provider
4. Replace hardcoded text with translation keys

Example:
```tsx
import { useTranslations } from 'next-intl';

const t = useTranslations('Dashboard');
<h1>{t('welcome')}</h1>
```

## 🚀 Deployment

The dashboard is ready for deployment:

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## 📝 License

This component is part of the KARGANOT educational platform.

## 🤝 Contributing

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Built with ❤️ for KARGANOT**
