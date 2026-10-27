# AIRPTCoach 화면·구현 확인 기록 (2026-10-27)

## 확인 기준

- 홈페이지: main, 작업 시작 HEAD `db51602640ad3df4b471890782aa5393ae92b779`. 원격 HEAD와 일치, 시작 시 로컬 변경 없음.
- 앱: 원격 기본 브랜치를 `.preview/ArPtApp/`에 shallow clone. HEAD `915a90d`, 2026-10-23 커밋. 별도 체크아웃에서 읽기만 수행.
- 기기: USB 디버깅 승인된 Samsung SM-S908N 1대, 1440 × 3088.
- 설치 앱: `com.example.arptapp`, versionName 1.0 / versionCode 1, 2026-10-23 설치 업데이트. 소스 버전도 1.0 / 1이나 APK에 커밋 식별자가 없어 바이너리와 HEAD의 완전 일치는 확인하지 못함.
- 진입점: `.SplashActivity` → 로그인 상태 복원 → 홈. 재설치·초기화·권한 변경 없음.

## 캡처와 공개 처리

원본 PNG와 UIAutomator XML은 Git에서 제외된 `.preview/airptcoach-originals/`에 보존합니다. 이 폴더를 공개하거나 커밋하지 마세요. 공개본은 `public/images/projects/airptcoach/`의 WebP 4장입니다.

| 파일 | 실제 화면 | 처리 |
| --- | --- | --- |
| home.webp | 트레이닝, 기록, 영상 순위, 주변 헬스장 메뉴 | 사용자 이름·상태 표시줄 가림 |
| exercise-result.webp | 기존 스쿼트 기록의 요약, 피드백, 점수 흐름 | 날짜·상태 표시줄 가림 |
| exercise-history.webp | 기존 스쿼트·숄더프레스 기록과 리포트 링크 | 모든 노출 날짜·상태 표시줄 가림 |
| exercise-statistics.webp | 최근 7일 기록 없음, 7일·30일 전환 | 상태 표시줄 가림 |

실제 화면의 수치·빈 상태를 조작하지 않았습니다. 세로 비율을 유지해 폭 1080px, WebP 품질 88로 변환했습니다. 마스킹한 공개본을 새 탭에서 확대하므로 원본 개인정보가 링크로 노출되지 않습니다. 이미지 생성 AI나 가짜 앱 화면은 사용하지 않았습니다.

실시간 화면은 카메라가 전신을 감지하지 못한 준비 상태까지만 비공개 원본으로 보존했으며 갤러리에 넣지 않았습니다. 사용자가 배치한 YouTube 영상은 공개 사용 권한이 확인되지 않아 추가 캡처·시연 영상 제작·게시를 진행하지 않았습니다. 직접 제작하거나 허락받은 영상 또는 직접 운동 시연으로 후속 촬영할 수 있습니다.

## 코드로 확인한 범위

- `HomeActivity.kt`, `DashboardActivity.kt`: 홈에서 트레이닝 진입. 별도 운동 선택 목록 대신 자동 감지. 방향 버튼은 정면·측면·미선택을 순환하며 이 Activity 안의 상태입니다.
- `ui/camera/PoseCameraController.kt`: CameraX와 `pose_landmarker_lite.task` LIVE_STREAM 추론, 관절 표시 경로.
- `domain/session/SessionExerciseLock.kt`: 실제 세션 지원은 SQUAT·SHOULDER_PRESS. LUNGE enum만으로 런지 지원을 주장하지 않음.
- `DashboardActivity.kt`: 관절 기반 Primary 감지, 각도·반복 분석, 개인 기준 기록·비교.
- `ui/camera/yolo/TfliteYoloRuntime.kt`, `domain/detection/YoloRuntimePolicy.kt`, `app/build.gradle.kts`: YOLO는 디버그 게이트와 별도 검증 모델이 필요한 Shadow 경로. Release 실행 차단, APK에서 개별 가중치 제외. 설치 앱의 실제 YOLO 추론 성공은 미검증.
- `presentation/report/`: 회차별 점수와 관찰 내용, 진단 렌더링. 실제 리포트의 AI 설명 기능은 준비 중.
- `HistoryActivity.kt`, `WorkoutStatisticsActivity.kt`, `data/AppDatabase.kt`: 계정별 Room 기록, 리포트 재열기, 최근 7일·30일 집계. 통계 그래프가 있다고 과장하지 않음.
- `data/remote/SupabaseAuthRepository.kt`, `SupabaseRepository.kt`: 인증·프로필·결과 업로드 코드 존재. 이번 작업에서는 재로그인·원격 쓰기 성공 여부를 검증하지 않음. 홈페이지에 서비스 키나 API 연결을 추가하지 않음.

