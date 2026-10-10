# GitHub Pages 배포 준비 및 검증

## 현재 상태

작업 폴더에는 기존 Next.js 프로젝트가 없습니다. 초기 Git 저장소만 있고 커밋과 remote가 없습니다. 첨부 문서는 구축 요구사항이지 소스 코드가 아닙니다. 따라서 Next.js 버전, App Router 구조, 기존 디자인, 서버 기능, PDF 유무를 확인하지 못했습니다. 실제 배포도 수행하지 않았으며 목표 URL의 작동을 확인하지 않았습니다.

추가한 파일은 배포용 준비 파일입니다. 기존 프로젝트를 이 폴더에 옮긴 뒤 기존 next.config.ts의 다른 설정을 보존하면서 아래 옵션을 병합해야 합니다. package.json과 package-lock.json도 함께 가져오세요. 기존 .git 폴더를 덮어쓰지 마세요. 기존 ignore 규칙도 병합하세요.

## 설정과 경로

- next.config.ts: output: "export", trailingSlash: true, images.unoptimized: true.
- 사용자 사이트이므로 basePath와 assetPrefix에 저장소 이름을 넣지 않습니다.
- public/images/example.webp는 /images/example.webp로 참조합니다. 상대 경로 images/example.webp는 상세 페이지에서 잘못 해석될 수 있습니다.
- next/image에는 width/height 또는 fill과 적절한 부모 레이아웃을 유지하세요. 외부 이미지보다 기존 public 파일을 우선 사용하세요.
- trailingSlash로 /projects/airptcoach/index.html이 생성되므로 상세 URL 직접 접근 및 새로고침에 대응합니다. 생성되지 않은 경로는 404로 처리합니다.
- package.json의 build 스크립트는 next build여야 합니다. next export나 next start로 Pages를 운영하지 않습니다.

## 프로젝트 동적 경로: 기존 파일에 병합할 예시

아래 코드는 적용 예시이며 실제 페이지에 구현된 상태가 아닙니다. app/projects/[slug]/page.tsx 또는 src/app/projects/[slug]/page.tsx에서 기존 프로젝트 데이터 모듈을 사용하세요. 경로·필드 이름은 기존 구조에 맞춰야 합니다.

```tsx
import { projects } from '@/data/projects';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
```

페이지는 서버 컴포넌트로 두고 필터, 애니메이션 등 상호작용만 별도 클라이언트 컴포넌트로 분리하세요. 기존 페이지가 'use client'라면 해당 UI를 분리한 뒤 서버 페이지에서 generateStaticParams를 export합니다. params의 Promise 여부는 실제 Next.js 버전에 맞추세요. 알 수 없는 slug는 notFound()로 처리합니다. 프로젝트 목록과 정적 경로가 같은 데이터 모듈을 사용하도록 유지하세요. 이 목적에 서버 API를 새로 만들 필요는 없습니다.

## 서버 기능과 이력서 확인

다음 기능이 실제 코드에 있는지 확인 후 수정해야 합니다.

- Server Actions, 요청 기반 cookies/headers, 인증 세션: 공개 정적 콘텐츠 또는 브라우저 상호작용으로 변경.
- POST 등 런타임 API, 요청 의존 Route Handler: 정적 데이터 모듈로 교체. 연락 기능은 mailto 링크 사용.
- ISR, 런타임 SSR, middleware/proxy, rewrites/redirects: 정적 페이지와 실제 링크로 교체.
- 기본 이미지 최적화 서버: unoptimized 설정 적용.
- 외부 폰트 다운로드 의존성: 빌드가 실패하면 기존 라이선스를 확인한 로컬 폰트 또는 시스템 폰트 사용.
- 실제 public/resume.pdf가 없다면 Header, Hero, Contact의 다운로드 링크를 모두 숨기거나 disabled 버튼으로 변경. href="#"로 대체하지 마세요. 파일 유무 판단은 빌드 단계/서버 모듈에 두고 브라우저 코드에 node:fs를 import하지 마세요.

빌드 시 실행되는 Server Component 자체는 정적 export에서 사용할 수 있습니다.

## Windows VS Code에서 저장소 생성 및 연결

1. GitHub에 WhiteBearCode02 계정으로 로그인합니다. New repository에서 이름을 정확히 WhiteBearCode02.github.io로 입력하고 Public을 선택합니다. 기존 저장소가 있다면 새로 만들지 않고 해당 저장소를 사용합니다. 로컬 파일이 있으므로 새 저장소에 README나 .gitignore 초기화를 추가하지 않습니다.
2. VS Code에서 이 작업 폴더를 엽니다. 터미널에서 아래 명령을 실행합니다. PowerShell 실행 정책을 변경하지 않고 npm.cmd를 사용합니다.

