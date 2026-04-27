from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import review

#FastAPI instance
app = FastAPI(
    title="AI Code Review Bot",
    description="Paste your code here and get AI-powered review",
    version="1.0.0"
)

#cors Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(review.router)

@app.get("/")
def root():
    return {"message": "AI Code Review Bot Is Running!"}