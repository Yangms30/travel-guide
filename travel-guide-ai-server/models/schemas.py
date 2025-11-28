"""
Pydantic 스키마 정의

API 요청/응답 모델을 정의합니다.
"""

from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class PreferencesRequest(BaseModel):
    """여행 선호도 요청 모델"""
    
    startDate: str = Field(..., description="여행 시작일 (YYYY-MM-DD)")
    endDate: str = Field(..., description="여행 종료일 (YYYY-MM-DD)")
    budget: int = Field(..., description="예산 (원)", ge=0)
    numberOfPeople: int = Field(..., description="인원", ge=1)
    travelStyle: str = Field(..., description="여행 스타일 (beach, culture, adventure, city, nature)")
    
    class Config:
        json_schema_extra = {
            "example": {
                "startDate": "2024-08-01",
                "endDate": "2024-08-07",
                "budget": 2000000,
                "numberOfPeople": 2,
                "travelStyle": "beach"
            }
        }


class DestinationInfo(BaseModel):
    """여행지 정보 모델"""
    
    name: str = Field(..., description="여행지 이름")
    country: str = Field(..., description="국가")
    estimatedCost: int = Field(..., description="예상 총 비용")
    flightCost: int = Field(..., description="항공료")
    accommodationCost: int = Field(..., description="숙박비")
    highlights: List[str] = Field(..., description="주요 명소")
    reason: str = Field(..., description="추천 이유")
    bestSeason: str = Field(..., description="최적 시즌")
    weather: Optional[str] = Field(None, description="예상 날씨")
    tips: List[str] = Field(default_factory=list, description="여행 팁")


class RecommendationResponse(BaseModel):
    """여행지 추천 응답 모델"""
    
    destinations: List[DestinationInfo] = Field(..., description="추천 여행지 목록")
    generatedAt: datetime = Field(default_factory=datetime.now, description="생성 시간")
    totalProcessingTime: Optional[float] = Field(None, description="처리 시간 (초)")
    
    class Config:
        json_schema_extra = {
            "example": {
                "destinations": [
                    {
                        "name": "다낭",
                        "country": "베트남",
                        "estimatedCost": 1800000,
                        "flightCost": 700000,
                        "accommodationCost": 600000,
                        "highlights": ["바나힐", "미케비치", "호이안"],
                        "reason": "예산 내 최적, 8월 불꽃축제 개최",
                        "bestSeason": "3월-8월",
                        "weather": "평균 30°C, 맑음",
                        "tips": ["우기 시작 시기", "선크림 필수", "현지 투어 추천"]
                    }
                ],
                "generatedAt": "2024-01-01T00:00:00",
                "totalProcessingTime": 2.5
            }
        }


class ErrorResponse(BaseModel):
    """에러 응답 모델"""
    
    error: str = Field(..., description="에러 메시지")
    detail: Optional[str] = Field(None, description="상세 정보")
