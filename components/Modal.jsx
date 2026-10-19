"use client";
import { useEffect, useRef } from "react";

export default function Modal({ open, onClose, label, children, wide }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    const panel = ref.current;
    const focusables = panel?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusables?.[0]?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && focusables?.length) {
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; prev?.focus?.(); };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={label}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div ref={ref} className={`modal-panel relative max-h-[92vh] w-full ${wide?"max-w-3xl":"max-w-lg"} overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl`}>
        <button onClick={onClose} aria-label="Close dialog"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-sand-100 text-lg font-bold text-stone-600 transition hover:bg-sand-200">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
