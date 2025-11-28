"""
API 테스트 스크립트

FastAPI 서버를 테스트합니다.
"""

import httpx
import asyncio
import json


async def test_recommendations():
    """여행지 추천 API 테스트"""
    
    url = "http://localhost:8000/api/recommendations/destinations"
    
    # 테스트 데이터
    test_data = {
        "startDate": "2024-08-01",
        "endDate": "2024-08-07",
        "budget": 2000000,
        "numberOfPeople": 2,
        "travelStyle": "beach"
    }
    
    print("=" * 60)
    print("여행지 추천 API 테스트")
    print("=" * 60)
    print(f"\n요청 데이터:")
    print(json.dumps(test_data, indent=2, ensure_ascii=False))
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, json=test_data, timeout=30.0)
            response.raise_for_status()
            
            result = response.json()
            
            print(f"\n응답 상태: {response.status_code}")
            print(f"처리 시간: {result.get('totalProcessingTime', 0):.2f}초")
            print(f"\n추천 여행지 ({len(result['destinations'])}곳):")
            print("=" * 60)
            
            for i, dest in enumerate(result['destinations'], 1):
                print(f"\n{i}. {dest['name']}, {dest['country']}")
                print(f"   예상 비용: ₩{dest['estimatedCost']:,}")
                print(f"   항공료: ₩{dest['flightCost']:,}")
                print(f"   숙박비: ₩{dest['accommodationCost']:,}")
                print(f"   추천 이유: {dest['reason']}")
                print(f"   주요 명소: {', '.join(dest['highlights'])}")
                print(f"   날씨: {dest.get('weather', 'N/A')}")
                print(f"   팁: {', '.join(dest.get('tips', []))}")
            
        except httpx.HTTPError as e:
            print(f"\n❌ 오류 발생: {e}")
        except Exception as e:
            print(f"\n❌ 예상치 못한 오류: {e}")


async def test_health():
    """헬스 체크 테스트"""
    
    url = "http://localhost:8000/api/recommendations/health"
    
    print("\n" + "=" * 60)
    print("헬스 체크 테스트")
    print("=" * 60)
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status()
            
            result = response.json()
            print(f"\n상태: {result.get('status')}")
            print(f"Agent: {result.get('agent')}")
            print(f"Tools 개수: {result.get('tools_count')}")
            
        except Exception as e:
            print(f"\n❌ 오류: {e}")


async def main():
    """메인 함수"""
    print("\n🚀 Travel Guide AI Server 테스트 시작\n")
    
    # 헬스 체크
    await test_health()
    
    # 추천 API 테스트
    await test_recommendations()
    
    print("\n" + "=" * 60)
    print("✅ 테스트 완료")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    asyncio.run(main())
