"use client";
import { useState } from "react";

export default function ConnectCard() {
  const [sent, setSent] = useState(false);
  return (
    <section id="connect" className="mx-auto max-w-7xl px-4 py-20">
      <div className="card grid gap-10 bg-brand-50 !p-8 sm:!p-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold text-brand-800">Let&apos;s stay connected 💛</h2>
          <p className="mt-3 text-stone-600">Questions, testimonies, or just want to say hi? This goes straight to our pastoral team — we reply within 2 days.</p>
          <ul className="mt-6 space-y-2 text-sm text-stone-600">
            <li>📍 On-Point Church Campus, Main Rd, Midrand</li>
            <li>📞 072 567 2466</li>
            <li>🕘 Sundays 9:00 &amp; 11:00 · Wednesdays 19:00</li>
          </ul>
        </div>
        {!sent ? (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
            <div><label htmlFor="cc-name">Name</label><input id="cc-name" required placeholder="Full name" autoComplete="name" /></div>
            <div><label htmlFor="cc-email">Email</label><input id="cc-email" type="email" required placeholder="you@email.com" autoComplete="email" /></div>
            <div><label htmlFor="cc-msg">Message</label><textarea id="cc-msg" required rows={4} placeholder="How can we help / pray for you?" /></div>
            <button className="btn-primary w-full">Send to Leadership</button>
          </form>
        ) : (
          <div className="grid place-items-center text-center" aria-live="polite">
            <div><p className="text-5xl" aria-hidden="true">💌</p>
            <h3 className="mt-3 text-2xl font-extrabold text-brand-700">Message received!</h3>
            <p className="mt-1 text-sm text-stone-500">Someone from our team will reach out soon.</p></div>
          </div>
        )}
      </div>
    </section>
  );
}
