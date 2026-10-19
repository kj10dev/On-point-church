"use client";

export default function Hero({ onVisit }) {
  return (
    <section id="top" className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-ink">
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline
        poster="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&q=70" aria-hidden="true">
        <source src="https://cdn.coverr.co/videos/coverr-people-worshipping-at-church-7244/1080p.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-brand-300">Real people • Real faith • Real change</p>
        <h1 className="text-5xl font-extrabold leading-tight drop-shadow-lg sm:text-7xl">You belong here.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-200 sm:text-xl">
          A place to encounter God, a family to belong to, a purpose to live for.
          Sundays 9:00 &amp; 11:00 — come as you are.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button onClick={onVisit} className="btn-primary w-full sm:w-auto">Plan Your Visit</button>
          <a href="#watch" className="btn-secondary w-full sm:w-auto">▶ Watch Live</a>
        </div>
      </div>
    </section>
  );
}
