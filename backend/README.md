# AI Code Review Bot 🤖

An AI-powered code review tool that analyzes your code and provides instant feedback on bugs, best practices, performance, and security issues.

🔗 **Live Demo:** https://ai-code-review-bot-frontend.vercel.app

---

## Features

- 🧠 **AI-Powered Reviews** — Uses Groq's LLaMA 3.3 model to analyze code
- 🔍 **Auto Language Detection** — Automatically detects the programming language
- 🐛 **Bug Detection** — Identifies bugs and errors in your code
- ✅ **Best Practices** — Suggests improvements for code quality
- ⚡ **Performance Tips** — Recommends performance optimizations
- 🔒 **Security Analysis** — Highlights potential security vulnerabilities
- 💡 **Improved Code** — Always provides an improved version with inline comments
- 📋 **Copy Button** — Copy review or code snippets with one click
- 🎨 **Syntax Highlighting** — Code blocks rendered with VS Code dark theme
- ⌨️ **Keyboard Shortcut** — Ctrl + Enter to submit code for review
- 🔄 **Auto Expanding Input** — Code box grows as you type

---

## Tech Stack

**Backend**
- FastAPI — Async Python web framework
- Groq API (LLaMA 3.3 70B) — AI model for code analysis
- Pydantic — Request/response validation
- SlowAPI — Rate limiting (10 requests/minute per IP)
- Uvicorn — ASGI server
- Python-dotenv — Environment variable management

**Frontend**
- React + Vite — Fast component-based UI
- Tailwind CSS — Utility-first styling
- Axios — HTTP client for API calls
- React Markdown — Markdown rendering
- React Syntax Highlighter — Code syntax highlighting

**Deployment**
- Render — Backend hosting
- Vercel — Frontend hosting

---

## Project Structure

```
ai-code-review-bot/
├── backend/
│   ├── routers/
│   │   └── review.py          # POST /review/ endpoint + rate limiting
│   ├── schemas/
│   │   └── review.py          # Pydantic request/response models
│   ├── services/
│   │   └── groq_service.py    # Groq API integration + prompt engineering
│   ├── main.py                # FastAPI app + CORS + rate limit middleware
│   ├── config.py              # Environment variable loading
│   └── requirements.txt       # Python dependencies
│
└── frontend/
    └── src/
        ├── api/
        │   └── api.js             # Axios API call + error handling
        ├── components/
        │   ├── CodeInput.jsx      # Auto-expanding code input + submit
        │   ├── ReviewDisplay.jsx  # Markdown + syntax highlighted review
        │   └── LoadingSpinner.jsx # Loading component
        └── App.jsx                # Root component + state management
```

---

## Getting Started Locally

### Prerequisites
- Python 3.10+
- Node.js 18+
- Groq API key (free at console.groq.com)

### Backend Setup

```bash
cd backend
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
```

Create `.env` file inside `backend/`:

```
GROQ_API_KEY=your_groq_api_key_here
```

Run the backend:

```bash
uvicorn main:app --reload
```

Backend runs at: http://localhost:8000
API docs at: http://localhost:8000/docs

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/review/` | Submit code for AI review |

### POST /review/ Request Body

```json
{
  "code": "your code here",
  "language": "auto"
}
```

### POST /review/ Response

```json
{
  "review": "AI generated review in markdown format",
  "language": "auto"
}
```

---


## Key Technical Decisions

- **Groq over OpenAI** — Free tier, fast inference, no credit card needed
- **FastAPI over Flask** — Async support, auto docs, Pydantic validation
- **React + Vite over CRA** — Faster dev server, smaller bundle size
- **Render + Vercel** — Free hosting, GitHub auto-deploy
- **Prompt Engineering** — Structured output format ensures consistent reviews
- **SlowAPI** — Simple rate limiting without needing Redis or a database

---

## Deployment

- **Backend** deployed on [Render](https://render.com) — free tier
- **Frontend** deployed on [Vercel](https://vercel.com) — free tier

---

## Author

**Ruchir Gaur**
- GitHub: [@RuchirGaurrr](https://github.com/RuchirGaurrr)

---

## License

MIT License