# Hyunjoon Lee — Developer Portfolio

이현준의 Android·AI/머신러닝·풀스택 개발 경험을 소개하는 한국어 포트폴리오입니다. 처음 제공된 요구사항의 경력, 자격 상태, 프로젝트 설명만 반영했습니다. 디자인은 추후 교체할 수 있는 기본 다크 네이비 테마입니다.

## 기술과 페이지

Next.js 16.4.0 App Router, React 19.3.0, TypeScript, Tailwind CSS 4, Lucide React를 사용합니다. Motion 패키지 대신 CSS 애니메이션을 사용하며 prefers-reduced-motion을 지원합니다.

홈, 프로젝트 목록, AIRPTCoach·Al2Beat·SUMO 상세, About, Experience, Contact 및 404를 제공합니다. 모바일 메뉴, 프로젝트 필터, 외부 링크, 이메일 링크, 페이지별 SEO, sitemap/robots를 구현했습니다. 실제 이력서 PDF가 없으면 다운로드 링크를 숨깁니다.

## 폴더 구조

```text
src/
  app/                   페이지, 메타데이터, 중앙 디자인 토큰 및 CSS
    projects/[slug]/     generateStaticParams로 세 상세 페이지 생성
  components/
    common/              링크, 제목, 미디어, 이력서, 타임라인
    layout/              Header, Footer, Navigation, MobileMenu
    home/                Hero와 홈 섹션
    projects/            카드, 필터 및 상세 콘텐츠
  data/                  프로필, 프로젝트, 기술, 활동, 자격증 데이터
  lib/                   메타데이터 및 빌드 시 PDF 검사 API
  types/                 프로젝트 타입
public/
  images/projects/       실제 프로젝트 이미지 추가 위치
  resume/                resume.pdf 추가 위치
scripts/                 프로젝트·정적 파일 검사와 로컬 미리보기
.github/workflows/       GitHub Pages 자동 배포
```

## Windows 로컬 실행

Node.js 24 이상을 설치하고 VS Code에서 프로젝트 폴더를 엽니다.

```powershell
npm.cmd ci
npm.cmd run dev
```

개발 주소는 터미널에 표시됩니다. 정적 배포물은 다음 명령으로 검사합니다.

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run preview
```

빌드하면 out에 정적 파일을 생성하고 필수 페이지를 확인합니다. Windows에서 정적 RSC 파일 경로가 중첩 폴더로 출력되는 경우 postbuild에서 브라우저가 요청하는 파일명으로 별칭을 추가합니다. 정적 미리보기는 http://127.0.0.1:4173/입니다. 워크플로와 같은 Git 추적 검사는 필요한 신규 파일을 스테이지한 뒤 `npm.cmd run verify:project`로 실행합니다.

## 콘텐츠와 이미지 수정

- 프로필: src/data/profile.ts
- 프로젝트·상세 설명·문제 해결·링크: src/data/projects.ts
- 기술 및 적용/학습 분류: src/data/skills.ts
- 활동·교육: src/data/experience.ts (풀스택 교육은 한 항목으로 유지)
- 자격 상태: src/data/certifications.ts (필기 합격을 최종 취득으로 변경하지 않도록 주의)

프로젝트 데이터의 getProjects(category)와 getProjectBySlug(slug)를 목록과 상세 경로에서 함께 사용합니다. 데이터베이스나 서버 API 호출이 필요하지 않습니다.

실제 이미지를 `public/images/projects/`에 넣고 각 projects[].images 항목의 src에 `/images/projects/파일명.webp`를 입력하세요. alt도 실제 화면을 설명하도록 수정합니다. 이미지가 없을 때는 추상 그래픽과 ‘이미지 준비 중’을 표시합니다. AIRPTCoach 화면 4개, Al2Beat 화면 4개, SUMO 자료 3개를 추가할 수 있습니다. 임의의 스크린샷이나 성능 수치는 만들지 않습니다.

SUMO 논문 PDF를 공개할 준비가 되면 public에 파일을 넣고 project.document에 해당 루트 경로를 추가할 수 있습니다. 서버 기반 코드 실행 및 AI 모델의 앱 탑재 여부가 확인되지 않은 부분은 제한 조건을 유지하세요.

## 이력서 PDF

실제 PDF를 `public/resume/resume.pdf`에 넣고 다시 빌드하면 Header, 모바일 메뉴, Hero, About, Contact에 다운로드 링크가 표시됩니다. 파일이 없거나 PDF 헤더가 아니면 숨깁니다. 이 검사는 빌드 단계에서만 실행됩니다. 공개할 개인정보를 먼저 확인하세요.

## 디자인 변경

src/app/globals.css의 :root에서 컬러, 폰트, 컨테이너 크기, 반경, 섹션 간격을 관리합니다. Hero 구성은 src/components/home/Hero.tsx, 카드와 상세 구성은 src/components/projects/, 메뉴는 src/components/layout/에서 변경합니다. 콘텐츠 데이터는 그대로 유지하면서 디자인을 교체할 수 있습니다. 시스템 폰트를 사용해 외부 폰트 다운로드에 의존하지 않습니다.

## GitHub Pages 배포

main push 시 공식 Pages 액션으로 빌드하고 out만 배포합니다. package-lock.json을 반드시 커밋하세요. 저장소 Settings → Pages → Source에서 GitHub Actions를 선택합니다. 목표 주소는 https://whitebearcode02.github.io/이며, 실제 새 배포의 성공 여부를 확인한 뒤 제출해야 합니다. Windows 저장소 연결과 시크릿 모드 검증 절차는 [DEPLOYMENT.md](DEPLOYMENT.md)를 참고하세요.

## Vercel 호환

같은 저장소를 Vercel에 가져올 경우 Next.js 프로젝트로 선택하고 빌드 명령은 npm run build, 정적 결과 디렉터리는 out으로 설정합니다. 환경 변수는 필요하지 않습니다. 현재 작업은 GitHub Pages를 대상으로 하며 Vercel 프로젝트나 유료 서비스를 생성하지 않습니다. 이용 플랜의 허용 범위와 요금을 확인한 후 별도로 진행하세요.

## 보안과 비용

비밀키, 외부 유료 API, 인증, 결제, 데이터베이스, 서버 코드 실행 기능을 포함하지 않습니다. 프로젝트에 등장하는 Supabase·Vercel은 포트폴리오에 소개된 기존 프로젝트 기술이며 이 사이트에서 해당 서비스에 연결하지 않습니다. 외부 새 창 링크에는 noopener noreferrer를 적용하며 안전하지 않은 HTML 삽입을 사용하지 않습니다. 수정 버전이 없는 braces 의존성을 가져오던 Next 전용 ESLint 플러그인 대신 ESLint의 JavaScript, TypeScript, React Hooks 규칙을 사용합니다. 검사 결과는 실제 검증 보고서를 참고하세요.
