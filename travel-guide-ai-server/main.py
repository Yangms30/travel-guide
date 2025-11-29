"""
Travel Guide AI Server

LangGraph 기반 여행 추천 AI 서버
"""

from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.settings import settings
from routers import recommendations

# FastAPI 앱 생성
app = FastAPI(
    title="Travel Guide AI Server",
    description="LangGraph 기반 지능형 여행 추천 시스템",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(recommendations.router)


@app.get("/", tags=["root"])
async def root():
    """
    루트 엔드포인트
    
    Returns:
        서버 정보
    """
    return {
        "message": "Travel Guide AI Server",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "running"
    }


@app.get("/health", tags=["health"])
async def health_check():
    """
    헬스 체크 엔드포인트
    
    Returns:
        서버 상태
    """
    return {
        "status": "healthy",
        "service": "Travel Guide AI Server"
    }


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
