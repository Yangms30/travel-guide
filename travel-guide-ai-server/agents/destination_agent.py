"""
여행지 추천 Agent

사용자의 선호도를 바탕으로 최적의 여행지를 추천하는 Agent입니다.
LangGraph를 사용하여 구조화된 추론 과정을 거칩니다.
"""

from typing import Dict, Any, List
from datetime import datetime
from langgraph.prebuilt import create_react_agent
from agents.base_agent import BaseAgent
from tools.search_tool import search_destinations, get_destination_details
from tools.price_tool import get_flight_price, get_accommodation_price, calculate_total_budget
from tools.weather_tool import get_weather_forecast, check_seasonal_events


class DestinationAgent(BaseAgent):
    """
    여행지 추천 Agent
    
    사용자의 선호도(예산, 인원, 여행 스타일, 날짜)를 분석하여
    최적의 여행지를 추천합니다.
    """
    
    def __init__(self):
        """Agent 초기화"""
        super().__init__(model_name="gemini-pro", temperature=0.7)
        self.agent_executor = create_react_agent(
            self.llm,
            self.tools,
            state_modifier=self._create_system_prompt()
        )
    
    def _initialize_tools(self) -> List:
        """
        Agent가 사용할 Tools 초기화
        
        Returns:
            Tool 리스트
        """
        return [
            search_destinations,
            get_destination_details,
            get_flight_price,
            get_accommodation_price,
            calculate_total_budget,
            get_weather_forecast,
            check_seasonal_events,
        ]
    
    def _create_system_prompt(self) -> str:
        """
        시스템 프롬프트 생성
        
        Returns:
            시스템 프롬프트
        """
        return """당신은 전문 여행 컨설턴트 AI입니다.

**역할:**
사용자의 선호도를 바탕으로 최적의 여행지를 추천하고, 
구체적인 비용 breakdown과 여행 팁을 제공합니다.

**추천 프로세스:**
1. 사용자의 여행 스타일에 맞는 여행지 검색 (search_destinations)
2. 각 여행지의 항공료 조회 (get_flight_price)
3. 숙박비 조회 (get_accommodation_price)
4. 총 예산 계산 (calculate_total_budget)
5. 사용자 예산과 비교하여 적합한 여행지 필터링
6. 날씨 정보 확인 (get_weather_forecast)
7. 시즌 이벤트 확인 (check_seasonal_events)
8. 상위 5개 여행지 선정 및 추천

**출력 형식:**
각 추천 여행지에 대해 다음 정보를 JSON 형식으로 제공:
- name: 여행지 이름
- country: 국가
- estimatedCost: 예상 총 비용
- flightCost: 항공료
- accommodationCost: 숙박비
- highlights: 주요 명소 리스트
- reason: 추천 이유 (구체적으로)
- bestSeason: 최적 시즌
- weather: 예상 날씨
- tips: 여행 팁 리스트

**중요:**
- 반드시 사용자 예산 내에서 추천
- 실제 Tool을 사용하여 정확한 정보 제공
- 추천 이유는 구체적이고 설득력 있게 작성
"""
    
    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Agent 실행
        
        Args:
            input_data: 사용자 선호도
                - startDate: 여행 시작일
                - endDate: 여행 종료일
                - budget: 예산
                - numberOfPeople: 인원
                - travelStyle: 여행 스타일
        
        Returns:
            추천 결과
        """
        # 날짜 파싱
        start_date = datetime.strptime(input_data["startDate"], "%Y-%m-%d")
        end_date = datetime.strptime(input_data["endDate"], "%Y-%m-%d")
        days = (end_date - start_date).days
        month = start_date.month
        
        # 프롬프트 생성
        user_prompt = f"""
다음 조건에 맞는 여행지를 추천해주세요:

**여행 정보:**
- 여행 기간: {input_data['startDate']} ~ {input_data['endDate']} ({days}일)
- 예산: ₩{input_data['budget']:,}
- 인원: {input_data['numberOfPeople']}명
- 여행 스타일: {input_data['travelStyle']}

**요구사항:**
1. 위 여행 스타일에 맞는 여행지를 검색하세요
2. 각 여행지의 항공료, 숙박비를 조회하세요
3. 총 예산을 계산하고 사용자 예산과 비교하세요
4. 예산 내 여행지 중 상위 5곳을 선정하세요
5. 각 여행지의 날씨와 이벤트 정보를 확인하세요
6. JSON 형식으로 결과를 반환하세요

