import type { Project, ProjectCategory } from "@/types/project";

export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  "Android",
  "AI-ML",
  "Full-Stack",
  "Research",
];

export const projects: Project[] = [
  {
    slug: "airptcoach",
    name: "AIRPTCoach",
    subtitle: "움직임을 이해하는 기술",
    theme: "mint",
    description: "AI 기반 실시간 운동 자세 분석 및 코칭 Android 애플리케이션",
    categories: ["Android", "AI-ML"],
    technologies: [
      "Kotlin",
      "Android",
      "CameraX",
      "MediaPipe Pose",
      "YOLO",
      "TensorFlow Lite",
      "Room",
      "Supabase",
      "Python",
    ],
    github: "https://github.com/WhiteBearCode02/ArPtApp",
    images: [
      { label: "메인 화면", alt: "AIRPTCoach 메인 화면" },
      { label: "운동 자세 분석", alt: "AIRPTCoach 운동 자세 분석 화면" },
      { label: "결과 리포트", alt: "AIRPTCoach 운동 결과 리포트" },
      {
        label: "카메라 오류 수정 전후",
        alt: "카메라 좌표 오류 개선 전후 비교",
      },
    ],
    sections: [
      {
        id: "overview",
        eyebrow: "OVERVIEW",
        title: "일상 속 운동에 객관적인 피드백을",
        paragraphs: [
          "스마트폰 카메라를 활용해 신체 관절을 추적하고, 관절 각도와 운동 동작을 분석하여 운동 기록과 피드백을 제공하는 Android 애플리케이션입니다.",
        ],
      },
      {
        id: "problem",
        eyebrow: "PROBLEM DEFINITION",
        title: "혼자 운동할 때, 내 자세를 어떻게 확인할까?",
        paragraphs: [
          "혼자 운동하는 사용자가 자신의 운동 자세를 객관적으로 확인하기 어렵다는 문제를 해결하고자 개발했습니다.",
          "사용자의 움직임을 화면에 표현하고 운동 기록으로 연결해, 스스로 운동 과정을 돌아볼 수 있는 환경을 목표로 했습니다.",
        ],
      },
      {
        id: "features",
        eyebrow: "FEATURES",
        title: "카메라에서 운동 기록까지",
        items: [
          "MediaPipe 기반 관절 추적 및 스켈레톤 오버레이",
          "운동 반복 횟수 계산",
          "스쿼트 및 숄더프레스 자세 분석",
          "운동 기록·통계 및 결과 리포트",
          "사용자 인증과 로컬·원격 데이터 관리",
          "운동 종류 인식 AI 모델 개발 및 학습 실험",
        ],
      },
      {
        id: "architecture",
        eyebrow: "ARCHITECTURE",
        title: "영상 처리, 분석, 데이터 관리의 연결",
        items: [
          "카메라 영상 처리 — CameraX",
          "관절 추정 및 표시 — MediaPipe Pose",
          "모바일 애플리케이션 — Kotlin · Android",
          "로컬 및 원격 데이터 관리 — Room · Supabase",
        ],
        note: "제공된 기술과 기능의 관계를 정리한 개념 구조입니다. 상세 내부 아키텍처와 모델별 앱 탑재 여부는 별도 확인이 필요합니다.",
      },
      {
        id: "ai-training",
        eyebrow: "AI TRAINING",
        title: "실제 운동 환경을 고려한 모델 학습",
        paragraphs: [
          "AI-Hub 등의 공개 데이터와 실제 운동 영상을 활용하여 운동 인식 모델 학습을 실험했습니다.",
          "공개 데이터와 실제 촬영 영상의 특성을 고려하여 학습 데이터 활용 가능성을 검토했습니다.",
        ],
        note: "모델 학습 실험과 실제 앱 탑재를 구분합니다. 정확도, mAP, F1 Score, FPS 등 검증된 성능 수치는 아직 제공되지 않았습니다.",
      },
      {
        id: "results",
        eyebrow: "RESULTS",
        title: "구현 이후에도 검증과 개선을 이어가다",
        paragraphs: [
          "카메라 방향에 따른 관절 표시를 개선하고 로그인 및 사용자 데이터 처리 관련 오류를 점검했습니다.",
          "실제 운동 사용자의 피드백을 바탕으로 Activity와 Layout을 수정하여 화면 구조와 기능 흐름을 개선했습니다.",
        ],
      },
      {
        id: "lessons",
        eyebrow: "LESSONS LEARNED",
        title: "모델을 넘어, 사용 경험까지",
        paragraphs: [
          "AI 모델과 모바일 애플리케이션을 통합할 때 추론 기능뿐 아니라 카메라 처리, 화면 표시, 사용자 인증, 데이터 저장, 실제 사용성을 함께 고려해야 한다는 점을 경험했습니다.",
          "각 문제에 대해 원인을 분석하고 개선하는 과정을 통해 개발 및 검증 역량을 쌓았습니다.",
        ],
      },
    ],
    problems: [
      {
        title: "카메라 방향에 따른 관절 표시 오류 개선",
        problem:
          "MediaPipe로 추적한 관절 위치가 카메라 영상과 기대한 방향으로 일치하지 않았습니다.",
        analysis:
          "전면·후면 카메라의 영상 방향과 좌표 처리 방식에 차이가 있음을 확인하고, 카메라 회전 및 좌표 렌더링 과정을 점검했습니다.",
        solution:
          "카메라 방향에 맞는 좌표 변환과 화면 표시 방식을 수정했습니다.",
        result:
          "사용자의 움직임과 관절 표시가 보다 직관적으로 일치하도록 개선했습니다.",
      },
      {
        title: "로그인 및 데이터베이스 연동 오류 개선",
        problem:
          "앱 완성 이후 검증 과정에서 로그인과 데이터 연동 오류가 발생했습니다.",
        analysis:
          "인증 요청, 로그인 상태, 데이터 조회 및 저장 흐름을 점검했습니다.",
        solution:
          "발견한 문제에 맞게 인증 및 데이터 처리 로직을 수정하고 검증했습니다.",
        result: "로그인과 사용자 데이터 처리 관련 오류를 개선했습니다.",
      },
      {
        title: "실제 사용자 피드백을 통한 UI/UX 개선",
        problem:
          "실제 운동 환경에서 앱을 사용했을 때 사용성 개선이 필요했습니다.",
        analysis:
          "실제 운동 사용자에게 앱을 사용하도록 하고 피드백을 받아 개선 사항을 정리했습니다.",
        solution:
          "Activity와 Layout을 수정하여 화면 구조와 기능 흐름을 개선했습니다.",
        result: "사용자 경험을 고려한 앱 개선을 진행했습니다.",
      },
    ],
  },
  {
    slug: "al2beat",
    name: "Al2Beat",
    subtitle: "과정이 보이는 알고리즘 학습",
    theme: "violet",
    description: "알고리즘 시각화 및 다국어 코딩 학습 플랫폼",
    categories: ["Full-Stack"],
    technologies: [
      "TypeScript",
      "React",
      "Monaco Editor",
      "Pyodide",
      "Vercel",
      "Web Worker",
    ],
    github: "https://github.com/WhiteBearCode02/Al2Beat",
    demo: "https://al2-beat.vercel.app/",
    images: [
      { label: "메인 학습 화면", alt: "Al2Beat 메인 학습 화면" },
      { label: "Monaco Editor", alt: "Al2Beat 코드 편집 화면" },
      { label: "알고리즘 시각화", alt: "Al2Beat 알고리즘 시각화 화면" },
      { label: "모바일 화면", alt: "Al2Beat 모바일 화면" },
    ],
    sections: [
      {
        id: "overview",
        eyebrow: "OVERVIEW",
        title: "코드와 시각화를 함께 보는 학습 경험",
        paragraphs: [
          "알고리즘과 자료구조의 상태 변화를 시각적으로 이해하고, 직접 코드를 작성하며 학습할 수 있는 웹 플랫폼입니다.",
        ],
      },
      {
        id: "background",
        eyebrow: "BACKGROUND",
        title: "정답보다 과정의 이해에 집중하다",
        paragraphs: [
          "알고리즘을 단순히 외우거나 문제 풀이 결과만 확인하는 것이 아니라, 자료구조와 알고리즘의 상태 변화를 시각적으로 이해할 수 있는 환경을 제공하고자 개발했습니다.",
        ],
      },
      {
        id: "features",
        eyebrow: "FEATURES",
        title: "이해하고, 작성하고, 실행하기",
        items: [
          "알고리즘 및 자료구조 학습",
          "알고리즘 단계별 시각화와 직접 제작한 개념별 모션 설명",
          "알고리즘 문제 풀이",
          "Monaco Editor 기반 코드 편집",
          "Python 브라우저 실행 및 다국어 코딩 연습",
          "학습 기록 저장",
          "모바일 반응형 UI",
        ],
      },
      {
        id: "decisions",
        eyebrow: "TECHNICAL DECISIONS",
        title: "언어에 맞는 실행 환경을 선택하다",
        paragraphs: [
          "프로그래밍 언어에 따라 실행 방식이 다르다는 점을 고려하여 실행 환경을 분리했습니다.",
          "Python은 브라우저 기반 실행 환경을 사용하고, 서버에서 컴파일 및 실행해야 하는 언어는 별도의 실행 인프라와 환경 조건을 고려했습니다.",
        ],
        note: "일부 서버 기반 언어 실행 기능은 환경 설정에 따라 제한될 수 있습니다.",
      },
      {
        id: "architecture",
        eyebrow: "ARCHITECTURE",
        title: "학습 UI와 코드 실행 환경의 분리",
        items: [
          "학습 및 시각화 인터페이스 — React · TypeScript",
          "코드 편집 — Monaco Editor",
          "Python 브라우저 실행 — Pyodide · Web Worker",
          "웹 배포 — Vercel",
        ],
        note: "제공된 기술을 기준으로 정리한 개념 구조입니다. 서버 실행 기능의 상세 인프라와 운영 조건은 별도 확인이 필요합니다.",
      },
      {
        id: "implementation",
        eyebrow: "IMPLEMENTATION",
        title: "사용자 코드 실행의 조건을 함께 고민하다",
        paragraphs: [
          "사용자 코드 실행 환경을 설계하면서 보안, 실행 격리, 인프라 사용량 등의 조건을 함께 고려했습니다.",
          "알고리즘 시각화, 코드 편집, 실행 결과를 학습 흐름으로 연결하고 모바일에서도 접근할 수 있도록 구성했습니다.",
        ],
      },
      {
        id: "lessons",
        eyebrow: "LESSONS LEARNED",
        title: "프론트엔드에서 실행 환경과 배포까지",
        paragraphs: [
          "프론트엔드 구현을 넘어 코드 실행 환경, 인프라 조건, 사용자 학습 흐름 및 배포 구조를 함께 고려하는 개발 경험을 쌓았습니다.",
        ],
      },
    ],
  },
  {
    slug: "sumo-research",
    name: "SUMO Research",
    subtitle: "도로 변화가 만드는 흐름을 탐구하다",
    theme: "blue",
    description:
      "SUMO 기반 도시 교통 시뮬레이션을 활용한 신규 도로 개설 효과 분석 시스템 설계",
    categories: ["Research"],
    technologies: ["SUMO", "교통 시뮬레이션", "데이터 분석"],
    images: [
      { label: "시뮬레이션 화면", alt: "SUMO 교통 시뮬레이션 화면" },
      { label: "연구 구조도", alt: "SUMO 연구 시스템 구조도" },
      { label: "학술 발표 자료", alt: "SUMO 학술 발표 자료" },
    ],
    sections: [
      {
        id: "overview",
        eyebrow: "OVERVIEW",
        title: "신규 도로 개설 효과 분석 시스템 설계",
        paragraphs: [
          "도시 교통 환경에서 신규 도로 개설이 차량 흐름에 미치는 영향을 분석하기 위한 SUMO 기반 시뮬레이션 연구입니다.",
          "AICS 학부 연구 활동으로 진행했으며, 2025년 11월 한국멀티미디어학회에서 학술 발표를 진행했습니다.",
        ],
      },
      {
        id: "purpose",
        eyebrow: "RESEARCH PURPOSE",
        title: "도로 네트워크 변경 전후를 비교하다",
        paragraphs: [
          "도로 네트워크 변경 전후의 교통 상황을 비교하고 교통 흐름의 변화를 분석할 수 있는 시스템 설계를 목표로 했습니다.",
        ],
      },
      {
        id: "experience",
        eyebrow: "RESEARCH EXPERIENCE",
        title: "시뮬레이션에서 학술 발표까지",
        items: [
          "시뮬레이션 기반 연구",
          "교통 환경 분석",
          "도로 네트워크 조건 검토",
          "연구 과정 정리",
          "학술 발표",
        ],
      },
      {
        id: "materials",
        eyebrow: "RESEARCH MATERIALS",
        title: "연구 자료",
        paragraphs: [
          "시뮬레이션 화면, 연구 구조도, 발표 자료와 논문 PDF를 추후 추가할 예정입니다.",
        ],
        note: "개별 담당 범위와 정량적 연구 결과는 아직 제공되지 않았습니다.",
      },
    ],
  },
];

export function getProjects(category: "All" | ProjectCategory = "All") {
  return category === "All"
    ? projects
    : projects.filter((project) => project.categories.includes(category));
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
