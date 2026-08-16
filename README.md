# Blog Portfolio

A modern full-stack personal portfolio website with an integrated blog platform, contact form, and Firebase authentication.

The project is built to showcase my profile, projects, skills, and technical experience while also allowing an admin to create and publish blog posts.

## 🚀 Live Demo

https://frontend-rho-ivory-92.vercel.app/login

## ✨ Features

### Portfolio
- Minimal and responsive portfolio design
- Hero section with profile information
- About/profile presentation
- Skills and projects sections
- Resume download
- Responsive navigation

### Blog
- Display blog posts dynamically from MongoDB
- Admin-only blog creation access
- Create blog posts with:
  - Title
  - Image URL
  - Short description
  - Blog content
- Blog posts are stored in MongoDB Atlas
- Dynamic blog rendering on the frontend

### Authentication
- Firebase Authentication
- User signup and login
- Confirm password validation
- Password visibility toggle
- Login error handling
- Logout functionality
- Protected routes
- Admin access based on Firebase UID

### Contact
- Contact form with field validation
- Send contact details to the backend using Axios
- Store submitted messages in MongoDB Atlas

### User Experience
- Responsive design
- Minimalist UI
- Clean typography
- Conditional rendering
- Loading and error handling
- Mobile-friendly navigation

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios
- Firebase Authentication
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

### Database & Services
- MongoDB Atlas
- Firebase Authentication
- Vercel

## 📁 Project Structure

```text
BLOG-PORTFOLIO/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── Blog.js
│   │   └── Contact.js
│   │
│   ├── routes/
│   │   ├── blogRoutes.js
│   │   └── contactRoute.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── firebase/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md