import { ADDRESS, DIRECTIONS_URL, PHONE, PHONE_LINK, SERVICES } from "../lib/data";

export default function ConnectCard() {
  return (
    <section id="connect" className="mx-auto max-w-7xl px-4 py-20">
      <div className="card grid gap-10 bg-brand-50 !p-8 sm:!p-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold text-brand-800">Let&apos;s stay connected 💛</h2>
          <p className="mt-3 text-stone-600">Questions, testimonies, or just want to say hi? Call our team or visit us in KuGompo, South Africa.</p>
          <ul className="mt-6 space-y-2 text-sm text-stone-600">
            <li>📍 <a className="font-semibold text-brand-700 underline" href={DIRECTIONS_URL} target="_blank" rel="noreferrer">{ADDRESS} · Get directions</a></li>
            <li>📞 <a className="font-semibold text-brand-700 underline" href={PHONE_LINK}>{PHONE}</a></li>
            <li>🕘 {SERVICES.join(" · ")}</li>
          </ul>
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white p-6 ring-1 ring-brand-100">
          <h3 className="text-xl font-extrabold text-brand-700">Talk with our team</h3>
          <p className="mt-2 text-sm text-stone-600">Online messages are not configured yet, so nothing submitted on this site would reach us. Call us directly and we&apos;ll be glad to help.</p>
          <a className="btn-primary mt-5 w-full sm:w-auto" href={PHONE_LINK}>Call {PHONE}</a>
        </div>
      </div>
    </section>
  );
}
