# Atarefa.do - Task Management Application

![HTML](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Javascript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

## Overview

Atarefa.do is a modern task management application that helps you organize your daily activities. Originally started as a study of to-do list patterns, it has evolved into a full-featured personal task management solution with user authentication and data persistence.

## Features

- 🔐 User Authentication (Register/Login)
- 📝 Create, Read, Update, and Delete tasks
- ✅ Mark tasks as completed
- 🌓 Dark/Light theme toggle
- 🔍 Search and filter tasks
- 💾 Data persistence with MongoDB
- 🔒 Secure API with JWT authentication

## Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome Icons
- HTTP Server for static file serving

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS enabled

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/zaqueu-1/atarefa-do.git
cd atarefa-do
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory with the following variables:

```env
PORT=5001
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
JWT_SECRET=your_jwt_secret
```

4. Start the development server:

```bash
npm run dev:all
```

The application will be available at:

- Frontend: http://localhost:8080
- Backend API: http://localhost:5001

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Tasks

- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion status

## Project Structure

```
atarefa-do/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── css/
│   ├── styles.css
│   └── auth.css
├── js/
│   ├── auth.js
│   ├── script.js
│   ├── config.js
│   └── theme.js
├── index.html
├── login.html
├── register.html
└── package.json
```

## Development

To start development:

```bash
npm run dev:all    # Starts both frontend and backend in development mode
npm run dev        # Starts only backend with nodemon
npm run serve-frontend  # Starts only frontend server
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Roadmap

- [ ] Social Media Login Integration
- [ ] Task Categories/Tags
- [ ] Task Due Dates
- [ ] Task Sharing
- [ ] Multiple Task Lists

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Original concept inspired by traditional to-do applications
- Modern UI/UX principles
- Community feedback and feature requests
