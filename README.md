# 🌍 Travel Guide - AI 기반 스마트 여행 플래너 (풀스택)

> 여행 계획부터 현지 가이드까지, 당신의 완벽한 여행을 위한 올인원 솔루션

## 🏗️ 프로젝트 구조

이 프로젝트는 **모노레포(Monorepo)** 구조로, 프론트엔드와 AI 백엔드를 하나의 저장소에서 관리합니다.

```
travel-guide-app/
├── src/                          # React 프론트엔드
├── travel-guide-ai-server/       # FastAPI AI 서버
├── public/
├── package.json
└── README.md
```

### Frontend
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

### Backend (AI Server)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![LangGraph](https://img.shields.io/badge/LangGraph-0.0.20-FF6B6B?style=flat-square)](https://github.com/langchain-ai/langgraph)

[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [핵심 기능 상세](#-핵심-기능-상세)
- [다국어 지원](#-다국어-지원)
- [스크린샷](#-스크린샷)
- [개발 로드맵](#-개발-로드맵)

## 🎯 프로젝트 소개

**Travel Guide**는 여행자들이 여행 계획부터 현지 탐방까지 원활하게 진행할 수 있도록 돕는 모바일 우선 웹 애플리케이션입니다. AI 기반 추천 시스템과 GPS 기반 실시간 로컬 가이드 기능을 통해 사용자에게 맞춤형 여행 경험을 제공합니다.

### 🎨 디자인 철학

- **모바일 우선**: 모바일 환경에 최적화된 반응형 디자인
- **직관적인 UX**: 단계별 안내를 통한 쉬운 여행 계획
- **프리미엄 UI**: 현대적인 그라데이션, 애니메이션, 그리고 세련된 색상 팔레트

## ✨ 주요 기능

### 1. 🗺️ 스마트 여행 플래너

**지능형 목적지 선택 플로우**
- **여행지 확정 여부 확인**: 사용자가 이미 목적지를 정했는지 먼저 확인
  - ✅ **예**: 빠른 입력 모드 (여행 이름 + 목적지 → 일정/예산 → 완료)
  - ❌ **아니오**: AI 추천 모드 (선호도 수집 → 맞춤 추천 → 선택 → 완료)

**선호도 기반 AI 추천**
- 여행 기간, 예산, 인원, 여행 스타일(해변, 문화, 모험, 도시, 자연) 수집
- **LangGraph Agent**가 실시간으로 최적의 여행지 분석
- 항공료, 숙박비, 날씨, 이벤트 정보를 종합하여 추천
- 실시간 항공편 및 숙소 추천

### 3. 🤖 AI 추천 서버 (FastAPI + LangGraph)

### 2. 📍 GPS 기반 로컬 가이드

- **실시간 위치 추적**: 사용자의 현재 위치를 기반으로 주변 명소 탐색
- **스마트 추천**: 근처의 숨겨진 명소, 맛집, 관광지 정보 제공
- **로컬 팁**: 현지인만 아는 유용한 정보 제공
- **오디오 가이드**: 음성 안내 기능 (준비 중)

### 3. 🌐 다국어 지원

- **4개 언어 지원**: 한국어(기본), 영어, 중국어, 일본어
- **실시간 언어 전환**: 설정에서 언어 변경 시 즉시 반영
- **로컬라이제이션**: 모든 UI 요소 완전 번역

### 4. 👥 협업 기능

- 친구 초대 및 일정 공유 (준비 중)
- 실시간 일정 동기화 (준비 중)

## 🛠 기술 스택

### Frontend
- **React 19.2.0**: 최신 React 기능 활용
- **React Router DOM 7.9.6**: SPA 라우팅
- **Framer Motion 12.23.24**: 부드러운 애니메이션
- **Lucide React**: 아이콘 라이브러리

### Styling
- **Tailwind CSS 3.4.17**: 유틸리티 우선 CSS 프레임워크
- **PostCSS**: CSS 전처리
- **Custom Design System**: 브랜드 컬러 및 테마 시스템

### Build Tools
- **Vite 7.2.4**: 빠른 개발 서버 및 빌드
- **ESLint**: 코드 품질 관리

### State Management
- **React Context API**: 전역 상태 관리
  - `AuthContext`: 사용자 인증 상태
  - `TripContext`: 여행 데이터 관리
  - `LanguageContext`: 다국어 지원

### Backend (AI Server)
- **FastAPI 0.109.0**: 고성능 Python 웹 프레임워크
- **LangGraph 0.0.20**: Agent 워크플로우 관리
- **LangChain**: LLM 통합
- **Google Gemini**: AI 모델

## 🚀 시작하기

### 필수 요구사항

**Frontend:**
- Node.js 18.x 이상
- npm 또는 yarn

**Backend (AI Server):**
- Python 3.9 이상
- Google Gemini API Key

### 설치 및 실행

#### 1️⃣ 프론트엔드 (React)

```bash
# 저장소 클론
git clone https://github.com/Yangms30/travel-guide.git
cd travel-guide

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

프론트엔드는 `http://localhost:5173`에서 실행됩니다.

#### 2️⃣ AI 서버 (FastAPI)

```bash
# AI 서버 디렉토리로 이동
cd travel-guide-ai-server

# 가상 환경 생성 및 활성화
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 GOOGLE_API_KEY 입력

# 서버 실행
python main.py
```

AI 서버는 `http://localhost:8000`에서 실행됩니다.

#### 3️⃣ 전체 실행 (동시에)

```bash
# 터미널 1: 프론트엔드
npm run dev

# 터미널 2: AI 서버
cd travel-guide-ai-server && python main.py
```

### API 문서

AI 서버 실행 후 다음 URL에서 API 문서를 확인할 수 있습니다:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 📁 프로젝트 구조

```
travel-guide-app/
├── src/                         # React 프론트엔드
│   ├── assets/                  # 이미지, 폰트 등
│   ├── components/              # 재사용 가능한 컴포넌트
│   ├── context/                 # React Context
│   │   ├── AuthContext.jsx
│   │   ├── TripContext.jsx
│   │   └── LanguageContext.jsx
│   ├── lib/                     # 유틸리티 함수
│   │   └── translations.js
│   ├── pages/                   # 페이지 컴포넌트
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── PlannerPage.jsx
│   │   ├── GuidePage.jsx
│   │   └── SettingsPage.jsx
│   ├── services/                # API 서비스
│   ├── App.jsx
│   └── main.jsx
├── travel-guide-ai-server/      # FastAPI AI 서버
│   ├── agents/                  # LangGraph Agents
│   │   ├── base_agent.py
│   │   └── destination_agent.py
│   ├── tools/                   # Agent Tools
│   │   ├── search_tool.py
│   │   ├── price_tool.py
│   │   └── weather_tool.py
│   ├── models/                  # Pydantic 모델
│   │   └── schemas.py
│   ├── routers/                 # API 엔드포인트
│   │   └── recommendations.py
│   ├── config/                  # 설정
│   │   └── settings.py
│   ├── main.py                  # FastAPI 앱
│   └── requirements.txt
├── public/                      # 정적 파일
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 핵심 기능 상세

### 여행 플래너 플로우

#### 플로우 다이어그램

```
시작
  ↓
[Step 0] 여행지를 고르셨나요?
  ├─ 예 → [Step 1] 여행 이름 + 목적지
  │        ↓
  │       [Step 2] 일정 + 예산
  │        ↓
  │       [Step 3] 최종 확인 → 완료
  │
  └─ 아니오 → [Step 1] 선호도 입력
               ↓
              [Step 2] AI 추천 목적지
               ↓
              [Step 3] 일정 + 예산 확인
               ↓
              [Step 4] 최종 확인 → 완료
```

#### 선호도 수집 항목

- **여행 이름**: 여행을 식별할 수 있는 이름
- **여행 기간**: 출발일 ~ 도착일
- **예산**: ₩500,000 ~ ₩10,000,000 (슬라이더)
- **인원**: 1명 ~ N명 (+/- 버튼)
- **여행 스타일**: 
  - 🏖️ 해변 (Beach)
  - 🏛️ 문화 (Culture)
  - 🏔️ 모험 (Adventure)
  - 🏙️ 도시 (City)
  - 🌲 자연 (Nature)

### Context API 활용

#### LanguageContext

```javascript
// 사용 예시
const { t, language, changeLanguage } = useLanguage();

// 번역 키 사용
<h1>{t('dashboard.myTrips')}</h1>

// 언어 변경
changeLanguage('en'); // 'ko', 'en', 'zh', 'ja'
```

#### TripContext

```javascript
// 사용 예시
const { trips, addTrip, updateTrip, deleteTrip } = useTrip();

// 여행 추가
addTrip({
  name: '여름 휴가',
  destination: '제주도',
  startDate: '2024-07-01',
  endDate: '2024-07-05',
  budget: 1000000
});
```

## 🌐 다국어 지원

### 지원 언어

| 언어 | 코드 | 상태 |
|------|------|------|
| 한국어 | `ko` | ✅ 완료 (기본) |
| English | `en` | ✅ 완료 |
| 中文 | `zh` | ✅ 완료 |
| 日本語 | `ja` | ✅ 완료 |

### 번역 추가 방법

`src/lib/translations.js` 파일에서 새로운 키를 추가:

```javascript
export const translations = {
  ko: {
    newSection: {
      newKey: "한국어 번역"
    }
  },
  en: {
    newSection: {
      newKey: "English translation"
    }
  }
  // ... 다른 언어들
};
```

## 📸 스크린샷

### 랜딩 페이지
- 바티칸 시국 배경 이미지
- 서비스 주요 기능 소개
- "시작하기" CTA 버튼

### 대시보드
- 현재 진행 중인 여행 카드
- 예정된 여행 목록
- 하단 네비게이션 바

### 여행 플래너
- 단계별 진행 표시
- 동적 폼 입력
- 실시간 추천 시스템

### 로컬 가이드
- GPS 기반 위치 추적
- 주변 명소 정보
- 로컬 팁 제공

## 🗺️ 개발 로드맵

### ✅ 완료된 기능

- [x] 랜딩 페이지
- [x] 사용자 인증 (로그인/회원가입)
- [x] 대시보드
- [x] 스마트 여행 플래너
- [x] GPS 기반 로컬 가이드
- [x] 다국어 지원 (한/영/중/일)
- [x] 설정 페이지
- [x] 반응형 디자인

### 🚧 개발 중

- [ ] 실제 AI 추천 알고리즘 구현
- [ ] 항공편/숙소 API 연동
- [ ] 오디오 가이드 기능
- [ ] 사용자 프로필 관리

### 📅 향후 계획

- [ ] 소셜 로그인 (Google, Kakao, Naver)
- [ ] 친구 초대 및 일정 공유
- [ ] 실시간 협업 기능
- [ ] 여행 후기 및 평점 시스템
- [ ] 오프라인 모드 지원
- [ ] PWA 변환
- [ ] 백엔드 API 개발 (Node.js/Express)
- [ ] 데이터베이스 연동 (MongoDB/PostgreSQL)

## 🤝 기여하기

기여는 언제나 환영합니다! 다음 절차를 따라주세요:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 👨‍💻 개발자

**양민석**

- GitHub: [@yourusername](https://github.com/Yangms30)
- Email: yms090412@gmail.com

## 🙏 감사의 말

- [React](https://reactjs.org/) - UI 라이브러리
- [Vite](https://vitejs.dev/) - 빌드 도구
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [Lucide](https://lucide.dev/) - 아이콘
- [Framer Motion](https://www.framer.com/motion/) - 애니메이션

---

⭐ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요!
