"""
기본 Agent 클래스

모든 Agent가 상속받는 베이스 클래스입니다.
"""
from langchain_teddynote import logging
from abc import ABC, abstractmethod
from typing import List, Dict, Any
from langchain_openai import ChatOpenAI
from config.settings import settings

logging.langsmith("everywhere-guide")

class BaseAgent(ABC):
    """
    Agent 기본 클래스
    
    모든 Agent는 이 클래스를 상속받아 구현합니다.
    """
    
    def __init__(self, model_name: str = "gpt-4o-mini", temperature: float = 0.7):
        """
        Agent 초기화
        
        Args:
            model_name: 사용할 LLM 모델 이름
            temperature: 생성 온도 (0.0 ~ 1.0)
        """
        self.llm = ChatOpenAI(
            model=model_name,
            temperature=temperature,
            api_key=settings.OPENAI_API_KEY
        )
        self.tools = self._initialize_tools()
    
    @abstractmethod
    def _initialize_tools(self) -> List:
        """
        Agent가 사용할 Tools를 초기화합니다.
        
        Returns:
            Tool 리스트
        """
        pass
    
    @abstractmethod
    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Agent를 실행합니다.
        
        Args:
            input_data: 입력 데이터
        
        Returns:
            실행 결과
        """
        pass
    
    def _create_system_prompt(self) -> str:
        """
        시스템 프롬프트를 생성합니다.
        
        Returns:
            시스템 프롬프트 문자열
        """
        return "당신은 도움이 되는 AI 어시스턴트입니다."
