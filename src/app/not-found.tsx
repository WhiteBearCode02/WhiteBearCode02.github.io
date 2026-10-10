import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container empty-state">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>
        페이지를 찾을 수 없습니다<span className="accent">.</span>
      </h1>
      <p>주소를 확인하거나 홈에서 다른 프로젝트를 살펴보세요.</p>
      <Link href="/" className="button button-primary">
        <ArrowLeft size={16} aria-hidden="true" />
        홈으로 돌아가기
      </Link>
    </div>
  );
}
