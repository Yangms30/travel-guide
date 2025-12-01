"""
여행지 추천 Agent

사용자의 선호도를 바탕으로 최적의 여행지를 추천하는 Agent입니다.
LangGraph를 사용하여 구조화된 추론 과정을 거칩니다.
"""

from typing import TypedDict, Annotated, Sequence, Literal, Any
from datetime import datetime
import operator
from langchain_core.messages import BaseMessage, HumanMessage
from langgraph.graph import StateGraph, END

from langchain_core.output_parsers import JsonOutputParser
from models.schemas import DestinationInfo
from pydantic import BaseModel, Field
from typing import List

class DestinationList(BaseModel):
    destinations: List[DestinationInfo] = Field(description="List of recommended destinations")



class AgentState(TypedDict):
    """Agent 상태 정의"""
    messages: Annotated[Sequence[BaseMessage], operator.add]


class DestinationAgent(BaseAgent):
    """
    여행지 추천 Agent (StateGraph 기반)
    """
    
    def __init__(self):
        """Agent 초기화"""
        super().__init__()
        
        # Graph 정의
        workflow = StateGraph(AgentState)
        
        # Node 추가
        workflow.add_node("agent", self.call_model)
        
        # Edge 정의
        workflow.set_entry_point("agent")
        workflow.add_edge("agent", END)
        
        # 컴파일
        self.app = workflow.compile()
    

    
    def call_model(self, state: AgentState):
        """LLM 호출 Node"""
        messages = state['messages']
        response = self.llm.invoke(messages)
        return {"messages": [response]}

    def _create_system_prompt(self) -> str:
        """시스템 프롬프트"""
        return """당신은 전문 여행 컨설턴트 AI입니다.

**역할:**
사용자의 선호도를 바탕으로 최적의 여행지를 추천하고, 
구체적인 비용 breakdown과 여행 팁을 제공합니다.

**추천 프로세스:**
1. 사용자의 여행 스타일에 맞는 여행지 검색
2. 각 여행지의 항공료, 숙박비 추정
3. 총 예산 계산
4. 사용자 예산과 비교하여 적합한 여행지 필터링
5. 날씨 정보 및 시즌 이벤트 확인
6. 상위 5개 여행지 선정 및 추천

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
- 당신의 풍부한 여행 지식을 바탕으로 정확한 정보 제공
- 추천 이유는 구체적이고 설득력 있게 작성
"""
    
    async def run(self, input_data: dict[str, Any]) -> dict[str, Any]:
        """Agent 실행"""
        # 날짜 파싱
        start_date = datetime.strptime(input_data["startDate"], "%Y-%m-%d")
        end_date = datetime.strptime(input_data["endDate"], "%Y-%m-%d")
        days = (end_date - start_date).days
        
        # 예산 텍스트 포맷팅
        if input_data.get("isBudgetUndecided"):
            budget_text = "미정 (가성비 좋은 곳부터 럭셔리한 곳까지 다양하게 제안)"
        else:
            budget_text = f"₩{input_data['budget']:,} (1인당)"

        # 추가 요청사항 텍스트
        custom_request = input_data.get("customRequest", "없음")
        
        # Parser 설정
        parser = JsonOutputParser(pydantic_object=DestinationList)
        format_instructions = parser.get_format_instructions()
        
        # 프롬프트 생성
        system_prompt = self._create_system_prompt()
        user_prompt = f"""
다음 조건에 맞는 여행지를 추천해주세요:

**여행 정보:**
- 여행 기간: {input_data['startDate']} ~ {input_data['endDate']} ({days}일)
- 예산: {budget_text}
- 인원: {input_data['numberOfPeople']}명
- 동행자: {input_data['companion']}
- 여행 스타일: {input_data['travelStyle']}
- 추가 요청사항: {custom_request}

**요구사항:**
1. 위 여행 스타일과 동행자 유형에 맞는 여행지를 검색하세요
2. 각 여행지의 항공료, 숙박비를 조회하세요
3. 총 예산을 계산하고 사용자 예산과 비교하세요 (예산이 미정인 경우 다양한 가격대를 제안하세요)
4. 조건에 맞는 여행지 중 상위 5곳을 선정하세요
5. 각 여행지의 날씨와 이벤트 정보를 확인하세요
6. JSON 형식으로 결과를 반환하세요

**출력 형식:**
{format_instructions}

당신의 지식을 바탕으로 최고의 여행지를 추천해주세요!
"""
        
        # 실행
        inputs = {
            "messages": [
                ("system", system_prompt),
                ("user", user_prompt)
            ]
        }
        
        result = await self.app.ainvoke(inputs)
        
        # 결과 파싱
        return self._parse_result(result, parser)
    
    def _parse_result(self, result: dict, parser: JsonOutputParser) -> dict[str, Any]:
        """결과 파싱"""
        messages = result.get("messages", [])
        final_message = messages[-1] if messages else None
        
        if not final_message:
            return {
                "destinations": [],
                "error": "Agent가 결과를 생성하지 못했습니다."
            }
        
        try:
            # JSON 파싱
            parsed_result = parser.parse(final_message.content)
            
            # DestinationList 모델로 변환 (검증)
            if isinstance(parsed_result, list):
                 # 리스트로 바로 반환된 경우
                 destinations = parsed_result
            elif "destinations" in parsed_result:
                 # destinations 키로 감싸진 경우
                 destinations = parsed_result["destinations"]
            else:
                 destinations = []
                 
            return {
                "destinations": destinations,
                "totalCount": len(destinations)
            }
            
        except Exception as e:
            print(f"파싱 에러: {e}")
            print(f"원본 응답: {final_message.content}")
            return {
                "destinations": [],
                "error": f"결과 파싱 중 오류가 발생했습니다: {str(e)}"
            }
