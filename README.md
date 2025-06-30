# 아이오트리스트 과제

## 사용한 기술 스택

### Vite + React

SSR이나 SEO 같은 세부 기능이 요구되지 않아, 간단하고 빠르게 개발할 수 있는 Vite와 React 조합을 선택했습니다.

### Tailwind CSS

빠르게 퍼블리싱하고 반복적인 스타일링 작업을 줄이기 위해 Tailwind CSS를 사용했습니다.

### TanStack Query

낙관적 업데이트가 필요한 부분에서 사용자 경험을 개선할 수 있었고, 동시에 데이터 패칭과 캐싱 관리가 편리해 사용했습니다.

## 프로젝트 실행 및 빌드 방법 설명

### 환경별 설정

- `.env.dev` - 개발 환경 설정
- `.env.stage` - 스테이징 환경 설정
- `.env.prod` - 프로덕션 환경 설정

npm을 사용하여 예시를 적었는데 패키지매니저는 아무거나 사용해도 무관합니다.

### Dev 환경

#### 개발서버 실행

```bash
npm run dev
```

#### 빌드

```bash
npm run build:dev
```

### Stage 환경

#### 개발서버 실행

```bash
npm run dev:stage
```

#### 빌드

```bash
npm run build:stage
```

### Prod 환경

#### 개발서버 실행

```bash
npm run dev:prod
```

#### 빌드

```bash
npm run build:prod
```

### 기타 명령어

#### 린트 검사

```bash
npm run lint
```

#### 빌드 결과 미리보기

```bash
npm run preview
```

## AI 사용

코파일럿을 사용해 작업했습니다.
필요할 것 같은 컴포넌트가 떠오르면 뼈대를 먼저 작성한 뒤,

```js
// 예시
function ModalRoot() {}
function ModalBackdrop() {}
function ModalBody() {}
```

처럼 구조만 만든 다음, “위의 컴포넌트의 내용을 채워줘.”라는 식으로 프롬프트를 작성해 내용을 보완했습니다.

또 다른 방식으로는 다음과 같은 형태의 객체를 먼저 작성한 후,

```json
{
  "id": "buy-cryptocurrency",
  "name": "Buy Cryptocurrency",
  "icon": "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_buy.png",
  "description": {
    "en": "A service that allows you to easily and safely purchase 100+ cryptocurrencies through a network of various partners."
  },
  "visibility": {
    "platform": {
      "android": true
    },
    "language": {
      "en": true
    }
  }
}
```

“데이터 노출 조건을 확인하기 위해 visibility라는 옵션을 넣었는데, 이런 방식이 괜찮을까?”처럼 구조나 설계 방향에 대한 검토 용도로도 활용했습니다.

## 구현한 주요 요소 설명

### 아키텍처 설계

FSD(Feature-Sliced Design) 아키텍처를 참고하여 코드 파편화를 방지했습니다. 화면의 각 요소를 위젯으로 간주하고, 관련된 모든 코드들을 하나의 위젯 폴더에 집중시켰습니다.

ex) dapp-list

```
dapp-list/
├── index.tsx          # 메인 컴포넌트
├── apis/              # API 관련 코드
│   └── dapp-list/
│       ├── api.ts     # API 함수
│       └── schema.ts  # 타입 정의
├── uis/               # UI 컴포넌트
│   └── detail-bottom-sheet/
└── utils/             # 유틸리티 함수
    └── filter-dapp-list.ts
```

### 1. 다국어 지원 (i18n)

`react-i18next`를 사용하여 한국어/영어 다국어 지원을 구현했습니다.

- 브라우저 언어 감지 및 기본 언어 설정
- 우측 상단 토글 버튼으로 언어 전환 가능
- 모든 텍스트와 DApp 설명이 언어별로 표시

### 2. 환경별 조건부 렌더링

DApp 데이터에 `visibility` 옵션을 도입하여 다양한 조건에 따른 노출 제어를 구현했습니다.

- **플랫폼별**: `android`, `ios`, `web` 환경에 따른 표시/숨김
- **언어별**: `ko`, `en` 언어에 따른 표시/숨김
- **환경별**: `dev`, `stage`, `prod` 빌드 환경에 따른 표시/숨김

```json
visibility: {
  platform: { android: true },
  language: { en: true },
  environment: { dev: true, stage: true }
}
```

### 3. 상태 관리 (Jotai)

전역 상태 관리를 위해 Jotai를 사용했습니다.

- `currentDeviceAtom`: 현재 디바이스 타입 (android/ios/web)
- `currentLanguageAtom`: 현재 언어 설정 (ko/en)
- 각 컴포넌트에서 atom을 구독하여 반응형 UI 구현

### 4. 데이터 페칭 및 캐싱 (TanStack Query)

API 호출과 데이터 캐싱을 위해 TanStack Query를 사용했습니다.
API 호출시 DEV 환경에서는 MOCK 데이터가 반환되도록 작업했습니다.

### 5. UI 컴포넌트

재사용 가능한 공통 UI 컴포넌트들을 구현했습니다.

- **Modal**: 기본 모달 컴포넌트
- **BottomSheet**: 모바일 친화적인 하단 시트 (Framer Motion 활용)
- **Button**: variant, color, size 옵션을 가진 버튼 컴포넌트

### 6. 배너 슬라이더 (Swiper)

Swiper.js를 사용하여 자동 재생되는 배너 슬라이더를 구현했습니다.

- 자동 슬라이드 및 무한 루프
- 배너 클릭 시 외부 링크 새 창으로 열기
- 언어별 링크 지원

### 7. 즐겨찾기 기능

사용자가 즐겨찾기를 관리할 수 있는 기능을 구현했습니다.

- 즐겨찾기 목록 표시
- 삭제 확인 모달
- TanStack Query의 낙관적 업데이트로 즉시 UI 반영

### 8. DApp 상세 정보

각 DApp을 클릭하면 하단 시트로 상세 정보를 표시합니다.

- 지원하는 네트워크 정보 표시
- 언어별 설명 제공
- 부드러운 애니메이션 효과 (Framer Motion)
