"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container empty-state">
      <p className="eyebrow">SOMETHING WENT WRONG</p>
      <h1>화면을 불러오지 못했습니다.</h1>
      <p>다시 시도하거나 홈으로 이동해주세요.</p>
      <div className="hero-actions">
        <button type="button" className="button button-primary" onClick={reset}>
          다시 시도
        </button>
        <Link href="/" className="button button-secondary">
          홈으로 이동
        </Link>
      </div>
    </div>
  );
}
