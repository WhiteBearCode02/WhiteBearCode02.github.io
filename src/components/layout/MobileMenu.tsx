"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Navigation } from "./Navigation";
import { profile } from "@/data/profile";
import { ExternalLink } from "@/components/common/ExternalLink";

export function MobileMenu({ resume }: { resume: ReactNode }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);
  return (
    <div className="mobile-menu">
      <button
        ref={button}
        className="menu-toggle"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open ? (
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="모바일 메뉴"
        >
          <Navigation onNavigate={() => setOpen(false)} />
          <ExternalLink href={profile.github}>
            GitHub <ArrowUpRight size={15} aria-hidden="true" />
          </ExternalLink>
          {resume}
        </nav>
      ) : null}
    </div>
  );
}
