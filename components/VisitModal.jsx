"use client";
import { useState } from "react";
import Modal from "./Modal";
import { DIRECTIONS_URL, SERVICES } from "../lib/data";

export default function VisitModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", kids: "", parking: "General" });
  const [submitted, setSubmitted] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const reset = () => { setStep(0); setSubmitted(false); setForm({ name: "", kids: "", parking: "General" }); };
  const close = () => { reset(); onClose(); };

  const submit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <Modal open={open} onClose={close} label="Plan your visit">
      <h2 className="mb-1 text-2xl font-extrabold text-brand-700">Plan Your Visit</h2>
      <p className="mb-5 text-sm text-stone-500">We can’t wait to meet you{form.name && `, ${form.name.split(" ")[0]}`}.</p>

      {!submitted ? (
        <form onSubmit={submit} className="space-y-4">
          {step === 0 && (
            <div>
              <label htmlFor="v-name">Your name</label>
              <input id="v-name" required value={form.name} onChange={set("name")} placeholder="e.g. Sarah Naidoo" autoComplete="name" />
            </div>
          )}
          {step === 1 && (
            <>
              <div>
                <label htmlFor="v-kids">Who is coming with you?</label>
                <select id="v-kids" value={form.kids} onChange={set("kids")}>
                  <option value="">Select…</option><option>No kids</option><option>0–2 years</option>
                  <option>3–5 years</option><option>6–12 years</option><option>Teens</option>
                </select>
              </div>
            </>
          )}
          {step === 2 && (
            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-stone-700">Parking preference</legend>
              <div className="flex flex-wrap gap-2">
                {["General", "Guest / Visitor", "Accessible", "Family with prams"].map(p => (
                  <button type="button" key={p} data-on={form.parking === p} className="chip" onClick={() => setForm({ ...form, parking: p })}>{p}</button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="flex items-center justify-between pt-2">
            <button type="button" disabled={step === 0} onClick={() => setStep(s => s - 1)}
              className="rounded-full px-4 py-2 text-sm font-semibold text-stone-500 disabled:opacity-30">← Back</button>
            <span className="text-xs text-stone-400" aria-live="polite">Step {step + 1} of 3</span>
            {step < 2
              ? <button type="button" onClick={() => setStep(s => s + 1)} className="btn-primary !px-5 !py-2 !text-sm">Next →</button>
              : <button type="submit" className="btn-primary !px-5 !py-2 !text-sm">Get My Welcome Guide ✨</button>}
          </div>
        </form>
      ) : (
        <div className="space-y-4" aria-live="polite">
          <div className="rounded-2xl bg-brand-50 p-5 ring-1 ring-brand-200">
            <h3 className="text-lg font-bold text-brand-700">Your personalized welcome guide 🎉</h3>
            <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-stone-700">
              <li><strong>{form.name.split(" ")[0]}, arrive 15 min early</strong> — our welcome team will meet you at the {form.parking.toLowerCase()} parking.</li>
              <li>{SERVICES[0]} — pick the service that suits you.</li>
              <li>{form.kids && form.kids !== "No kids"
                ? `Kids ministry check-in is at the main entrance — your ${form.kids} crew is sorted with secure check-in.`
                : "Coffee and connection start at the foyer after each service."}</li>
              <li>Come as you are — jeans are welcome.</li>
            </ul>
          </div>
          <a className="btn-outline w-full" href={DIRECTIONS_URL} target="_blank" rel="noreferrer">Get directions in Google Maps</a>
          <p className="text-xs text-stone-500">Your welcome guide is shown here only; this site does not email or save your visit details.</p>
          <button onClick={close} className="btn-outline w-full">Done — see you Sunday!</button>
        </div>
      )}
    </Modal>
  );
}
