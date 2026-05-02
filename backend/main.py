from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from routers import review

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="AI Code Review Bot",
    description="Paste your code and get an AI-powered review",
    version="1.0.0"
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-code-review-bot-frontend.vercel.app"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(review.router)

@app.get("/")
def root():
    return {"message": "AI Code Review Bot is running!"}