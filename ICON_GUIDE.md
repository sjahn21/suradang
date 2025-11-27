# PWA 아이콘 생성 가이드

## 📱 필요한 아이콘

PWA로 설치하려면 다음 아이콘 파일이 필요합니다:

1. **icon-192.png** (192x192 픽셀)
2. **icon-512.png** (512x512 픽셀)

---

## 🎨 아이콘 만드는 방법

### 방법 1: 온라인 도구 사용 (가장 쉬움!)

**추천 사이트:**
- [Favicon.io](https://favicon.io/favicon-generator/)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)

**단계:**
1. 사이트 접속
2. 텍스트 또는 이미지 업로드
   - 텍스트 예: "수라당" 또는 "🥮"
   - 배경색: #667eea (보라색)
3. 192x192, 512x512 크기로 다운로드
4. 파일명을 `icon-192.png`, `icon-512.png`로 변경

---

### 방법 2: 간단한 아이콘 직접 만들기

**Canva 사용:**
1. [Canva.com](https://canva.com) 접속
2. "Custom Size" 선택
   - 512 x 512 픽셀로 설정
3. 디자인 생성:
   - 배경색: #667eea
   - 이모지 추가: 🥮
   - 또는 텍스트: "수라당"
4. 다운로드 (PNG)
5. 온라인 도구로 192x192 크기도 생성

---

### 방법 3: 단색 아이콘 (임시용)

**가장 빠른 방법:**
1. 아래 링크로 단순 아이콘 생성
2. https://via.placeholder.com/512/667eea/ffffff?text=🥮
3. 다운로드하여 사용

---

## 📋 아이콘 없이 테스트하기

아이콘 없이도 PWA는 작동합니다!

**임시 방법:**
1. manifest.json에서 icons 섹션 삭제
2. 또는 기본 파비콘 사용

**하지만:**
- 홈 화면 아이콘이 기본 이미지로 표시됨
- 전문성이 떨어짐

---

## ✅ 파일 배치

모든 파일을 같은 폴더에 배치:

```
/
├── index.html
├── manifest.json
├── sw.js
├── icon-192.png
└── icon-512.png
```

---

## 🚀 GitHub Pages에 업로드

1. 모든 파일을 GitHub 저장소에 업로드
2. Settings → Pages 활성화
3. 완료!

---

## 📱 안드로이드에서 설치하기

### 방법 1: 자동 설치 프롬프트
1. 웹사이트 접속
2. "홈 화면에 추가" 버튼 자동 표시
3. 버튼 클릭
4. 확인

### 방법 2: Chrome 메뉴에서
1. Chrome으로 웹사이트 접속
2. 우측 상단 메뉴 (⋮) 클릭
3. "홈 화면에 추가" 또는 "앱 설치" 선택
4. 이름 확인 후 "추가" 클릭

### 방법 3: 공유 메뉴에서
1. 공유 버튼 클릭
2. "홈 화면에 추가" 선택

---

## 🍎 iOS에서 사용하기

iOS Safari는 PWA 설치를 다르게 처리합니다:

1. Safari로 웹사이트 접속
2. 하단 공유 버튼 클릭
3. "홈 화면에 추가" 선택
4. 이름 확인 후 "추가" 클릭

**참고:** iOS는 자동 설치 프롬프트를 지원하지 않습니다.

---

## 🔍 설치 확인

**안드로이드:**
- 앱 드로어에서 "수라당 계산기" 확인
- 홈 화면에 아이콘 추가됨
- 앱처럼 전체 화면으로 실행

**특징:**
- ✅ 오프라인 작동
- ✅ 빠른 로딩 (캐시 사용)
- ✅ 홈 화면 아이콘
- ✅ 전체 화면 (주소창 없음)
- ✅ 네이티브 앱처럼 보임

---

## 🛠 문제 해결

### "홈 화면에 추가" 버튼이 안 보여요
- HTTPS 필요 (GitHub Pages는 자동 HTTPS)
- manifest.json 파일 확인
- Service Worker 등록 확인

### 설치했는데 아이콘이 이상해요
- icon-192.png, icon-512.png 확인
- 파일명 정확히 확인
- 브라우저 캐시 삭제 후 재시도

### 오프라인에서 작동 안 해요
- Service Worker 등록 확인
- 브라우저 개발자 도구 → Application → Service Workers 확인

---

## 💡 추가 개선사항

### 스플래시 스크린
manifest.json에 이미 설정되어 있습니다:
- 배경색: #667eea (보라색)
- 앱 이름 표시

### 알림 기능 (선택사항)
나중에 추가 가능:
- 계산 결과 저장 알림
- 일일 사용 통계
- 업데이트 알림

---

## 📚 더 알아보기

- [PWA 공식 문서](https://web.dev/progressive-web-apps/)
- [Google PWA 체크리스트](https://web.dev/pwa-checklist/)
- [MDN PWA 가이드](https://developer.mozilla.org/ko/docs/Web/Progressive_web_apps)
