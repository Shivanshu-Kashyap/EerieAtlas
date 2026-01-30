# Paranormal - EerieAtlas

**EerieAtlas** is a paranormal reporting and exploration platform designed to uncover the unseen. Users can explore haunted locations, submit their own paranormal experiences, and view AI-analyzed credibility scores for reported sightings.

---

## 🏗 Project Structure

The project is divided into two main parts:

- **`Paranormal/`**: The frontend application built with React, Vite, and Tailwind CSS.
- **`Paranormal-Backend/`**: The backend server built with Node.js, Express, and MongoDB.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)
- Cloudinary account (for image uploads)

### 1. Backend Setup (`Paranormal-Backend`)

Navigate to the backend directory and install dependencies:

```bash
cd Paranormal-Backend
npm install
```

**Environment Variables (.env)**

Create a `.env` file in the `Paranormal-Backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Start the Server**

```bash
node server.js
# or if you have nodemon installed
nodemon server.js
```

The server runs on `http://localhost:5000` by default.

---

### 2. Frontend Setup (`Paranormal`)

Navigate to the frontend directory and install dependencies:

```bash
cd Paranormal
npm install
```

**Start the Development Server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: React Router DOM
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: [Express](https://expressjs.com/)
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary (via Multer)

---

## ✨ Features

- **Hero Section**: Immersive parallax effects and animations.
- **Interactive Map**: Visualize haunted locations globally.
- **Story Submission**: Users can share their paranormal encounters.
- **AI Analysis**: Concept for analyzing the credibility of submitted stories.
- **Responsive Design**: Optimized for Desktop, Tablet, and Mobile.

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
