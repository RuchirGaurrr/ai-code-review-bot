# Project Roadmap: AI Code Review Bot

## Overview
A full-stack web app where users paste Python or JavaScript code and receive an AI-powered
review — covering bugs, improvements, security issues, and best practices — powered by
OpenAI's GPT and built with FastAPI + React.

## Tech Stack
- **FastAPI** — Async Python backend; ideal for non-blocking OpenAI API calls
- **OpenAI API (GPT-4o-mini)** — AI engine for code analysis
- **React + Vite** — Fast, component-based frontend
- **Tailwind CSS** — Utility-first styling for quick, clean UI
- **Axios** — HTTP client for React → FastAPI communication
- **python-dotenv** — Secure environment variable management
- **uvicorn** — ASGI server to run FastAPI

## Estimated Timeline
| Phase | Description | Time |
|-------|-------------|------|
| Phase 1 | Setup & Boilerplate | Day 1 |
| Phase 2 | FastAPI Backend + OpenAI Integration | Day 2-3 |
| Phase 3 | React Frontend | Day 4-5 |
| Phase 4 | Connect Frontend <-> Backend (CORS, Axios) | Day 6 |
| Phase 5 | Polish, Error Handling & Testing | Day 7 |

---

## Phases

### Phase 1: Setup & Boilerplate
- [ ] Create backend folder structure
- [ ] Set up Python virtual environment
- [ ] Install FastAPI, uvicorn, openai, python-dotenv
- [ ] Create main.py with a health-check route (GET /)
- [ ] Set up .env file with OPENAI_API_KEY
- [ ] Scaffold React app with Vite
- [ ] Install Tailwind CSS and Axios in frontend
- [ ] Verify both backend and frontend run locally

### Phase 2: FastAPI Backend + OpenAI Integration
- [ ] Create routers/review.py with POST /review endpoint
- [ ] Accept code and language in request body (Pydantic schema)
- [ ] Build the OpenAI prompt (system + user message)
- [ ] Call OpenAI API and return structured review
- [ ] Handle errors: OpenAI timeout, invalid input, API key missing
- [ ] Test endpoint with FastAPI's /docs

### Phase 3: React Frontend
- [ ] Build CodeInput component (textarea + language selector)
- [ ] Build ReviewDisplay component (render AI response)
- [ ] Build LoadingSpinner component
- [ ] Wire up state: code, language, loading, review
- [ ] Style with Tailwind CSS

### Phase 4: Connect Frontend <-> Backend
- [ ] Add CORS middleware to FastAPI
- [ ] Write api.js service in React (Axios POST to /review)
- [ ] Connect submit button -> API call -> display review
- [ ] Handle loading state and error messages in UI

### Phase 5: Polish, Error Handling & Testing
- [ ] Add input validation (empty code, unsupported language)
- [ ] Handle OpenAI API errors gracefully in UI
- [ ] Add character/line count to code input
- [ ] Clean up UI — spacing, colors, responsiveness
- [ ] Write README.md with setup instructions
- [ ] Push to GitHub with clean commit history
