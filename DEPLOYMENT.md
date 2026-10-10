# GitHub Pages 배포

이 저장소는 Next.js App Router로 구현한 이현준의 개발자 포트폴리오입니다. 저장소 이름은 `WhiteBearCode02.github.io`, 공개 목표 주소는 `https://whitebearcode02.github.io/`입니다. 빌드 성공과 공개 배포 성공은 각각 확인해야 합니다.

## 실패 원인과 수정

### README만 표시되는 설정을 바로잡는 방법

`Deploy from a branch → main → /(root)`는 Next.js 소스를 빌드하는 설정이 아닙니다. 루트에 배포용 `index.html`이 없으면 README가 Jekyll 페이지로 게시될 수 있습니다. `.next/`는 내부 빌드 파일이며 Pages 게시 대상은 `npm run build`가 생성하는 `out/`입니다.

1. [이 저장소의 Pages 설정](https://github.com/WhiteBearCode02/WhiteBearCode02.github.io/settings/pages)을 엽니다.
2. **Build and deployment → Source**에서 **GitHub Actions**를 선택합니다. `main`과 `/(root)` 선택란은 사라집니다. 기존 워크플로를 사용하므로 새로운 워크플로 템플릿을 만들 필요가 없습니다.
3. [Actions](https://github.com/WhiteBearCode02/WhiteBearCode02.github.io/actions)에서 **Deploy portfolio to GitHub Pages → Run workflow → main → Run workflow**를 실행합니다. Source 변경만으로 새 Next.js 배포가 시작된다고 가정하지 마세요.
4. 해당 실행의 **build와 deploy가 모두 성공**한 뒤 [공개 사이트](https://whitebearcode02.github.io/)를 확인합니다. 계속 README가 보이면 최신 배포가 해당 워크플로인지 확인하고 Ctrl+Shift+R로 새로고침합니다.

이 설정은 GitHub 저장소 설정이므로 로컬 파일 수정만으로 변경되지 않습니다. 배포 전 게시 소스 검사를 먼저 실행하여 잘못된 설정일 때 의존성 설치나 빌드를 시작하지 않고 설정 링크와 수정 방법을 표시합니다.

첫 실행(38045567342)은 배포 설정 파일만 존재하는 상태에서 npm 캐시가 lockfile을 찾지 못해 실패했습니다. 이제 실제 앱, package.json, package-lock.json 및 정적 데이터 모듈을 프로젝트 루트에 포함합니다. 다음 단계는 전체 프로젝트를 커밋하고 배포 워크플로의 성공을 확인하는 것입니다.

성공으로 표시되었던 `pages build and deployment`는 Jekyll 작업이었습니다. Next.js 정적 빌드 결과를 배포하려면 **Settings → Pages → Build and deployment → Source → GitHub Actions**를 선택하세요. 기존 커밋의 실패 표시를 지우려고 재실행할 필요는 없습니다. 새 커밋의 실행 결과를 확인하세요.

2026-10-11 확인한 최근 실행에서는 Next.js 배포 후 기존 Jekyll 배포가 완료되어 포트폴리오를 README 페이지로 덮어썼습니다. 이는 CSS가 삭제된 문제가 아니라 게시 소스가 두 개였기 때문입니다. 워크플로에 게시 방식 검사를 추가하여 Source가 GitHub Actions가 아니면 명확한 오류로 중단합니다. 이 검사는 기존 `pages: read` 권한만 사용하며 저장소 설정을 임의로 변경하지 않습니다. Source 변경 후 새 커밋을 push하거나 실패한 워크플로에서 **Re-run all jobs**를 실행하세요.

프로젝트 루트에 제공된 세 사진은 원본을 보존하고 `public/images/projects/airptcoach/home.jpeg`, `al2beat/learning.png`, `sumo-research/poster.png`에 복사했습니다. 빌드 시 이미지 메타데이터가 생성되며 목록과 상세 페이지에서 동일한 자료를 사용합니다. 배포에는 public 폴더의 복사본만 필요합니다.

## 정적 배포 구조

- `output: "export"`로 `out/`에 HTML, CSS, JavaScript를 생성합니다.
- `trailingSlash: true`로 상세 페이지를 `projects/airptcoach/index.html`처럼 생성합니다.
- `images.unoptimized: true`를 적용하여 Next.js 이미지 최적화 서버를 사용하지 않습니다.
- 사용자 사이트의 루트 주소이므로 basePath와 assetPrefix를 추가하지 않습니다.
- 모든 public 파일은 `/images/...`, `/resume/resume.pdf`처럼 루트 경로로 참조합니다.
- 프로젝트 상세 페이지의 generateStaticParams가 데이터 모듈의 세 slug를 반환합니다.
- 서버 API, Server Actions, 인증, 데이터베이스, ISR, 요청 기반 cookies/headers, middleware/proxy를 사용하지 않습니다.
- Server Components와 PDF 파일 검사는 빌드 단계에서만 실행됩니다. 방문 시 서버가 필요하지 않습니다.

## Windows VS Code에서 로컬 검사

VS Code에서 이 폴더를 열고 터미널에서 실행합니다. PowerShell 실행 정책을 변경하지 않아도 npm.cmd를 사용할 수 있습니다.

```powershell
npm.cmd ci
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run preview
```

`npm.cmd run build` 후에는 정적 페이지 검사가 자동으로 실행됩니다. `http://127.0.0.1:4173/`에서 실제 out 파일을 확인할 수 있습니다. 개발 중에는 `npm.cmd run dev`를 사용하세요. GitHub Pages에 `next start`를 실행하는 서버는 필요하지 않습니다.

## 저장소 생성 및 연결

현재 origin은 목표 저장소에 연결되어 있습니다. 기존 .git과 커밋 이력을 보존하세요.

새 환경에서 저장소가 없다면 GitHub에 로그인하여 `WhiteBearCode02.github.io` 이름의 **Public** 저장소를 만듭니다. 로컬 프로젝트가 있다면 README 초기화는 선택하지 않습니다.

```powershell
git status
git remote -v
# 아직 Git 저장소가 아닐 때만: git init
# origin이 없을 때만:
git remote add origin https://github.com/WhiteBearCode02/WhiteBearCode02.github.io.git
git branch -M main
```

원격에 기존 커밋이 있으면 먼저 fetch하여 확인하고 강제 push하지 않습니다. VS Code 소스 제어에서 필요한 파일을 스테이지하고, 로그인은 Git Credential Manager를 사용하세요. 토큰을 코드나 remote URL에 넣지 않습니다.

## 추적할 파일과 배포

package.json, package-lock.json, src, public, Next.js/TypeScript/PostCSS/ESLint 설정, 검사 스크립트와 워크플로를 커밋합니다. node_modules, .next, out, .env, .npm-cache, .preview는 제외합니다.

```powershell
git status --short --untracked-files=all
git ls-files
node scripts/verify-project.mjs
git diff --cached --stat
git push -u origin main
```

프로젝트 사전 검사는 의존성 파일과 라우트 소스가 Git 추적 대상인지 확인하므로, 신규 파일은 스테이지한 뒤 실행합니다.

워크플로는 main push 또는 수동 실행에 반응합니다. root package-lock.json으로 npm 캐시를 생성하고 npm ci, 린트, 빌드, 타입 검사, HTML 검사를 수행합니다. 공식 configure-pages, upload-pages-artifact, deploy-pages 액션으로 **out 폴더만** 배포합니다. build에는 contents: read와 pages: read, deploy에는 pages: write와 id-token: write만 부여합니다.

## 공개 URL 확인

1. GitHub **Settings → Pages → Source**가 **GitHub Actions**인지 확인합니다.
2. Actions에서 새 커밋의 `Deploy portfolio to GitHub Pages` 실행을 엽니다.
3. build와 deploy가 모두 성공한 뒤 deployment URL이 목표 주소인지 확인합니다.
4. HTTPS 강제가 선택 가능하면 활성화합니다.
5. Chrome/Edge에서 Ctrl+Shift+N을 눌러 시크릿/InPrivate 창을 열고 `https://whitebearcode02.github.io/`를 직접 입력합니다.
6. GitHub 로그인 없이 홈과 모든 메뉴를 열고 상세 주소를 직접 입력·새로고침합니다.
7. Network에 CSS, JS, 이미지 404가 없고 Console에 오류가 없는지 확인합니다.
8. 375px, 390px, 768px, 1440px 화면에서 메뉴, 필터, 링크, 텍스트와 가로 넘침을 확인합니다.

상세 주소: `/projects/airptcoach/`, `/projects/al2beat/`, `/projects/sumo-research/`. 존재하지 않는 주소는 404로 처리합니다. 실제 PDF가 없으면 다운로드 링크가 표시되지 않습니다.

## 비용 및 공개 범위

Public 저장소의 GitHub Pages와 표준 GitHub 호스팅 러너를 사용합니다. 유료 API, 외부 이미지 서비스, 유료 도메인, 인증 및 DB를 추가하지 않았습니다. 이미지와 PDF를 나중에 추가할 때 공개할 개인정보와 자료 이용 권한을 확인하세요. 다른 유료 호스팅이나 도메인을 사용하려면 먼저 비용 조건을 확인하고 동의를 받습니다.

## 공식 문서

- [Next.js Static Export](https://nextjs.org/docs/app/guides/static-exports)
- [GitHub Pages 공식 워크플로](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Pages 게시 소스 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
