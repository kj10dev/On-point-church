"use client";
import { useState, useMemo } from "react";
import Modal from "./Modal";
import { GROUPS, PHONE, PHONE_LINK } from "../lib/data";

const DAYS = ["Any", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const STAGES = ["Any", "Young Adults", "Families", "Seniors"];

export default function GroupFinder() {
  const [q, setQ] = useState("");
  const [day, setDay] = useState("Any");
  const [stage, setStage] = useState("Any");
  const [join, setJoin] = useState(null);      // group being joined

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
              <button onClick={() => setJoin(g)} className="btn-primary mt-4 w-full !py-2.5 !text-sm">Request to Join</button>
            </article>
          ))}
        </div>
        {groups.length === 0 && <p className="mt-8 text-center text-stone-400">No groups match — try clearing a filter.</p>}
      </div>

      <Modal open={!!join} onClose={() => setJoin(null)} label="Request to join group">
        {join && (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-brand-700">Join {join.name}</h3>
            <p className="text-sm text-stone-500">{join.neighborhood} · {join.day} {join.time}</p>
            <p className="text-sm text-stone-600">Online group requests are not connected yet. Call the church to ask about joining this group.</p>
            <a href={PHONE_LINK} className="btn-primary w-full">Call {PHONE}</a>
          </div>
        )}
      </Modal>
    </section>
  );
}
