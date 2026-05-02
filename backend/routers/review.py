from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from schemas.review import ReviewRequest, ReviewResponse
from services.groq_service import get_code_review

limiter = Limiter(key_func=get_remote_address)

router = APIRouter(
    prefix="/review",
    tags=["Review"]
)

@router.post("/", response_model=ReviewResponse)
@limiter.limit("5/minute")
async def review_code(request: Request, body: ReviewRequest):
    if not body.code.strip():
        raise HTTPException(
            status_code=400,
            detail="Code cannot be empty!"
        )
    review = get_code_review(body.code, body.language)
    return ReviewResponse(
        review=review,
        language=body.language
    )