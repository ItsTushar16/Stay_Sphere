# StaySphere 🏡  
*A full-stack property listing platform inspired by Airbnb*

StaySphere is a full-stack web application built completely from scratch. It allows users to explore, list, and review accommodations across different categories, with secure authentication, image uploads, search, and filtering functionality.

This project focuses on building real-world backend logic, secure user flows, and a clean, responsive UI similar to modern booking platforms.

---

## 🚀 Live Demo

🔗 **Live URL:** https://stay-sphere-qgq3.onrender.com/listings  

> **Note:**
> Initial load may take up to a minute because the app is hosted on a free third-party service.
> For the best experience, please open the application on a **laptop or desktop**.  
> If accessing on a mobile device, use **landscape mode**.


---

## 🎯 Project Motivation

StaySphere was built to understand how real-world platforms like Airbnb manage authentication, user-generated content, image uploads, and search and filter systems. The goal was to design a scalable backend, apply proper authorization rules, and implement core full-stack concepts without relying on starter templates.

---

## 📌 Features

### 🔐 Authentication & Authorization
- User signup and login 
- Secure session-based authentication
- Protected routes for listings and reviews
- Only logged-in users can:
  - Create listings
  - Add reviews
- Users can delete only their own reviews and listings

### 🏠 Listings & Hosting
- Users can become hosts and create property listings
- Add listing details:
  - Title
  - Description
  - Price
  - Location (city, country)
  - Category (Home, Apartment, Hostel, Farm, Villa, etc.)
- Upload property images
- View detailed listing pages

### 🔍 Search & Filter
- Search listings by:
  - Title
  - Location
  - Country
- Filter listings based on categories
- Category-based navigation similar to Airbnb

### ⭐ Reviews System
- Star-based rating system
- Add comments and ratings to listings
- Review deletion restricted to the review owner

### 📱 Responsive UI
- Fully responsive layout using **Bootstrap**
- Clean and intuitive UI
- Optimized primarily for desktop and tablet screens

---

## 🛠 Tech Stack

### Frontend
- HTML  
- CSS  
- JavaScript  
- Bootstrap  
- EJS (Embedded JavaScript Templates)

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB  
- Mongoose

### Authentication
- Passport.js  
- Express-session

### File Uploads
- Multer  
- Cloud-based image storage

### Deployment
- Render

---

## 🧠 Architecture & Concepts Used

- MVC (Model–View–Controller) architecture  
- RESTful routing  
- Middleware-based authentication and validation  
- Secure handling of user-generated content  
- CRUD operations for listings and reviews  
- Server-side rendering with EJS  

---

## 🔄 Application Flow

1. User signs up or logs in  
2. User browses or searches listings by title or location  
3. Logged-in users can:
   - Create listings
   - Upload images
   - Add reviews  
4. Users can filter listings by category  
5. Review owners can delete their reviews  

---

## 🗄 Database Models (Overview)

- **User**
  - Username
  - Email
  - Password (hashed)

- **Listing**
  - Title
  - Description
  - Price
  - Location
  - Category
  - Images
  - Owner (User reference)

- **Review**
  - Rating
  - Comment
  - Author (User reference)
  - Listing (Listing reference)

---

## 🧩 Challenges & Learnings

- Implementing secure authentication and authorization using Passport.js  
- Managing relationships between users, listings, and reviews  
- Handling image uploads and cloud storage  
- Preventing unauthorized actions on protected routes  
- Structuring a scalable Express application using MVC  

---

## 🔮 Future Improvements

- Booking and reservation system  
- Wishlist or favorites feature  
- User profile pages  
- Map integration for listings  
- Pagination and sorting  
- Admin dashboard  

---

## 👤 Author

**Tushar Tiwari**  

---

## 📄 License

This project is built for learning purposes.
