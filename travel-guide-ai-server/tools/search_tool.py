"""
여행지 검색 Tool

여행 스타일에 맞는 여행지를 데이터베이스에서 검색합니다.
"""

from langchain.tools import tool
from typing import List, Dict


# Mock 여행지 데이터베이스
DESTINATIONS_DB = {
    "beach": [
        {"name": "다낭", "country": "베트남", "avgCost": 1500000},
        {"name": "발리", "country": "인도네시아", "avgCost": 1800000},
        {"name": "푸켓", "country": "태국", "avgCost": 1600000},
        {"name": "세부", "country": "필리핀", "avgCost": 1400000},
        {"name": "오키나와", "country": "일본", "avgCost": 2200000},
    ],
    "culture": [
        {"name": "교토", "country": "일본", "avgCost": 2000000},
        {"name": "로마", "country": "이탈리아", "avgCost": 3500000},
        {"name": "방콕", "country": "태국", "avgCost": 1300000},
        {"name": "프라하", "country": "체코", "avgCost": 2800000},
        {"name": "이스탄불", "country": "터키", "avgCost": 2200000},
    ],
    "adventure": [
        {"name": "퀸즈타운", "country": "뉴질랜드", "avgCost": 4000000},
        {"name": "인터라켄", "country": "스위스", "avgCost": 4500000},
        {"name": "치앙마이", "country": "태국", "avgCost": 1500000},
        {"name": "코타키나발루", "country": "말레이시아", "avgCost": 1700000},
    ],
    "city": [
        {"name": "도쿄", "country": "일본", "avgCost": 2500000},
        {"name": "싱가포르", "country": "싱가포르", "avgCost": 2300000},
        {"name": "홍콩", "country": "중국", "avgCost": 2000000},
        {"name": "파리", "country": "프랑스", "avgCost": 3800000},
        {"name": "뉴욕", "country": "미국", "avgCost": 5000000},
    ],
    "nature": [
        {"name": "제주도", "country": "한국", "avgCost": 800000},
        {"name": "하롱베이", "country": "베트남", "avgCost": 1400000},
        {"name": "반프", "country": "캐나다", "avgCost": 4200000},
        {"name": "크라비", "country": "태국", "avgCost": 1600000},
    ]
}


@tool
def search_destinations(travel_style: str) -> List[Dict]:
    """
    여행 스타일에 맞는 여행지를 검색합니다.
    
    Args:
        travel_style: 여행 스타일 (beach, culture, adventure, city, nature)
    
    Returns:
        여행지 목록 (이름, 국가, 평균 비용 포함)
    """
    destinations = DESTINATIONS_DB.get(travel_style.lower(), [])
    return destinations


@tool
def get_destination_details(destination_name: str) -> Dict:
    """
    특정 여행지의 상세 정보를 조회합니다.
    
    Args:
        destination_name: 여행지 이름
    
    Returns:
        여행지 상세 정보
    """
    # 모든 여행지에서 검색
    for style, destinations in DESTINATIONS_DB.items():
        for dest in destinations:
            if dest["name"].lower() == destination_name.lower():
                return {
                    **dest,
                    "style": style,
                    "highlights": _get_highlights(destination_name),
                    "bestSeason": _get_best_season(destination_name)
                }
    
    return {"error": f"'{destination_name}' 여행지를 찾을 수 없습니다."}


def _get_highlights(destination_name: str) -> List[str]:
    """여행지별 주요 명소 반환 (Mock)"""
    highlights_map = {
        "다낭": ["바나힐", "미케비치", "호이안"],
        "발리": ["우붓", "탄롯사원", "테갈랄랑 라이스테라스"],
        "교토": ["금각사", "후시미이나리", "기요미즈데라"],
        "제주도": ["한라산", "성산일출봉", "우도"],
    }
    return highlights_map.get(destination_name, ["명소1", "명소2", "명소3"])


def _get_best_season(destination_name: str) -> str:
    """여행지별 최적 시즌 반환 (Mock)"""
    season_map = {
        "다낭": "3월-8월",
        "발리": "4월-10월",
        "교토": "3월-5월, 10월-11월",
        "제주도": "4월-6월, 9월-11월",
    }
    return season_map.get(destination_name, "연중")
