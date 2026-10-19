"use client";
import { useState, useMemo } from "react";
import Modal from "./Modal";
import { GROUPS } from "../lib/data";

const DAYS = ["Any", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const STAGES = ["Any", "Young Adults", "Families", "Seniors"];

export default function GroupFinder() {
  const [q, setQ] = useState("");
  const [day, setDay] = useState("Any");
  const [stage, setStage] = useState("Any");
  const [join, setJoin] = useState(null);      // group being joined
  const [done, setDone] = useState(false);

  const groups = useMemo(() => GROUPS.filter(g =>
    (day === "Any" || g.day === day) &&
    (stage === "Any" || g.stage === stage) &&
    (q === "" || (g.name + g.neighborhood).toLowerCase().includes(q.toLowerCase()))
  ), [q, day, stage]);

  return (
    <section id="groups" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-600">Community</p>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Find Your Small Group</h2>
        <p className="mt-3 max-w-xl text-stone-600">Real faith grows in circles, not rows. Filter by area, day or life stage and find your people.</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <input className="max-w-xs" aria-label="Search by name or neighborhood" placeholder="Search name or neighborhood…"
            value={q} onChange={e => setQ(e.target.value)} />
          <select aria-label="Day of week" value={day} onChange={e => setDay(e.target.value)} className="!w-auto">
            {DAYS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select aria-label="Life stage" value={stage} onChange={e => setStage(e.target.value)} className="!w-auto">
            {STAGES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <p className="mt-4 text-sm text-stone-500" aria-live="polite">{groups.length} group{groups.length !== 1 && "s"} found</p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(g => (
            <article key={g.id} className="card flex flex-col">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold">{g.name}</h3>
                <span className="tag bg-brand-100 text-brand-700">{g.stage}</span>
              </div>
              <p className="mt-2 flex-1 text-sm text-stone-600">{g.desc}</p>
              <p className="mt-3 text-sm text-stone-500">📍 {g.neighborhood} · {g.day} {g.time}{g.kids && " · 👶 Kids welcome"}</p>
              <button onClick={() => { setJoin(g); setDone(false); }} className="btn-primary mt-4 w-full !py-2.5 !text-sm">Request to Join</button>
            </article>
          ))}
        </div>
        {groups.length === 0 && <p className="mt-8 text-center text-stone-400">No groups match — try clearing a filter.</p>}
      </div>

      <Modal open={!!join} onClose={() => setJoin(null)} label="Request to join group">
        {join && !done ? (
          <form onSubmit={() => setDone(true)} className="space-y-4">
            <h3 className="text-xl font-extrabold text-brand-700">Join {join.name}</h3>
            <p className="text-sm text-stone-500">{join.neighborhood} · {join.day} {join.time}</p>
            <div><label htmlFor="gj-name">Your name</label><input id="gj-name" required placeholder="Full name" autoComplete="name" /></div>
            <div><label htmlFor="gj-email">Email</label><input id="gj-email" type="email" required placeholder="you@email.com" autoComplete="email" /></div>
            <div><label htmlFor="gj-msg">Anything we should know? (optional)</label><textarea id="gj-msg" rows="3" placeholder="e.g. Coming with my spouse…" /></div>
            <button className="btn-primary w-full">Send Request</button>
          </form>
        ) : join && (
          <div className="py-6 text-center" aria-live="polite">
            <p className="text-4xl" aria-hidden="true">🎉</p>
            <h3 className="mt-2 text-xl font-extrabold text-brand-700">Request sent!</h3>
            <p className="mt-1 text-sm text-stone-500">The {join.name} leader will reach out within 48 hours.</p>
            <button onClick={() => setJoin(null)} className="btn-outline mt-6 w-full">Done</button>
          </div>
        )}
      </Modal>
    </section>
  );
}