반드시 Tools를 사용하여 정확한 정보를 제공하세요!
"""
        
        # Agent 실행
        result = await self.agent_executor.ainvoke({
            "messages": [("user", user_prompt)]
        })
        
        # 결과 파싱
        return self._parse_result(result, input_data)
    
    def _parse_result(self, result: Dict, input_data: Dict) -> Dict[str, Any]:
        """
        Agent 결과 파싱
        
        Args:
            result: Agent 실행 결과
            input_data: 원본 입력 데이터
        
        Returns:
            파싱된 결과
        """
        # Agent의 최종 메시지 추출
        messages = result.get("messages", [])
        final_message = messages[-1] if messages else None
        
        if not final_message:
            return {
                "destinations": [],
                "error": "Agent가 결과를 생성하지 못했습니다."
            }
        
        # 메시지 내용 추출
        content = final_message.content if hasattr(final_message, 'content') else str(final_message)
        
        # 간단한 파싱 (실제로는 더 정교한 파싱 필요)
        # 여기서는 Mock 데이터 반환
        return self._generate_mock_recommendations(input_data)
    
    def _generate_mock_recommendations(self, input_data: Dict) -> Dict[str, Any]:
        """
        Mock 추천 결과 생성 (개발/테스트용)
        
        실제 프로덕션에서는 Agent의 실제 결과를 파싱하여 사용
        """
        style = input_data["travelStyle"]
        budget = input_data["budget"]
        
        # 스타일별 추천 (간단한 로직)
        recommendations = {
            "beach": [
                {
                    "name": "다낭",
                    "country": "베트남",
                    "estimatedCost": 1800000,
                    "flightCost": 700000,
                    "accommodationCost": 600000,
                    "highlights": ["바나힐", "미케비치", "호이안"],
                    "reason": "예산 내 최적의 해변 여행지. 8월 국제 불꽃축제 개최로 특별한 경험 가능",
                    "bestSeason": "3월-8월",
                    "weather": "평균 30°C, 맑음, 우기 시작",
                    "tips": ["우기 시작 시기이므로 우산 준비", "선크림 필수", "현지 투어 추천"]
                },
                {
                    "name": "발리",
                    "country": "인도네시아",
                    "estimatedCost": 2100000,
                    "flightCost": 900000,
                    "accommodationCost": 720000,
                    "highlights": ["우붓", "탄롯사원", "테갈랄랑 라이스테라스"],
                    "reason": "문화와 자연이 어우러진 완벽한 휴양지",
                    "bestSeason": "4월-10월",
                    "weather": "평균 28°C, 습함",
                    "tips": ["사원 방문 시 긴 옷 준비", "스쿠터 렌트 추천", "우붓 전통 시장 필수"]
                }
            ],
            "culture": [
                {
                    "name": "교토",
                    "country": "일본",
                    "estimatedCost": 2300000,
                    "flightCost": 800000,
                    "accommodationCost": 900000,
                    "highlights": ["금각사", "후시미이나리", "기요미즈데라"],
                    "reason": "일본 전통 문화의 중심지, 역사적 사찰과 정원",
                    "bestSeason": "3월-5월, 10월-11월",
                    "weather": "평균 28°C, 무덥고 습함",
                    "tips": ["JR 패스 구매 추천", "사찰 입장료 준비", "교토 버스 1일권 활용"]
                }
            ],
            "city": [
                {
                    "name": "도쿄",
                    "country": "일본",
                    "estimatedCost": 2800000,
                    "flightCost": 800000,
                    "accommodationCost": 1200000,
                    "highlights": ["시부야", "아사쿠사", "도쿄타워"],
                    "reason": "현대와 전통이 공존하는 역동적인 도시",
                    "bestSeason": "3월-5월, 9월-11월",
                    "weather": "평균 26°C",
                    "tips": ["Suica 카드 구매", "츠키지 시장 아침 방문", "야경 명소 추천"]
                }
            ],
            "nature": [
                {
                    "name": "제주도",
                    "country": "한국",
                    "estimatedCost": 1000000,
                    "flightCost": 300000,
                    "accommodationCost": 480000,
                    "highlights": ["한라산", "성산일출봉", "우도"],
                    "reason": "국내 최고의 자연 여행지, 저렴한 비용",
                    "bestSeason": "4월-6월, 9월-11월",
                    "weather": "평균 26°C",
                    "tips": ["렌터카 필수", "올레길 트레킹", "해산물 맛집 탐방"]
                }
            ],
            "adventure": [
                {
                    "name": "치앙마이",
                    "country": "태국",
                    "estimatedCost": 1700000,
                    "flightCost": 600000,
                    "accommodationCost": 450000,
                    "highlights": ["정글 트레킹", "코끼리 보호구역", "짚라인"],
                    "reason": "저렴한 비용으로 다양한 액티비티 체험 가능",
                    "bestSeason": "11월-2월",
                    "weather": "평균 25°C",
                    "tips": ["트레킹 투어 예약", "편한 신발 필수", "모기 퇴치제 준비"]
                }
            ]
        }
        
        # 스타일에 맞는 추천 가져오기
        destinations = recommendations.get(style, recommendations["beach"])
        
        # 예산 필터링
        filtered = [d for d in destinations if d["estimatedCost"] <= budget * 1.1]  # 10% 여유
        
        return {
            "destinations": filtered[:5],  # 상위 5개
            "totalCount": len(filtered)
        }
