# 🎬 MovieMaster Pro

**MovieMaster Pro** is a modern movie management system where users can browse, add, edit, and organize their personal movie collections.

**Live Site:** [https://movie-master-pro-client.netlify.app/](#)  
**Server URL:** [https://movie-master-pro-server-two.vercel.app/
](#)  
**Client Repo:** [https://github.com/Sumaiiya-Haque/movie-master-pro.git](#)  
**Server Repo:** [https://github.com/Sumaiiya-Haque/movie-master-pro-server.git](#)

---

## 🌟 Key Features

- 🎞 **Movie Management:** CRUD operations (Add, Edit, Delete, View)  
- 🔐 **Authentication:** Email & Google login with protected routes  
- ⭐ **Top Rated & Recently Added:** Dynamic movie listings  
- 🔍 **Advanced Filtering:** Filter movies by genre and rating  
- 🧍‍♂️ **User Collections & Watchlist:** Manage your own movies and watchlist  
- 🌗 **Theme Toggle:** Light/Dark mode switch  
- 🚫 **Error Handling:** 404 page + React error boundaries  
- 🌀 **Loading States & Toast Notifications** for smooth user experience  

---

## 🏗️ Layout Overview

- **Header:** Navigation links, user profile dropdown, theme toggle  
- **Footer:** Quick links, social media icons  
- **Home Page Sections:** Hero carousel, Statistics, Top Rated, Recently Added, Genres, About  
- **Mobile Layout:** Hamburger menu & collapsible sidebar  

---

## 🔑 Authentication

- **Login Page:** Email, Password, Google login, success/error toast messages  
- **Register Page:** Name, Email, Photo URL, Password validation (≥6 chars, uppercase, lowercase)  

---

## 🎬 Movie Routes

| Route | Description | Protected |
|-------|------------|------------|
| `/movies` | View all movies | ❌ |
| `/movies/add` | Add a new movie | ✅ |
| `/movies/my-collection` | View user's collection | ✅ |
| `/movies/update/:id` | Update movie (owner only) | ✅ |
| `/movies/:id` | Movie details | ❌ |

---

## ⚙️ Tech Stack

**Client:** React.js, Tailwind CSS, DaisyUI, Firebase Auth, Framer Motion, React Hot Toast  
**Server:** Node.js, Express.js, MongoDB, dotenv, cors  
**Deployment:** Netlify/Firebase (Client), Vercel (Server)  

---

## 🚀 Installation



