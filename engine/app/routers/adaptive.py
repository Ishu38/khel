from fastapi import APIRouter
from app.schemas.game import AdaptRequest, AdaptResponse
from app.services.adaptive import compute_adaptation, get_session_analytics

router = APIRouter(prefix="/api/adaptive", tags=["adaptive"])


@router.post("/", response_model=AdaptResponse)
async def adapt_difficulty(req: AdaptRequest) -> AdaptResponse:
    return compute_adaptation(req)


@router.get("/analytics/{session_id}")
async def session_analytics(session_id: str) -> dict:
    return get_session_analytics(session_id)
