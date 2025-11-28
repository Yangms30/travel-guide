"""
가격 조회 Tool

항공료 및 숙박비를 조회합니다.
"""

from langchain.tools import tool
from typing import Dict
import random


@tool
def get_flight_price(destination: str, departure: str = "서울", people: int = 2) -> Dict:
    """
    항공료를 조회합니다.
    
    Args:
        destination: 목적지
        departure: 출발지 (기본: 서울)
        people: 인원
    
    Returns:
        항공료 정보 (1인당 가격, 총 가격)
    """
    # Mock 데이터 (실제로는 API 호출)
    base_prices = {
        "다낭": 350000,
        "발리": 450000,
        "교토": 400000,
        "제주도": 150000,
        "파리": 1200000,
        "뉴욕": 1500000,
    }
    
    price_per_person = base_prices.get(destination, 500000)
    # 약간의 변동성 추가
    price_per_person = int(price_per_person * random.uniform(0.9, 1.1))
    
    return {
        "destination": destination,
        "departure": departure,
        "pricePerPerson": price_per_person,
        "totalPrice": price_per_person * people,
        "people": people,
        "currency": "KRW"
    }


@tool
def get_accommodation_price(destination: str, nights: int, people: int = 2) -> Dict:
    """
    숙박비를 조회합니다.
    
    Args:
        destination: 목적지
        nights: 숙박 일수
        people: 인원
    
    Returns:
        숙박비 정보 (1박당 가격, 총 가격)
    """
    # Mock 데이터
    base_prices_per_night = {
        "다낭": 100000,
        "발리": 120000,
        "교토": 150000,
        "제주도": 80000,
        "파리": 200000,
        "뉴욕": 250000,
    }
    
    price_per_night = base_prices_per_night.get(destination, 100000)
    # 인원에 따른 가격 조정 (2인 기준)
    if people > 2:
        price_per_night = int(price_per_night * 1.3)
    
    return {
        "destination": destination,
        "pricePerNight": price_per_night,
        "nights": nights,
        "totalPrice": price_per_night * nights,
        "people": people,
        "currency": "KRW"
    }


@tool
def calculate_total_budget(flight_cost: int, accommodation_cost: int, days: int, people: int) -> Dict:
    """
    총 여행 예산을 계산합니다.
    
    Args:
        flight_cost: 항공료
        accommodation_cost: 숙박비
        days: 여행 일수
        people: 인원
    
    Returns:
        총 예산 breakdown
    """
    # 식비 (1인 1일 평균)
    meal_cost_per_day = 50000
    total_meal_cost = meal_cost_per_day * days * people
    
    # 교통비 (현지)
    transport_cost = 30000 * days * people
    
    # 관광/액티비티
    activity_cost = 100000 * days * people
    
    # 기타 (쇼핑, 팁 등)
    misc_cost = 50000 * days * people
    
    total = flight_cost + accommodation_cost + total_meal_cost + transport_cost + activity_cost + misc_cost
    
    return {
        "breakdown": {
            "flight": flight_cost,
            "accommodation": accommodation_cost,
            "meals": total_meal_cost,
            "transport": transport_cost,
            "activities": activity_cost,
            "miscellaneous": misc_cost
        },
        "total": total,
        "perPerson": total // people,
        "currency": "KRW"
    }
