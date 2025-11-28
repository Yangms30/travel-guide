"""
설정 관리 모듈

환경 변수를 로드하고 애플리케이션 설정을 관리합니다.
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """애플리케이션 설정"""
    
    # API Keys
    GOOGLE_API_KEY: str
    
    # Server Settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    
    # CORS Settings
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:3000"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
    
    @property
    def origins_list(self) -> List[str]:
        """CORS 허용 오리진 리스트 반환"""
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]


# 전역 설정 인스턴스
settings = Settings()
