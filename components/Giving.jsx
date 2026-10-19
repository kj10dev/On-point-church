"use client";
import { useState } from "react";

const FUNDS = ["Tithe", "Missions", "Building Fund", "Benevolence", "General"];
const AMOUNTS = [50, 100, 250, 500, 1000];

export default function Giving() {
  const [tab, setTab] = useState("once");
  const [fund, setFund] = useState("Tithe");
  const [amount, setAmount] = useState(100);
  const [custom, setCustom] = useState("");
  const [done, setDone] = useState(false);

  const finalAmount = custom !== "" ? Number(custom) : amount;

  return (
    <section id="give" className="bg-ink py-20 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-400">Generosity</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Give with a cheerful heart 🧡</h2>
            <p className="mt-4 max-w-lg text-stone-300">
              Your giving heals, delivers, restores and sends. Every gift is secure,
              receipted instantly, and stewarded with integrity.
            </p>
            <p className="mt-6 text-sm text-stone-400">2 Cor 9:7 — “God loves a cheerful giver.”</p>
          </div>

          <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl sm:p-8">
            {!done ? (
              <>
                <div role="tablist" aria-label="Giving frequency" className="grid grid-cols-2 rounded-full bg-sand-200 p-1">
                  {[["once", "One-time"], ["recurring", "Recurring"]].map(([v, l]) => (
                    <button key={v} role="tab" aria-selected={tab === v} onClick={() => setTab(v)}
                      className={`rounded-full py-2 text-sm font-bold transition ${tab === v ? "bg-brand-600 text-white shadow" : "text-stone-600"}`}>{l}</button>
                  ))}
                </div>
                {tab === "recurring" && (
                  <p className="mt-3 rounded-xl bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700 ring-1 ring-brand-200">
                    🔄 Monthly recurring gift — you can pause anytime.
                  </p>
                )}

                <fieldset className="mt-5">
                  <legend className="mb-2 text-sm font-semibold">Designate your gift</legend>
                  <div className="flex flex-wrap gap-2">
                    {FUNDS.map(f => <button type="button" key={f} data-on={fund === f} className="chip" onClick={() => setFund(f)}>{f}</button>)}
                  </div>
                </fieldset>

                <fieldset className="mt-5">
                  <legend className="mb-2 text-sm font-semibold">Amount (R)</legend>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {AMOUNTS.map(a => <button type="button" key={a} data-on={custom === "" && amount === a} className="chip justify-center !py-2" onClick={() => { setAmount(a); setCustom(""); }}>R{a}</button>)}
                  </div>
                  <input className="mt-3" inputMode="numeric" placeholder="Custom amount (R)" value={custom} onChange={e => setCustom(e.target.value.replace(/[^0-9]/g, ""))} aria-label="Custom amount" />
                </fieldset>

                <div className="mt-5">
                  <p className="mb-2 text-sm font-semibold">Pay with</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button type="button" className="rounded-xl bg-black px-3 py-2.5 text-sm font-bold text-white transition hover:opacity-80" aria-label="Pay with Apple Pay"> Pay</button>
                    <button type="button" className="rounded-xl bg-white px-3 py-2.5 text-sm font-bold text-stone-700 ring-1 ring-stone-300 transition hover:bg-stone-50" aria-label="Pay with Google Pay">G Pay</button>
                    <button type="button" className="rounded-xl px-3 py-2.5 text-sm font-bold text-white transition hover:opacity-90" style={{background:"#5F259F"}} aria-label="Pay with SnapScan">SnapScan</button>
                  </div>
                </div>

                <button onClick={() => setDone(true)} className="btn-primary mt-6 w-full !py-3.5">
                  {tab === "once" ? "Give" : "Start Monthly Giving"} — R{finalAmount || 0} to {fund}
                </button>
                <p className="mt-3 text-center text-xs text-stone-400">Secure 256-bit encrypted · Tax-deductible receipts issued instantly</p>
              </>
            ) : (
              <div className="py-8 text-center" aria-live="polite">
                <p className="text-4xl" aria-hidden="true">🙌</p>
                <h3 className="mt-2 text-2xl font-extrabold text-brand-700">Thank you!</h3>
                <p className="mt-1 text-sm text-stone-500">
                  {tab === "recurring" ? "Your monthly gift" : "Your gift"} of <strong>R{finalAmount}</strong> to <strong>{fund}</strong>
                  {tab === "recurring" ? " will process monthly." : " is being processed."} A receipt is on its way to your inbox.
                </p>
                <button onClick={() => setDone(false)} className="btn-outline mt-6 w-full">Give Again</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
