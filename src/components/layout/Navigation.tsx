"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/projects/", label: "Projects" },
  { href: "/experience/", label: "Experience" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return navigation.map(({ href, label }) => {
    const active =
      href === "/"
        ? pathname === "/"
        : pathname.startsWith(href.replace(/\/$/, ""));
    return (
      <Link
        href={href}
        key={href}
        aria-current={active ? "page" : undefined}
        onClick={onNavigate}
      >
        {label}
      </Link>
    );
  });
}