```powershell
git status
git remote -v
npm.cmd ci
npm.cmd run build
node scripts/verify-static-export.mjs
```

package-lock.json이 없으면 기존 프로젝트에서 npm.cmd install로 생성하고 검토하여 커밋하세요. Next.js 버전은 package.json, lockfile과 npm.cmd ls next로 확인합니다. 취약점은 npm.cmd audit로 점검하고 npm audit fix --force를 무조건 실행하지 마세요.

3. 아직 Git 저장소가 아닐 때만 git init을 실행합니다. 기존 Git 이력이 있으면 보존합니다. remote가 없을 때만 아래 연결 명령을 실행합니다.

```powershell
git remote add origin https://github.com/WhiteBearCode02/WhiteBearCode02.github.io.git
git branch -M main
```

origin이 다른 저장소를 가리키면 주소를 확인한 뒤 git remote set-url origin으로 변경하세요. 원격 저장소에 기존 이력이 있으면 먼저 fetch하여 확인하고 강제 push하지 마세요.

4. 아래 검증을 끝내고 VS Code 소스 제어에서 변경 파일을 확인하여 필요한 파일만 스테이지하고 커밋합니다. 비밀키, .env, node_modules, out을 커밋하지 않습니다. 로그인은 VS Code/Git Credential Manager를 사용하고 토큰을 URL이나 코드에 넣지 않습니다.
5. GitHub 저장소 Settings → Pages → Build and deployment → Source에서 GitHub Actions를 선택합니다. 워크플로는 main push 또는 Actions 탭에서 수동 실행으로 동작합니다. main push는 공개 배포를 시작하므로 공개할 콘텐츠와 PDF의 개인정보를 먼저 확인하세요.

```powershell
git push -u origin main
```

## 로컬 및 공개 검증

빌드 성공 후 node scripts/verify-static-export.mjs가 모든 필수 HTML 파일을 확인합니다. 이는 화면·이미지·링크 검증을 대신하지 않습니다. Python이 설치되어 있다면 아래 서버로 out 폴더만 확인합니다.

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory out
```

- http://127.0.0.1:4173/에서 홈과 전체 메뉴를 점검합니다.
- /projects/airptcoach/, /projects/al2beat/, /projects/sumo-research/를 각각 직접 입력하고 새로고침합니다. 끝 슬래시 없는 주소도 확인합니다.
- 개발자 도구 Network에서 CSS, JavaScript, 이미지에 404가 없는지, Console에 오류가 없는지 확인합니다.
- 반응형 모드 375px·390px·768px·1440px에서 메뉴, 프로젝트 필터, 카드, 가로 넘침, 링크와 텍스트를 확인합니다. 가능하면 실제 휴대전화에서도 확인합니다.
- PDF가 없을 때 다운로드 링크가 노출되지 않는지 확인합니다.

GitHub Actions의 build와 deploy가 모두 성공한 뒤에만 배포 성공을 판단합니다. Settings → Pages의 공개 URL과 워크플로 deployment URL이 목표 주소인지 확인하세요. HTTPS 강제가 선택 가능하면 활성화합니다.

Chrome Ctrl+Shift+N 또는 Edge Ctrl+Shift+N으로 시크릿/InPrivate 창을 열고 https://whitebearcode02.github.io/를 직접 입력합니다. GitHub에 로그인하지 않은 상태에서 홈과 모든 상세 페이지를 확인하고 새로고침하세요. 모바일에서도 공개 주소를 확인합니다. 로그인 없이 열리며 자산 요청이 성공해야 채용 담당자에게 제출할 수 있습니다.

## 비용·보안 범위

Public 저장소의 GitHub Pages와 표준 GitHub 호스팅 러너만 사용하는 구성입니다. 유료 API, 데이터베이스, 인증, 커스텀 도메인 구매, 유료 호스팅을 추가하지 않았습니다. private 저장소나 유료 서비스로 바꾸기 전에 요금 조건을 확인하고 동의를 받으세요. 외부 이미지·폰트·문서의 이용 권한도 공개 전에 확인하세요.

워크플로는 전역 권한을 비우고 build에 contents: read와 pages: read, deploy에 pages: write와 id-token: write만 부여합니다. 별도 PAT/secret 없이 공식 배포 액션과 GitHub OIDC를 사용합니다. 배포물은 out 폴더만 업로드합니다. 의존성 및 앱 보안 검사는 실제 소스와 lockfile이 없어 아직 수행하지 못했습니다.

## 공식 참고 문서

- https://nextjs.org/docs/app/guides/static-exports
- https://nextjs.org/docs/app/api-reference/functions/generate-static-params
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
