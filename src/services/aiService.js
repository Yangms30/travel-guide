
const AI_SERVER_URL = import.meta.env.VITE_AI_SERVER_URL || 'http://localhost:8000';

/**
 * 여행지 추천 요청
 * 
 * @param {Object} preferences - 사용자 선호도
 * @param {string} preferences.startDate - 여행 시작일 (YYYY-MM-DD)
 * @param {string} preferences.endDate - 여행 종료일 (YYYY-MM-DD)
 * @param {number} preferences.budget - 예산 (원)
 * @param {number} preferences.numberOfPeople - 인원
 * @param {string} preferences.travelStyle - 여행 스타일 (beach, culture, adventure, city, nature)
 * @returns {Promise<Object>} 추천 결과
 */
export const getDestinationRecommendations = async (preferences) => {
  try {
    console.log('🚀 AI 서버로 요청 전송:', AI_SERVER_URL);
    console.log('📦 요청 데이터:', preferences);

    const response = await fetch(`${AI_SERVER_URL}/api/recommendations/destinations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
    });

    console.log('📡 응답 상태:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ 응답 데이터:', data);

    return data;
  } catch (error) {
    console.error('❌ AI 서버 요청 실패:', error);
    throw error;
  }
};

/**
 * AI 서버 헬스 체크
 * 
 * @returns {Promise<Object>} 서버 상태
 */
export const checkAIServerHealth = async () => {
  try {
    const response = await fetch(`${AI_SERVER_URL}/api/recommendations/health`);
    
    if (!response.ok) {
      throw new Error('AI 서버 응답 없음');
    }

    return await response.json();
  } catch (error) {
    console.error('❌ AI 서버 헬스 체크 실패:', error);
    throw error;
  }
};
