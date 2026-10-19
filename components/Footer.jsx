import { ADDRESS, DIRECTIONS_URL, PHONE, PHONE_LINK } from "../lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink py-10 text-center text-stone-400">
      <p className="text-2xl font-extrabold text-white">On-Point Church</p>
      <p className="mt-1 text-sm">Real people · Real faith · Real change</p>
      <nav aria-label="Footer" className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
        <a href="#visit" className="transition hover:text-white">Plan a visit</a>
        <a href="#groups" className="transition hover:text-white">Small groups</a>
        <a href="#events" className="transition hover:text-white">Events</a>
        <a href="#prayer" className="transition hover:text-white">Prayer</a>
        <a href="#connect" className="transition hover:text-white">Contact</a>
      </nav>
      <p className="mt-4 text-sm">
        <a className="hover:text-white" href={PHONE_LINK}>{PHONE}</a>
        <span aria-hidden="true"> · </span>
        <a className="hover:text-white" href={DIRECTIONS_URL} target="_blank" rel="noreferrer">{ADDRESS} · Directions</a>
      </p>
      <p className="mt-4 text-xs">Heal. Deliver. Restore. Give. — Matt 10:8 The Call</p>
      <p className="mt-2 text-xs text-stone-500">© 2026 On-Point Church. All rights reserved.</p>
    </footer>
  );
}
