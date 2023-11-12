# Shion Twitter Clone Project

## 개요

이 프로젝트는 Next.js, TypeScript, Prisma, Tailwind CSS, 그리고 기타 여러 기술들을 활용한 트위터 클론 프로젝트입니다. 아래는 프로젝트의 주요 구조와 기능에 대한 개요입니다.

## 폴더 구조

```plaintext
📦src
 ┣ 📂components
 ┃ ┣ 📜button.tsx
 ┃ ┣ 📜header.tsx
 ┃ ┣ 📜input.tsx
 ┃ ┣ 📜item.tsx
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜navbar.tsx
 ┃ ┗ 📜textarea.tsx
 ┣ 📂lib
 ┃ ┣ 📂client
 ┃ ┃ ┣ 📜useMutation.tsx
 ┃ ┃ ┣ 📜useUser.ts
 ┃ ┃ ┗ 📜utils.ts
 ┃ ┣ 📂server
 ┃ ┃ ┣ 📜client.ts
 ┃ ┃ ┣ 📜db.ts
 ┃ ┃ ┣ 📜withHandler.ts
 ┃ ┃ ┗ 📜withSession.ts
 ┃ ┗ 📜utils.ts
 ┣ 📂pages
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂tweets
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┃ ┗ 📜like.ts
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┗ 📂users
 ┃ ┃ ┃ ┣ 📜create-account.ts
 ┃ ┃ ┃ ┣ 📜log-in.ts
 ┃ ┃ ┃ ┗ 📜me.tsx
 ┃ ┣ 📂create-account
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂likes
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂log-in
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂search
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂tweets
 ┃ ┃ ┣ 📜[id].tsx
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜post.tsx
 ┃ ┣ 📂users
 ┃ ┃ ┗ 📂profile
 ┃ ┃ ┃ ┣ 📜[id].tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📜_app.tsx
 ┃ ┣ 📜_document.tsx
 ┃ ┗ 📜index.tsx
 ┗ 📂styles
 ┃ ┗ 📜globals.css
```

## 주요 기능

### 로그인 및 회원가입

- 사용자 인증을 위한 로그인 및 회원가입 기능이 구현되어 있습니다.
- 이메일 중복 체크 및 기타 회원가입 관련 기능이 제공됩니다.

### 트윗 및 관심 목록

- 트윗 업로드와 좋아요(관심 목록 추가) 기능을 포함하고 있습니다.
- 관심 목록 페이지에서 한 번에 모든 관심 목록을 확인할 수 있습니다.

### 페이지 구성

- 다양한 페이지가 프로젝트에 구현되어 있습니다.
  - 메인 페이지, 트윗 페이지, 사용자 프로필 페이지 등이 포함되어 있습니다.
  - API 라우트를 사용하여 데이터를 처리하고 페이지 간의 네비게이션을 관리합니다.

## 개발 환경

- **프레임워크:** Next.js, React, TypeScript
- **데이터베이스:** SQLite

## 설치 및 실행

1. 프로젝트를 클론합니다.
2. 의존성 패키지를 설치하려면 `npm install` 명령어를 실행합니다.
3. 데이터베이스 마이그레이션을 수행하려면 `npx prisma migrate` 명령어를 실행합니다.
4. 클라이언트 코드를 생성하려면 `npx prisma generate` 명령어를 실행합니다.
5. 애플리케이션을 실행하려면 `npm run dev` 명령어를 실행합니다.

## 기여 방법

이 프로젝트에 기여하려면 다음 단계를 따르세요:

1. 이 저장소를 포크합니다.
2. 새로운 브랜치를 만들어 변경 사항을 작업합니다.
3. 변경 사항을 커밋하고 푸시합니다.
4. Pull Request를 생성합니다.

## 라이선스

이 프로젝트는 MIT 라이선스에 따라 배포됩니다.
