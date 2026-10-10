# 검증 기록

2026-10-10, Windows / Node.js 24.14.0에서 실행했습니다. 검증 대상은 처음 제공된 요구사항을 바탕으로 이 저장소에 생성한 Next.js 포트폴리오입니다.

## 로컬 결과

| 검사                           | 결과                                                   |
| ------------------------------ | ------------------------------------------------------ |
| npm ci                         | 성공, 전체 의존성 알려진 취약점 0건                    |
| npm run lint                   | 오류·경고 없이 성공                                    |
| npm run typecheck              | 성공                                                   |
| npm run build                  | 성공, 모든 페이지 Static 또는 SSG                      |
| 정적 파일 검사                 | 필수 export 파일 13개, 내부 페이지·자산 참조 20개 확인 |
| 반응형 브라우저 검사           | 8개 페이지 × 375·390·768·1440px = 32개 검사 성공       |
| 프로젝트 필터                  | All, Android, AI-ML, Full-Stack, Research 정상         |
| 상세 페이지 직접 접근·새로고침 | 3개 상세 페이지 성공, 끝 슬래시 없는 주소도 확인       |
| 모바일 메뉴                    | 열기, Escape 닫기, 메뉴 선택 후 이동·닫기 성공         |
| 이력서 PDF 미등록              | 다운로드 링크 숨김 확인                                |
| SEO                            | 8개 페이지의 개별 제목과 언어·메타데이터 확인          |
| 로컬 CSS·JS·이미지 요청        | 오류 없음                                              |
| 브라우저 런타임 오류           | 0건                                                    |
| 존재하지 않는 주소             | 404와 사용자 안내 확인                                 |
| GitHub 및 Al2Beat 데모 링크    | 공개 링크 4개 모두 HTTP 200                            |

로그인·쿠키를 공유하지 않는 별도 로컬 Edge 세션에서 실제 out 파일을 검사하고 PC·모바일 스크린샷을 시각적으로 확인했습니다. 실제 휴대전화 기기 검사는 하지 않았습니다. 이메일 링크는 mailto 주소만 검사했으며 이메일을 보내지 않았습니다.

## 수정한 문제

- 배포 설정 파일만 존재하던 저장소에 실제 앱과 package.json, package-lock.json을 구현했습니다.
- 최신 Lucide에서 제공하지 않는 브랜드 아이콘 참조를 지원되는 코드 아이콘으로 교체했습니다.
- Windows 정적 export의 RSC 경로와 브라우저 요청 파일명 불일치로 발생하던 404를 postbuild 별칭 생성으로 해결했습니다. 원본 export 파일은 보존합니다.
- 수정 버전이 없는 braces 개발 의존성을 가져오던 Next 전용 ESLint 플러그인을 제거하고 ESLint·TypeScript·React Hooks 규칙으로 대체했습니다. 새 lockfile로 npm ci를 성공시켰으며 취약점 0건을 확인했습니다.
- 토큰 및 비밀키 패턴, 위험한 HTML 삽입·eval 사용을 소스와 public 파일에서 검사했습니다. 해당 패턴은 발견되지 않았습니다. 이는 모든 종류의 보안 문제에 대한 보증을 의미하지는 않습니다.

## 재현

```powershell
npm.cmd ci
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run preview
```

별도 터미널에서 Windows Edge를 사용한 동일한 화면 검사를 실행할 수 있습니다. 임시 테스트 도구와 이미지는 .preview에 생성되며 Git과 배포물에서 제외됩니다.

```powershell
npm.cmd install --prefix .preview playwright@1.64.0
node scripts/check-browser.mjs
```

## 공개 배포

로컬 검증과 실제 공개 배포의 성공은 구분합니다. 새 커밋의 GitHub Actions build 및 deploy와 공개 HTTPS 페이지 응답을 확인한 결과만 최종 보고합니다. Pages 게시 방식은 GitHub Actions여야 합니다. 기존 첫 실행의 실패 표시는 새 커밋 성공으로 삭제되지 않습니다.
