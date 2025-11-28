# Travel Guide AI Server

> LangGraph 기반 여행 추천 AI 서버

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [API 문서](#-api-문서)
- [프로젝트 구조](#-프로젝트-구조)

## 🎯 프로젝트 소개

Travel Guide AI Server는 LangGraph를 활용한 지능형 여행 추천 시스템입니다.
사용자의 선호도를 분석하여 최적의 여행지를 추천하고, 실시간 정보를 제공합니다.

## ✨ 주요 기능

### 1. 🤖 지능형 여행지 추천 Agent
- 사용자 선호도 기반 맞춤 추천
- 실시간 항공료 및 숙박비 조회
- 예산 최적화 알고리즘
- 날씨 및 시즌 정보 제공

### 2. 🛠️ Tools
- **SearchTool**: 여행지 데이터베이스 검색
- **PriceTool**: 항공료 및 숙박비 조회
- **WeatherTool**: 날씨 정보 조회
- **BudgetTool**: 총 예산 계산

## 🛠 기술 스택

- **Framework**: FastAPI 0.109.0
- **AI/Agent**: LangGraph, LangChain, Google Gemini
- **Python**: 3.9+

## 🚀 시작하기

### 필수 요구사항

- Python 3.9 이상
- Google Gemini API Key

### 설치

```bash
# 1. 저장소 클론
cd travel-guide-ai-server

# 2. 가상 환경 생성
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. 의존성 설치
pip install -r requirements.txt

# 4. 환경 변수 설정
cp .env.example .env
# .env 파일에 API 키 입력
```

### 실행

```bash
# 개발 서버 실행
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

서버는 `http://localhost:8000`에서 실행됩니다.

## 📚 API 문서

서버 실행 후 다음 URL에서 API 문서를 확인할 수 있습니다:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 주요 엔드포인트

#### POST /api/recommendations/destinations
여행지 추천 요청

**Request Body:**
```json
{
  "startDate": "2024-08-01",
  "endDate": "2024-08-07",
  "budget": 2000000,
  "numberOfPeople": 2,
  "travelStyle": "beach"
}
```

**Response:**
```json
{
  "destinations": [
    {
      "name": "다낭, 베트남",
      "estimatedCost": 1800000,
      "highlights": ["바나힐", "미케비치", "호이안"],
      "reason": "예산 내 최적, 8월 불꽃축제"
    }
  ]
}
```

## 📁 프로젝트 구조

```
travel-guide-ai-server/
├── main.py                      # FastAPI 앱 진입점
├── config/
│   └── settings.py              # 설정 관리
├── agents/
│   ├── base_agent.py            # 기본 Agent 클래스
│   └── destination_agent.py     # 여행지 추천 Agent
├── tools/
│   ├── search_tool.py           # 여행지 검색 Tool
│   ├── price_tool.py            # 가격 조회 Tool
│   └── weather_tool.py          # 날씨 조회 Tool
├── models/
│   └── schemas.py               # Pydantic 모델
├── routers/
│   └── recommendations.py       # API 엔드포인트
└── utils/
    └── helpers.py               # 유틸리티 함수
```

## 🔧 개발 가이드

### Agent 추가하기

1. `agents/` 디렉토리에 새 Agent 파일 생성
2. `BaseAgent` 클래스 상속
3. `run()` 메서드 구현

### Tool 추가하기

1. `tools/` 디렉토리에 새 Tool 파일 생성
2. LangChain Tool 형식으로 구현
3. Agent에 Tool 등록

## 📝 라이선스

MIT License

## 👨‍💻 개발자

Yang Minseok
- GitHub: [@Yangms30](https://github.com/Yangms30)

---

⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!
