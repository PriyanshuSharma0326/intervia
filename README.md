# Intervia - AI Mock Interview App

Intervia is a full-stack AI mock interview platform for practicing role-based interviews. Users can create an account, choose a work field, select a role and difficulty, answer AI-generated questions, receive AI feedback and scores, and review their interview history over time.

The app is built as a practical job-prep tool and a portfolio project that demonstrates authentication, frontend state management, backend APIs, PostgreSQL persistence, and AI integration in one product.

## Features

- User signup, login, logout, and protected routes
- Forgot-password flow with email verification and direct password reset
- JWT authentication stored in an HTTP-only cookie
- Field, role, and difficulty selection
- AI-generated interview sessions with 10 questions
- Text answer input
- Browser speech-to-text answer input where supported
- Per-answer AI feedback and score
- Interview completion with total score out of 100
- Active, abandoned, resumed, and completed interview states
- Interview history page
- Interview review page with answered and unanswered questions
- Profile page with user details, total interviews, average score, and latest session
- Redux Toolkit state management for interviews and app data
- Supabase/PostgreSQL-compatible database access
- Vercel SPA rewrite config for the frontend

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Redux Toolkit
- React Redux
- Axios
- React Markdown

### Backend

- Node.js
- Express
- PostgreSQL with `pg`
- JWT
- Cookie Parser
- CORS
- Groq SDK

### AI

- Groq API
- Current model: `llama-3.3-70b-versatile`
- Installed but not currently wired in the active AI service: OpenAI SDK and Google GenAI SDK

### Database

- PostgreSQL
- Supabase compatible

## Project Structure

```txt
ai-interview-app/
|-- client/                         # React Vite frontend
|   |-- public/
|   |-- vercel.json                 # SPA routing rewrites
|   `-- src/
|       |-- app/                    # Redux store
|       |-- assets/
|       |-- components/
|       |-- context/                # Auth context
|       |-- features/               # Redux slices
|       |-- lib/                    # API helpers, constants, icons, utilities
|       |-- pages/                  # App pages
|       `-- routes/                 # Protected/public/shared layouts
|-- server/                         # Node + Express backend
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

## App Routes

| Route | Description |
| --- | --- |
| `/auth/login` | Login page |
| `/auth/register` | Registration page |
| `/auth/forgot-password` | Verify email and reset password |
| `/` | Home dashboard and interview starter |
| `/interview` | Active interview session |
| `/history` | Interview history |
| `/review/:interviewId` | Detailed interview review |
| `/profile` | User profile and stats |

## API Routes

### Auth

| Method | Route | Description |
| --- | --- | --- |
| POST | `/auth/register` | Create a new user and set auth cookie |
| POST | `/auth/login` | Log in and set auth cookie |
| POST | `/auth/logout` | Clear auth cookie |
| POST | `/auth/forgot-password` | Verify that an email belongs to an existing user |
| POST | `/auth/reset-password` | Update the password for a verified email |
| GET | `/me` | Return the authenticated user |

### Interview

All interview routes are protected by `verifyUser`.

| Method | Route | Description |
| --- | --- | --- |
| GET | `/interview/all` | Get all interviews for the logged-in user |
| POST | `/interview/start` | Create an interview and generate questions |
| GET | `/interview/:interviewId` | Get interview details and questions |
| PUT | `/interview/answer/:questionId` | Submit an answer and get AI feedback |
| PUT | `/interview/submit/:interviewId` | Mark interview as completed with final score |
| PUT | `/interview/abandon/:interviewId` | Mark interview as abandoned |
| PUT | `/interview/resume/:interviewId` | Resume an incomplete interview |

## How It Works

1. The user signs up or logs in.
2. The frontend checks the session with `/me`.
3. The user selects a field, role, and difficulty.
4. The backend creates an interview record.
5. Groq generates 10 role-specific interview questions.
6. Questions are saved in PostgreSQL.
7. The user answers questions with text or browser speech recognition.
8. Each submitted answer is evaluated by Groq.
9. The backend stores the answer, feedback, score, and answered timestamp.
10. When the interview is finished, the frontend totals the scores and submits the final interview score.
11. The user can view past sessions, resume incomplete interviews, and review completed interviews.

## Password Reset Flow

1. The user opens `/auth/forgot-password`.
2. The user enters their email address.
3. The frontend calls `/auth/forgot-password` to verify that the email exists.
4. After verification, the user enters and confirms a new password.
5. The frontend calls `/auth/reset-password`.
6. The backend hashes the new password with the configured `HASH_SALT`.
7. The UI shows a password reset success modal with a link back to sign in.

This is currently a direct in-app reset flow. Email delivery and one-time reset tokens are good next improvements for production use.

## Getting Started

### Prerequisites

- Node.js
- npm
- PostgreSQL database or Supabase project
- Groq API key

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
GROQ_API_KEY=your_groq_api_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

`CLIENT_URL` is used by CORS. For production, set it to your deployed frontend URL.

### 4. Create Database Tables

The app expects `users`, `interviews`, and `interview_questions` tables.

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    work_field TEXT,
    score INTEGER,
    status TEXT NOT NULL DEFAULT 'active',
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE TABLE interview_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    interview_id UUID NOT NULL REFERENCES interviews(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    question_order INTEGER NOT NULL,
    answer TEXT,
    feedback TEXT,
    evaluation_score INTEGER,
    answered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5. Start the Backend

```bash
npm start
```

The API runs on:

```txt
http://localhost:8000
```

The backend also has a dev script:

```bash
npm run dev
```

That script uses `nodemon`, so make sure `nodemon` is available if you use it.

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

Keep the trailing slash because frontend API helpers append route paths directly.

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
npm start        # Start backend with node
npm run dev      # Start backend with nodemon if available
```

