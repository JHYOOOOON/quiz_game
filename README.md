# Quiz

홈에서 선택한 옵션을 바탕으로 퀴즈를 풀고, 그에 대한 결과를 받아볼 수 있는 프로젝트

## 기술스택

- React, Typescript
- React-Query, Jotai
- Styled-components
- chart.js
- Jest, React Testing Library

## 스크린샷

1. 메인

   <img width="360" alt="스크린샷 2024-02-15 오후 1 20 59" src="https://github.com/JHYOOOOON/quiz_game/assets/50460114/cee1cc89-195e-4934-83c3-2582366e84d3">

2. 퀴즈

   <img width="360" alt="스크린샷 2024-02-15 오후 1 21 09" src="https://github.com/JHYOOOOON/quiz_game/assets/50460114/81f679d2-4216-401b-b00c-5cf4018c2c6e">

3. 결과

   <img width="360" alt="스크린샷 2024-02-15 오후 1 21 25" src="https://github.com/JHYOOOOON/quiz_game/assets/50460114/77e2107d-c2b3-45c4-97e4-611df96cbd54">

## 실행방법

```zsh
git clone https://github.com/JHYOOOOON/quiz_game.git
npm install
npm start

// 전체 테스트
npm test
// components만 테스트
npm run test:components
// pages만 테스트
npm run test:pages
```

## 그 외

- 웹접근성을 고려한 Tab키 조작
  - `selectbox` 커스텀
  - 화살표 위, 아래키로 옵션 내 포커스 이동 및 `enter` 키로 옵션 선택 가능
  - `esc` 키 입력, `selectbox` 외부 클릭으로 닫힘 처리
- 기능 요구사항 및 컴포넌트 동작 확인을 위한 단위테스트 진행
  - Jest, React-Testing-Library를 이용
  - 렌더링 및 각 컴포넌트 내 중요 기능 위주로 테스트 진행
- `useSuspenseQuery`와 `Suspense`를 이용한 loading 처리
