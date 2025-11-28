# 🌍 Travel Guide - AI 기반 스마트 여행 플래너

> 여행 계획부터 현지 가이드까지, 당신의 완벽한 여행을 위한 올인원 솔루션

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
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

**선호도 기반 추천**
- 여행 기간, 예산, 인원, 여행 스타일(해변, 문화, 모험, 도시, 자연) 수집
- 입력된 정보를 바탕으로 최적의 여행지 추천
- 실시간 항공편 및 숙소 추천

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

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/yourusername/travel-guide-app.git
cd travel-guide-app

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 미리보기
npm run preview
```

개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.

## 📁 프로젝트 구조

```
travel-guide-app/
├── public/                 # 정적 파일
│   └── vatican-city.png   # 랜딩 페이지 배경 이미지
├── src/
│   ├── assets/            # 이미지, 폰트 등
│   ├── components/        # 재사용 가능한 컴포넌트
│   │   └── ui/           # UI 컴포넌트
│   ├── context/          # React Context
│   │   ├── AuthContext.jsx      # 인증 상태 관리
│   │   ├── TripContext.jsx      # 여행 데이터 관리
│   │   └── LanguageContext.jsx  # 다국어 지원
│   ├── lib/              # 유틸리티 함수
│   │   └── translations.js      # 번역 데이터
│   ├── pages/            # 페이지 컴포넌트
│   │   ├── LandingPage.jsx      # 랜딩 페이지
│   │   ├── LoginPage.jsx        # 로그인
│   │   ├── SignupPage.jsx       # 회원가입
│   │   ├── DashboardPage.jsx    # 대시보드
│   │   ├── PlannerPage.jsx      # 여행 플래너
│   │   ├── GuidePage.jsx        # 로컬 가이드
│   │   └── SettingsPage.jsx     # 설정
│   ├── services/         # API 서비스
│   │   └── locationService.js   # 위치 기반 서비스
│   ├── App.jsx           # 메인 앱 컴포넌트
│   ├── main.jsx          # 진입점
│   └── index.css         # 글로벌 스타일
├── tailwind.config.js    # Tailwind 설정
├── vite.config.js        # Vite 설정
└── package.json          # 프로젝트 메타데이터
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
