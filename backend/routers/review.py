from fastapi import APIRouter, HTTPException
from schemas.review import ReviewRequest, ReviewResponse
from services.groq_service import get_code_review

router = APIRouter(
    prefix="/review",
    tags=["Review"]
)

@router.post("/", response_model=ReviewResponse)
async def review_code(request: ReviewRequest):
    if not request.code.strip():
        raise HTTPException( status_code=400, detail="Code cannot be empty!")
    
    review = get_code_review(request.code, request.language)
    return ReviewResponse(review=review, language= request.language)    