## 변경 구조와 제한

공통 `getProjectImage` API와 기존 등록 스크립트를 확장했습니다. AIRPTCoach만 WebP를 우선 선택하며 다른 프로젝트의 기존 우선순위·콘텐츠는 유지합니다. 세로 갤러리 CSS와 이미지 클릭 확대는 AIRPTCoach에만 적용됩니다. GitHub Pages 정적 export와 trailingSlash 설정은 유지합니다.

앱 기록·통계의 제목이 시스템 상태 표시줄과 겹치고 일부 기본 버튼 대비가 낮은 모습은 설치 앱에서 확인한 현상입니다. 캡처를 가공해 수정하거나 Android 코드를 변경하지 않았으며, 별도 앱 개선 후보로 남깁니다.

커밋·푸시·배포와 시연 영상의 홈페이지 추가는 사용자 최종 승인 이후에만 진행합니다. 새 유료 서비스·API·의존성은 추가하지 않습니다.

## 검증 결과

- `npm run lint`, `npm run typecheck`, 최종 `npm run build` 통과.
- 정적 출력 필수 파일 15개와 로컬 페이지·자산 참조 27개 확인.
- 기존 `scripts/check-browser.mjs` 통과: 320·375·390·768·1024·1440px × 8개 경로의 반응형 검사 48건, 이미지 로딩·원본 링크·필터 5종·모바일 메뉴·상세 주소 직접 진입 및 새로고침·404 확인. 런타임 오류 0건.
- Al2Beat·SUMO 데이터 및 기존 이미지 메타데이터가 HEAD와 동일함을 비교 확인.
- 새 WebP 4개 모두 HTTP 200. public과 out의 SHA-256이 같아 최종 마스킹본이 빌드에 포함됨을 확인.
- 새 WebP 합계 276,550 bytes (약 270KiB). 원본과 계정 정보가 담긴 UI XML은 배포 경로 밖에 보관.
- Windows 앱 연결은 시간 초과되어 기존 로컬 브라우저 회귀 검사로 확인. 렌더링된 모바일 프로젝트 목록과 공개 이미지도 시각 점검.

추천 커밋 메시지: `feat: AIRPTCoach 실기기 화면과 최신 구현 설명 반영`

## 사용자 제공 실행 화면 추가

사용자가 별도로 제공한 실행 화면과 동일한 클립보드 이미지(412×858)를 확인하여 `.preview/airptcoach-originals/pose-analysis-original.png`로 보존했습니다. 얼굴 영역에만 4×4 모자이크를 적용하고 `public/images/projects/airptcoach/pose-analysis.webp`에 무손실 WebP로 저장했습니다. 얼굴 영역 밖의 픽셀이 원본과 완전히 동일한지 프로그램으로 비교했습니다. 앞서 이미지 편집 도구로 만든 재렌더링 결과는 사용하지 않았습니다.

갤러리는 사용자 제공 화면임을 표시하며 스쿼트 세션·감지 상태, 관절 오버레이, 몸통 기울기 피드백을 설명합니다. 화면의 0회를 유지하며 반복 측정 성공이나 모델 성능을 입증하는 자료로 해석하지 않습니다. 이 자료는 ADB로 직접 캡처한 기존 4장과 출처를 구분합니다. 별도 시연 영상은 추가하지 않았습니다.
