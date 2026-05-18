# Intervia - AI Mock Interview App

Intervia is a full-stack AI mock interview app that helps developers practice for job interviews with role-based questions, answer feedback, scoring, and performance history.

The idea is simple: choose a role, answer interview questions, get AI feedback, and track where you are improving over time.

## Why This Project Stands Out

This project combines the pieces interviewers like to talk about in one practical app:

- React frontend with protected routes and auth flows
- Node.js and Express API
- PostgreSQL/Supabase persistence
- JWT authentication with HTTP-only cookies
- AI integration for question generation and answer evaluation
- A real use case for job seekers and developers preparing for interviews

It is also a strong portfolio story: "I built this while job hunting to practice interviews and track my progress."

## Current Status

The project currently has the authentication foundation in place:

- User registration
- User login
- JWT token creation
- HTTP-only auth cookie
- Protected `/me` route
- React auth context
- Public and protected frontend routes
- Login and register pages
- PostgreSQL/Supabase connection

The AI interview flow, scoring, summaries, and history features are planned next.

## Planned Core Features

1. Auth - signup, login, JWT-based sessions
2. Role selection - Frontend, Backend, Full Stack, and more
3. Interview session - AI generates 5-10 questions one by one
4. Answer input - text first, voice input later
5. AI evaluation - score and feedback for each answer
6. Session summary - overall score, strengths, and weak areas
7. History - previous interview sessions and scores stored in PostgreSQL/Supabase

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Redux Toolkit planned for larger app state

### Backend

- Node.js
- Express
- JWT
- Cookie Parser
- CORS
- PostgreSQL with `pg`

### Database

- PostgreSQL
- Supabase compatible
- Prisma ORM planned as the schema grows

### AI

- Gemini API or OpenAI API planned for question generation and answer evaluation

## Project Structure

```txt
ai-interview-app/
|-- client/                 # React Vite frontend
|   |-- public/
|   `-- src/
|       |-- components/
|       |-- context/
|       |-- lib/
|       |-- pages/
|       `-- routes/
|-- server/                 # Node + Express backend
|   |-- controllers/
|   |-- lib/
|   |-- middlewares/
|   |-- queries/
|   |-- routes/
|   |-- services/
|   |-- connection.js
|   `-- index.js
`-- README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- PostgreSQL database or Supabase project
- Gemini or OpenAI API key when AI features are added

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ai-interview-app
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Backend Environment Variables

Create a `.env` file inside `server/`:

```env
PORT=8000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
HASH_SALT=your_password_hash_salt
NODE_ENV=development
```

Future AI variables may include:

```env
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
```

### 4. Create the Users Table

The current auth flow expects a `users` table. For PostgreSQL/Supabase, you can start with:

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5. Start the Backend

```bash
npm run dev
```

The API runs on:

```txt
http://localhost:8000
```

### 6. Install Frontend Dependencies

Open a new terminal:

```bash
cd client
npm install
```

### 7. Configure Frontend Environment Variables

Create a `.env` file inside `client/`:

```env
VITE_API_URL=http://localhost:8000/
```

### 8. Start the Frontend

```bash
npm run dev
```

The app runs on:

```txt
http://localhost:5173
```

## Available Scripts

### Backend

```bash
cd server
npm run dev      # Start backend with nodemon
npm start        # Start backend with node
```

### Frontend

```bash
cd client
npm run dev      # Start Vite dev server
npm run build    # Build frontend for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## API Routes

### Auth

| Method | Route | Description |
| --- | --- | --- |
| POST | `/auth/register` | Create a new user and set auth cookie |
| POST | `/auth/login` | Log in an existing user and set auth cookie |
| GET | `/me` | Return the currently authenticated user |

### Request Examples

Register:

```json
{
    "name": "Priyanshu",
    "email": "priyanshu@example.com",
    "password": "password123"
}
```

Login:

```json
{
    "email": "priyanshu@example.com",
    "password": "password123"
}
```

## Planned AI Interview Flow

1. User logs in.
2. User selects a target role.
3. Backend asks Gemini/OpenAI to generate role-specific interview questions.
4. User answers each question.
5. Backend sends the answer to the AI model for evaluation.
6. AI returns a score, feedback, strengths, and improvement points.
7. App stores the interview session in PostgreSQL/Supabase.
8. User reviews the final summary and tracks past performance.

## Suggested Future Database Models

```txt
users
roles
interview_sessions
questions
answers
evaluations
```

Example relationships:

- A user has many interview sessions.
- An interview session belongs to one role.
- An interview session has many questions.
- Each question has one user answer.
- Each answer has one AI evaluation.

## Build Roadmap

1. Finish backend auth and validation
2. Add database schema for roles, sessions, questions, answers, and evaluations
3. Connect Gemini/OpenAI for question generation
4. Add interview session API routes
5. Build role selection and interview screens
6. Add AI scoring and feedback UI
7. Build session summary screen
8. Add history dashboard
9. Deploy frontend and backend

## Portfolio Talking Points

- Built a real AI-powered product around a personal job-search problem
- Designed full-stack architecture with auth, database, API, and frontend routing
- Integrated third-party AI APIs for dynamic question generation and feedback
- Stored user progress so the app becomes more useful over time
- Created a project that is practical, demo-friendly, and easy to discuss in interviews

## License

This project is currently for learning and portfolio use.
