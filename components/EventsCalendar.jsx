"use client";
import { useState } from "react";
import Modal from "./Modal";
import { EVENTS } from "../lib/data";

const CATS = { Worship: "bg-brand-100 text-brand-700", Youth: "bg-sky-100 text-sky-700", Outreach: "bg-emerald-100 text-emerald-700" };
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function EventsCalendar() {
  const [view, setView] = useState("month");
  const [cat, setCat] = useState("All");
  const [month, setMonth] = useState(9); // October 2026
  const [reg, setReg] = useState(null);

  const filtered = EVENTS.filter(e => {
    const d = new Date(e.date + "T00:00:00");
    return (cat === "All" || e.cat === cat) && (view === "list" || d.getMonth() === month);
  });

  const addToCalendar = (e) => {
    const ics = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//OnPointChurch//EN","BEGIN:VEVENT",
      `UID:${e.id}@onpointchurch`,`DTSTART:${e.date.replaceAll("-","")}T${e.time.replace(":","")}00`,
      `SUMMARY:${e.title}`,`DESCRIPTION:${e.desc}`,`END:VEVENT`,`END:VCALENDAR`].join("\r\n");
    const a = document.createElement("a");
    a.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
    a.download = e.title.replaceAll(" ", "-") + ".ics"; a.click();
  };

  const days = new Date(2026, month + 1, 0).getDate();
  const cells = Array.from({ length: days }, (_, i) => {
    const ds = `2026-${String(month + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
    return { day: i + 1, events: EVENTS.filter(e => e.date === ds && (cat === "All" || e.cat === cat)) };
  });

  return (
    <section id="events" className="mx-auto max-w-7xl px-4 py-20">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-600">What&apos;s On</p>
      <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Events Calendar</h2>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div role="tablist" aria-label="Calendar view" className="flex rounded-full bg-sand-200 p-1">
          {[["month","Month"],["list","List"]].map(([v, l]) => (
            <button key={v} role="tab" aria-selected={view === v} onClick={() => setView(v)}
              className={`rounded-full px-5 py-1.5 text-sm font-bold transition ${view === v ? "bg-brand-600 text-white shadow" : "text-stone-600"}`}>{l}</button>
          ))}
        </div>
        {view === "month" && (
          <div className="flex items-center gap-2">
            <button aria-label="Previous month" onClick={() => setMonth(m => Math.max(0, m - 1))} className="chip">←</button>
            <strong className="w-28 text-center">{MONTHS[month]} 2026</strong>
            <button aria-label="Next month" onClick={() => setMonth(m => Math.min(11, m + 1))} className="chip">→</button>
          </div>
        )}
        {["All", "Youth", "Worship", "Outreach"].map(c => (
          <button key={c} data-on={cat === c} className="chip" onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      {view === "month" ? (
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7" role="grid" aria-label="Month view">
          {cells.map(c => (
            <div key={c.day} role="gridcell" className={`min-h-[90px] rounded-xl p-2 ring-1 ${c.events.length ? "bg-white ring-brand-300 shadow" : "bg-sand-100 ring-sand-200"}`}>
              <span className={`text-sm font-bold ${c.events.length ? "text-brand-700" : "text-stone-400"}`}>{c.day}</span>
              <ul className="mt-1 space-y-1">
                {c.events.map(e => (
                  <li key={e.id}>
                    <button onClick={() => setReg(e)} className={`w-full truncate rounded px-1.5 py-0.5 text-left text-xs font-semibold ${CATS[e.cat]}`}>{e.title}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map(e => (
            <li key={e.id} className="card flex flex-wrap items-center gap-3 !py-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-brand-50 text-center ring-1 ring-brand-200">
                <div><p className="text-lg font-extrabold leading-none text-brand-700">{new Date(e.date + "T00:00:00").getDate()}</p>
                <p className="text-[10px] font-bold uppercase text-brand-600">{MONTHS[new Date(e.date + "T00:00:00").getMonth()].slice(0,3)}</p></div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold">{e.title} <span className={`tag ml-2 ${CATS[e.cat]}`}>{e.cat}</span></p>
                <p className="truncate text-sm text-stone-500">{e.desc} · {e.time}</p>
              </div>
              <button onClick={() => addToCalendar(e)} className="btn-outline !px-4 !py-1.5 !text-sm">📅 Add to Calendar</button>
              <button onClick={() => setReg(e)} className="btn-primary !px-4 !py-1.5 !text-sm">Register</button>
            </li>
          ))}
          {filtered.length === 0 && <li className="py-8 text-center text-stone-400">No events here — try another month or category.</li>}
        </ul>
      )}

      <Modal open={!!reg} onClose={() => setReg(null)} label="Event registration">
        {reg && (
          <form onSubmit={ev => { ev.preventDefault(); setReg(null); }} className="space-y-4">
            <span className={`tag ${CATS[reg.cat]}`}>{reg.cat}</span>
            <h3 className="text-xl font-extrabold text-brand-700">{reg.title}</h3>
            <p className="text-sm text-stone-500">📅 {new Date(reg.date + "T00:00:00").toDateString()} · {reg.time} — {reg.desc}</p>
            <div><label htmlFor="er-name">Name</label><input id="er-name" required placeholder="Full name" autoComplete="name" /></div>
            <div><label htmlFor="er-email">Email</label><input id="er-email" type="email" required placeholder="you@email.com" autoComplete="email" /></div>
            <div className="flex gap-3">
              <button type="button" onClick={() => { addToCalendar(reg); }} className="btn-outline flex-1">📅 Add to Calendar</button>
              <button type="submit" className="btn-primary flex-1">Confirm Registration</button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  );
}
