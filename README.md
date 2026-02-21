# Task Management App

A full-stack **MERN** task management application with JWT authentication. Users can register, log in, add tasks, view them, mark as completed, delete, and filter by status — all scoped per user.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 (Vite 6), Tailwind CSS v4, Axios |
| **Backend** | Node.js, Express 4, Mongoose 8 |
| **Database** | MongoDB Atlas (free M0 cluster) |
| **Auth** | JSON Web Tokens (jsonwebtoken), bcryptjs |
| **Dev Tools** | Nodemon, Vite HMR |

---

## Project Structure

```
TaskManagementApp/
├── server/                          # Express API
│   ├── config/db.js                 # MongoDB connection
│   ├── models/User.js               # User schema (bcrypt)
│   ├── models/Task.js               # Task schema (user-scoped)
│   ├── services/authService.js      # Auth business logic
│   ├── services/taskService.js      # Task business logic
│   ├── controllers/authController.js
│   ├── controllers/taskController.js
│   ├── routes/authRoutes.js         # /api/auth/*
│   ├── routes/taskRoutes.js         # /api/tasks/* (protected)
│   ├── middleware/authMiddleware.js  # JWT verification
│   ├── server.js                    # Entry point
│   └── .env                         # PORT, MONGO_URI, JWT_SECRET
│
├── client/                          # React SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthPage.jsx         # Login / Register
│   │   │   ├── TaskForm.jsx         # Add task form
│   │   │   ├── TaskList.jsx         # Task list
│   │   │   ├── TaskItem.jsx         # Single task card
│   │   │   └── FilterBar.jsx        # Status filter
│   │   ├── services/
│   │   │   ├── authService.js       # Auth API + localStorage
│   │   │   └── taskService.js       # Task API + token interceptor
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── .env                         # VITE_API_URL
│
└── README.md
```

---

## Steps to Run Locally

### Prerequisites

- **Node.js** v18+ and **npm**
- A **MongoDB Atlas** cluster (or local MongoDB instance)

### 1. Clone the Repository

```bash
git clone https://github.com/blueberry09032006-source/TaskManagementApp.git
cd TaskManagementApp
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

Start the dev server:

```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file inside the `client/` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## API Endpoints

### Auth

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/api/auth/register` | `{ name, email, password }` | Register a new user, returns JWT |
| POST | `/api/auth/login` | `{ email, password }` | Login, returns JWT |

### Tasks (Protected — requires `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Fetch all tasks for logged-in user |
| GET | `/api/tasks?status=pending` | Filter tasks by status (`pending` / `completed`) |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Mark a task as completed |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## Assumptions & Limitations

- **Single status transition**: Tasks move from `pending` → `completed` only. There is no undo/revert.
- **No email verification**: Registration accepts any email format without sending a confirmation email.
- **JWT in localStorage**: Token is stored in `localStorage` for simplicity. In a production app, `httpOnly` cookies would be more secure.
- **No password reset**: Forgot-password flow is not implemented.
- **No pagination**: All tasks for a user are fetched in a single request. For large datasets, server-side pagination should be added.
- **MongoDB Atlas**: The app is configured for a cloud MongoDB Atlas instance. To use a local MongoDB instance, update `MONGO_URI` in `server/.env` to `mongodb://localhost:27017/taskmanager`.

---

## Bonus Features

- **JWT Authentication** — register/login with bcrypt-hashed passwords; all task routes are protected
- **Per-user task scoping** — each user only sees and manages their own tasks
- **Delete task** — users can permanently remove any of their tasks
- **Filter by status** — tasks can be filtered by `pending` or `completed` via query param (`?status=`)
- **Auto-logout on token expiry** — Axios interceptor detects 401 responses and clears the session automatically
- **Clean architecture** — Controller → Service separation for maintainable backend code
- **Responsive UI** — works on both mobile and desktop screens