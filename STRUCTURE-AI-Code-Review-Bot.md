# Project Structure: AI Code Review Bot

ai-code-review-bot/
│
├── backend/                        <- All FastAPI (Python) code lives here
│   ├── main.py                     <- App entry point; creates FastAPI app, adds CORS, mounts routers
│   ├── config.py                   <- Loads environment variables (OPENAI_API_KEY)
│   ├── routers/
│   │   └── review.py               <- POST /review endpoint; calls OpenAI and returns review
│   ├── schemas/
│   │   └── review.py               <- Pydantic models for request body and response shape
│   ├── services/
│   │   └── openai_service.py       <- All OpenAI API logic lives here (prompt building, API call)
│   ├── requirements.txt            <- Python dependencies (fastapi, uvicorn, openai, python-dotenv)
│   └── .env                        <- Secret keys — NEVER commit this to GitHub
│
├── frontend/                       <- All React (JavaScript) code lives here
│   ├── index.html                  <- Root HTML file (Vite's entry point)
│   ├── vite.config.js              <- Vite configuration
│   ├── tailwind.config.js          <- Tailwind CSS configuration
│   ├── package.json                <- Node dependencies and scripts
│   └── src/
│       ├── main.jsx                <- React app entry point; renders <App />
│       ├── App.jsx                 <- Root component; holds global state (code, review, loading)
│       ├── api/
│       │   └── api.js              <- Axios function to POST code to FastAPI backend
│       └── components/
│           ├── CodeInput.jsx       <- Textarea + language selector + submit button
│           ├── ReviewDisplay.jsx   <- Renders the AI review response
│           └── LoadingSpinner.jsx  <- Shown while waiting for AI response
│
└── README.md                       <- Setup instructions, how to run, project description
