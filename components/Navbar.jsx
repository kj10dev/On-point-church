"use client";
import { useState } from "react";

const LINKS = [
  ["Visit", "#visit"], ["Watch", "#watch"], ["Groups", "#groups"],
  ["Events", "#events"], ["Give", "#give"], ["Prayer", "#prayer"], ["Contact", "#connect"],
];

export default function Navbar({ onVisit }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white/90 shadow-sm backdrop-blur">
      <a href="#main" className="skip-link">Skip to main content</a>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3" aria-label="Main">
        <a href="#top" className="flex items-center gap-2 font-bold text-brand-700">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-white" aria-hidden="true">✝</span>
          On-Point Church
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-semibold text-stone-700 transition hover:text-brand-600">{label}</a>
          ))}
          <button onClick={onVisit} className="btn-primary !px-5 !py-2 !text-sm">Plan Your Visit</button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
          <svg className="h-7 w-7 text-brand-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} /></svg>
        </button>
      </nav>
      {open && (
        <div className="border-t border-sand-200 bg-white px-4 pb-4 md:hidden">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-sand-100 py-3 font-semibold text-stone-700">{label}</a>
          ))}
          <button onClick={() => { setOpen(false); onVisit(); }} className="btn-primary mt-4 w-full">Plan Your Visit</button>
        </div>
      )}
    </header>
  );
}
