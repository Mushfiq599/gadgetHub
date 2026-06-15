# GadgetHub 🎧

A modern full-stack tech gadget showcase platform built with Next.js 15 App Router and Firebase Authentication. GadgetHub features a role-based system with separate experiences for admins and regular users, a fully functional shopping cart, order history, and a polished dark-theme UI.

---

## 🚀 Live Demo

[https://gadgethub.vercel.app](https://gadgethub.vercel.app)

## 📁 GitHub Repository

[https://github.com/yourusername/gadgethub](https://github.com/yourusername/gadgethub)

---

## ✨ Features

### General
- Responsive dark-theme UI across all screen sizes
- Animated hero slider with 5 slides (content + product categories)
- Scrolling product ticker marquee
- Scroll-triggered animations on all sections
- Animated counters, card hover effects, shimmer text

### Authentication
- Firebase Email/Password login and registration
- Google Sign-In (OAuth)
- Auth state persisted via Context API
- Role-based access (Admin vs User) derived from email

### Admin Role
- Add new gadgets to the catalogue (title, brand, category, descriptions, price, rating, image)
- Manage all gadgets in a responsive table with View and Delete actions
- Admin badge shown in navbar dropdown

### User Role
- Browse 30+ curated gadgets with search, category filter, sort, and pagination (12 per page)
- View full gadget detail page with specs, related items
- Add to cart with quantity selector
- Buy Now shortcut
- Cart page with quantity controls, order summary, shipping and tax calculation
- Place orders saved to localStorage
- Full order history with expandable order details

### Demo Credentials
| Role  | Email                      | Password   |
|-------|----------------------------|------------|
| Admin | demo.admin@gadgethub.com   | admin123   |
| User  | demo.user@gadgethub.com    | user1234   |

---

## 🛠 Tech Stack

| Technology        | Purpose                        |
|-------------------|-------------------------------|
| Next.js 15        | App Router, SSR, routing       |
| React 19          | UI components                  |
| Tailwind CSS v4   | Styling and layout             |
| Firebase Auth     | Authentication                 |
| React Context API | Auth state + Cart state        |
| localStorage      | Gadget data, cart, orders      |
| react-hot-toast   | Toast notifications            |
| lucide-react      | Icons                          |
| react-icons       | Social and additional icons    |

---

## 📦 Getting Started

### Prerequisites
- Node.js 18 or higher
- A Firebase project with Authentication enabled

### Installation

1. Clone the repository
```bash
   git clone https://github.com/yourusername/gadgethub.git
   cd gadgethub
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env.local` file in the root directory
```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Set up Firebase
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Enable **Email/Password** sign-in method
   - Enable **Google** sign-in method
   - Create these two demo users manually under Authentication → Users:
     - `demo.admin@gadgethub.com` / `admin123`
     - `demo.user@gadgethub.com` / `user1234`

5. Run the development server
```bash
   npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

---

## 🗺 Route Summary

| Route              | Access         | Description                              |
|--------------------|----------------|------------------------------------------|
| `/`                | Public         | Landing page with hero slider, 5 sections|
| `/items`           | Public         | Browse all gadgets, search, filter, sort |
| `/items/[id]`      | Public         | Gadget detail page with specs            |
| `/about`           | Public         | About GadgetHub page                     |
| `/login`           | Public         | Login with email/password or Google      |
| `/register`        | Public         | Create a new account                     |
| `/cart`            | User only      | Shopping cart with order summary         |
| `/orders`          | User only      | Order history with expandable details    |
| `/items/add`       | Admin only     | Add a new gadget to the catalogue        |
| `/items/manage`    | Admin only     | View and delete all gadgets              |

---

