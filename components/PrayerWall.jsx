"use client";
import { useState } from "react";
import { PHONE_LINK } from "../lib/data";

const INITIAL = [
  { id:"p1", name:"Sarah", text:"Please pray for my mom's surgery on Thursday. Believing for full healing.", praises:false, count:23, prayed:false },
  { id:"p2", name:"Anonymous", text:"Grateful — 6 months sober today. God is faithful!", praises:true, count:51, prayed:false },
  { id:"p3", name:"Thabo", text:"Starting a new job next week. Praying for favor and peace.", praises:false, count:12, prayed:false },
  { id:"p4", name:"Anonymous", text:"Thank You, Jesus, for restoring my marriage. What a miracle.", praises:true, count:38, prayed:false },
];

export default function PrayerWall() {
  const [items, setItems] = useState(INITIAL);
  const [tab, setTab] = useState("all");        // all | requests | praises
  const [text, setText] = useState("");
  const [anon, setAnon] = useState(true);
  const [name, setName] = useState("");
  const [isPraise, setIsPraise] = useState(false);
  const [sent, setSent] = useState(false);

  const filtered = items.filter(i => tab === "all" || (tab === "praises" ? i.praises : !i.praises));

  const pray = (id) => setItems(items.map(i =>
    i.id === id && !i.prayed ? { ...i, count: i.count + 1, prayed: true } : i));

  const submit = (e) => {
    e.preventDefault();
    setItems([{ id: Date.now().toString(), name: anon ? "Anonymous" : name || "Friend", text, praises: isPraise, count: 0, prayed: false }, ...items]);
    setText(""); setName(""); setSent(true); setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="prayer" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-600">Prayer</p>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Prayer Wall &amp; Connect Card</h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,1.4fr]">
          {/* Submit form */}
          <form onSubmit={submit} className="card h-fit space-y-4" aria-label="Submit a prayer request">
            <h3 className="text-lg font-bold text-brand-700">🙏 Share a request or praise</h3>
            <div className="flex gap-2">
              <button type="button" data-on={!isPraise} className="chip" onClick={() => setIsPraise(false)}>Request</button>
              <button type="button" data-on={isPraise} className="chip" onClick={() => setIsPraise(true)}>🎉 Praise</button>
            </div>
            {!anon && <div><label htmlFor="pw-name">Your name</label><input id="pw-name" value={name} onChange={e => setName(e.target.value)} placeholder="Name" /></div>}
            <div>
              <label htmlFor="pw-text">{isPraise ? "Your praise report" : "Your prayer request"}</label>
              <textarea id="pw-text" required rows={4} value={text} onChange={e => setText(e.target.value)}
                placeholder="We read every request — our team prays over these daily." />
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-stone-600">
              <input type="checkbox" checked={anon} onChange={e => setAnon(e.target.checked)} className="!h-4 !w-4 rounded accent-brand-600" />
              Post anonymously
            </label>
            <button className="btn-primary w-full">{isPraise ? "Post Praise" : "Submit Request"}</button>
            {sent && <p className="rounded-xl bg-amber-50 px-3 py-2 text-center text-sm font-semibold text-amber-800" role="status">Added to this browser session only. The church team has not been notified.</p>}
            <p className="text-xs text-stone-500">This demo wall only updates in this browser session. Posts are not sent to church leaders or shared with other visitors. For prayer with the church team, <a className="font-semibold text-brand-700 underline" href={PHONE_LINK}>call us</a>.</p>
          </form>

          {/* Wall */}
          <div>
            <div role="tablist" aria-label="Prayer wall filter" className="flex gap-2">
              {[["all","All"],["requests","Requests"],["praises","Praises"]].map(([v,l]) => (
                <button key={v} role="tab" aria-selected={tab === v} data-on={tab === v} className="chip" onClick={() => setTab(v)}>{l}</button>
              ))}
            </div>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2" aria-live="polite">
              {filtered.map(i => (
                <li key={i.id} className="card !p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-brand-700">{i.praises ? "🎉 Praise" : "🙏 Request"} · {i.name}</p>
                  </div>
                  <p className="mt-2 text-sm text-stone-700">{i.text}</p>
                  <button onClick={() => pray(i.id)} disabled={i.prayed} aria-pressed={i.prayed}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-50 py-2 text-sm font-bold text-brand-700 ring-1 ring-brand-200 transition hover:bg-brand-100 disabled:bg-emerald-50 disabled:text-emerald-700 disabled:ring-emerald-200">
                    {i.prayed ? "✓ You prayed for this" : "🙌 I&apos;m praying for this"} · {i.count}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
