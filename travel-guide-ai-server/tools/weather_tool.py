"""
날씨 조회 Tool

여행지의 날씨 정보를 조회합니다.
"""

from langchain.tools import tool
from typing import Dict
import random


@tool
def get_weather_forecast(destination: str, month: int) -> Dict:
    """
    여행지의 날씨 정보를 조회합니다.
    
    Args:
        destination: 목적지
        month: 월 (1-12)
    
    Returns:
        날씨 정보 (평균 기온, 강수량, 날씨 설명)
    """
    # Mock 날씨 데이터
    weather_data = {
        "다낭": {
            "summer": {"temp": 30, "rainfall": "높음", "desc": "맑고 더움, 우기 시작"},
            "winter": {"temp": 24, "rainfall": "낮음", "desc": "쾌적하고 건조"}
        },
        "발리": {
            "summer": {"temp": 28, "rainfall": "높음", "desc": "습하고 더움"},
            "winter": {"temp": 26, "rainfall": "낮음", "desc": "건기, 여행 최적기"}
        },
        "교토": {
            "summer": {"temp": 28, "rainfall": "보통", "desc": "무덥고 습함"},
            "winter": {"temp": 5, "rainfall": "낮음", "desc": "춥고 건조"}
        },
        "제주도": {
            "summer": {"temp": 26, "rainfall": "높음", "desc": "따뜻하고 습함"},
            "winter": {"temp": 8, "rainfall": "보통", "desc": "쌀쌀하고 바람"}
        }
    }
    
    # 계절 판단 (간단화)
    season = "summer" if 6 <= month <= 9 else "winter"
    
    dest_weather = weather_data.get(destination, {
        "summer": {"temp": 25, "rainfall": "보통", "desc": "일반적인 여름 날씨"},
        "winter": {"temp": 15, "rainfall": "보통", "desc": "일반적인 겨울 날씨"}
    })
    
    weather_info = dest_weather[season]
    
    return {
        "destination": destination,
        "month": month,
        "season": "여름" if season == "summer" else "겨울",
        "avgTemperature": weather_info["temp"],
        "rainfall": weather_info["rainfall"],
        "description": weather_info["desc"],
        "recommendation": _get_weather_recommendation(weather_info)
    }


@tool
def check_seasonal_events(destination: str, month: int) -> Dict:
    """
    여행지의 시즌별 이벤트를 확인합니다.
    
    Args:
        destination: 목적지
        month: 월 (1-12)
    
    Returns:
        이벤트 정보
    """
    # Mock 이벤트 데이터
    events_data = {
        "다낭": {
            8: ["다낭 국제 불꽃축제"],
            12: ["크리스마스 마켓"]
        },
        "발리": {
            3: ["발리 뉴이어 (Nyepi)"],
            6: ["발리 아트 페스티벌"]
        },
        "교토": {
            4: ["벚꽃 축제"],
            11: ["단풍 축제"]
        },
        "제주도": {
            4: ["유채꽃 축제"],
            10: ["제주 억새 축제"]
        }
    }
    
    dest_events = events_data.get(destination, {})
    events = dest_events.get(month, [])
    
    return {
        "destination": destination,
        "month": month,
        "events": events if events else ["특별 이벤트 없음"],
        "hasEvents": len(events) > 0
    }


def _get_weather_recommendation(weather_info: Dict) -> str:
    """날씨 정보를 바탕으로 추천 사항 생성"""
    temp = weather_info["temp"]
    rainfall = weather_info["rainfall"]
    
    recommendations = []
    
    if temp > 28:
        recommendations.append("선크림과 모자 필수")
    elif temp < 10:
        recommendations.append("따뜻한 옷 준비")
    
    if rainfall == "높음":
        recommendations.append("우산 또는 우비 준비")
        recommendations.append("실내 활동 계획 추천")
    
    return ", ".join(recommendations) if recommendations else "쾌적한 여행 날씨"