### Frontend

```bash
cd client
npm run dev      # Start Vite dev server
npm run build    # Build frontend for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Request Examples

### Register

```json
{
    "name": "Priyanshu",
    "email": "priyanshu@example.com",
    "password": "password123"
}
```

### Start Interview

```json
{
    "work_field": "Software Engineering",
    "role": "Frontend Engineer",
    "difficulty": "Medium"
}
```

### Submit Answer

```json
{
    "question": "What is the virtual DOM in React?",
    "answer": "The virtual DOM is React's in-memory representation of the UI..."
}
```

### Submit Interview

```json
{
    "score": 82
}
```

### Verify Email for Password Reset

```json
{
    "email": "priyanshu@example.com"
}
```

### Reset Password

```json
{
    "email": "priyanshu@example.com",
    "password": "newPassword123",
    "confirmPassword": "newPassword123"
}
```

## Supported Interview Fields

Intervia currently includes role presets for:

- Software Engineering
- Data and AI
- Design
- Product
- Marketing
- Sales
- HR and Recruiting
- Finance and Accounting
- Operations
- Cybersecurity
- Cloud and Infrastructure
- Support
- Education
- Healthcare
- Legal

## Deployment Notes

- The frontend includes `client/vercel.json` so client-side routes work correctly on Vercel.
- The backend must allow the deployed frontend URL through `CLIENT_URL`.
- In production, cookies use `sameSite: "none"` and `secure: true`, so the backend must be served over HTTPS.
- Configure production environment variables separately for the client and server.

## Future Improvements

- Add formal database migrations
- Add stronger password hashing with bcrypt or Argon2
- Replace direct password reset with tokenized email reset links
- Add richer AI session summaries with strengths and weak areas
- Add charts for progress over time
- Add automated tests for auth, interview routes, and AI response parsing
- Add better retry handling for invalid AI JSON responses

## Portfolio Talking Points

- Built a real AI-powered interview practice app from scratch
- Combined frontend, backend, auth, database, and AI workflows
- Used Groq to generate questions and evaluate answers dynamically
- Designed persistent interview sessions with resume and review flows
- Added speech input for a more realistic mock interview experience
- Built a project that is useful during job hunting and easy to demo in interviews

## License

This project is currently for learning and portfolio use.
