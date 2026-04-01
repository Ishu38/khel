from fastapi import APIRouter, HTTPException
from app.schemas.game import GenerateRequest, GeneratedGame
from app.services.game_generator import generate_game

router = APIRouter(prefix="/api/generate", tags=["generate"])


@router.post("/", response_model=GeneratedGame)
async def create_game(request: GenerateRequest) -> GeneratedGame:
    """AI game generation: natural language prompt → playable game config."""
    try:
        return await generate_game(request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Game generation failed: {e}")
