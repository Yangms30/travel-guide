"""
추천 API 라우터

여행지 추천 관련 API 엔드포인트를 정의합니다.
"""

from fastapi import APIRouter, HTTPException
from models.schemas import PreferencesRequest, RecommendationResponse, ErrorResponse
from agents.destination_agent import DestinationAgent
import time

router = APIRouter(prefix="/api/recommendations", tags=["recommendations"])

# Agent 인스턴스 (싱글톤)
destination_agent = None


def get_destination_agent() -> DestinationAgent:
    """
    DestinationAgent 인스턴스 반환 (싱글톤 패턴)
    
    Returns:
        DestinationAgent 인스턴스
    """
    global destination_agent
    if destination_agent is None:
        destination_agent = DestinationAgent()
    return destination_agent


@router.post(
    "/destinations",
    response_model=RecommendationResponse,
    summary="여행지 추천",
    description="사용자의 선호도를 바탕으로 최적의 여행지를 추천합니다.",
    responses={
        200: {"description": "추천 성공"},
        400: {"model": ErrorResponse, "description": "잘못된 요청"},
        500: {"model": ErrorResponse, "description": "서버 오류"}
    }
)
async def get_destination_recommendations(preferences: PreferencesRequest):
    """
    여행지 추천 API
    
    Args:
        preferences: 사용자 선호도 (여행 기간, 예산, 인원, 스타일)
    
    Returns:
        추천 여행지 목록
    """
    try:
        # 시작 시간 기록
        start_time = time.time()
        
        # Agent 실행
        agent = get_destination_agent()
        result = await agent.run(preferences.dict())
        
        # 처리 시간 계산
        processing_time = time.time() - start_time
        
        # 응답 생성
        return RecommendationResponse(
            destinations=result.get("destinations", []),
            totalProcessingTime=processing_time
        )
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"추천 생성 중 오류 발생: {str(e)}")


@router.get(
    "/health",
    summary="헬스 체크",
    description="Agent 상태를 확인합니다."
)
async def health_check():
    """
    Agent 헬스 체크
    
    Returns:
        Agent 상태 정보
    """
    try:
        agent = get_destination_agent()
        return {
            "status": "healthy",
            "agent": "DestinationAgent",
            "tools_count": len(agent.tools)
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }
