# atarefa.do

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

A modern task management application with user authentication and dark theme support.

## Features

- ✅ User Authentication (register and login)
- 📝 Create, edit, mark as complete and delete tasks
- 🔍 Search tasks
- 🎯 Filter tasks by status (all, completed, pending)
- 🌓 Dark/Light theme with user preference persistence
- 🔒 Route protection with JWT
- 💾 Data persistence with MongoDB

## Project Structure

```
atarefa-do/
├── backend/
│   ├── config/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── server.js
├── css/
├── js/
├── index.html
├── login.html
├── register.html
├── auth.js
├── script.js
```

## Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome (icons)
- SweetAlert2 ()

### Backend

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- bcryptjs for encryption
- dotenv for environment variables
- cors for frontend-backend communication

## Environment Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/atarefa-do.git
cd atarefa-do
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables: Create a `.env` file in the project root with the following variables:

```env
PORT=5001
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
JWT_SECRET=your_jwt_secret
```

## How to Run

1. For development (with hot-reload):

```bash
npm run dev
```

2. For production:

```bash
npm start
```

The application will be available at:

- Frontend: http://localhost:8080
- Backend: http://localhost:5001

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Tasks

- `GET /api/tasks` - List all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task status

### User Preferences

- `GET /api/user/preferences` - Get user preferences
- `PATCH /api/user/dark-mode` - Update theme preference

## Deployment

The project is configured for deployment on Vercel, with specific settings in the `vercel.json` file for routing and CORS.

## License

This project is under the MIT License. See the [LICENSE.md](license.md) file for details.
