"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import { qecmlNavigation } from "./qecml-navigation";

export default function QECMLNavigation({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside
        aria-label="QECML section navigation"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 left-0 z-30 overflow-hidden bg-[#700000] text-white shadow-2xl transition-[width] duration-300 ease-in-out ${
          isOpen ? "w-72" : "w-0"
        }`}
      >
        <div className="w-72 px-6 pb-8 pt-24">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#FFCC00]/75">
            QECML 2027
          </p>
          <nav aria-label="QECML pages" className="flex flex-col gap-1">
            {qecmlNavigation.map((item) => {
              const isExternal = "external" in item;
              const isActive = !isExternal &&
                (item.slug === "overview"
                  ? pathname === "/qecml"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.slug}
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-current={isActive ? "page" : undefined}
                  tabIndex={isOpen ? 0 : -1}
                  className={`rounded px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/10 hover:text-[#FFCC00] ${
                    isActive ? "bg-white/10 text-[#FFCC00]" : "text-white/85"
                  }`}
                >
                  {item.label}
                  {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <button
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={`fixed top-4 z-40 flex h-11 w-11 items-center justify-center rounded border border-white/25 bg-[#700000] text-white shadow-lg transition-all hover:bg-[#990000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFCC00] ${
          isOpen ? "left-[17rem]" : "left-4"
        }`}
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="flex w-5 flex-col gap-1">
          <span className={`h-0.5 w-full bg-current transition-transform ${isOpen ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`h-0.5 w-full bg-current transition-opacity ${isOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-full bg-current transition-transform ${isOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </span>
      </button>

      <div
        className={`min-w-0 flex-1 transition-[margin] duration-300 ease-in-out ${
          isOpen ? "lg:ml-72" : "ml-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
