"use client";
import { useState } from "react";
import { PHONE, PHONE_LINK } from "../lib/data";

const FUNDS = ["Tithe", "Missions", "Building Fund", "Benevolence", "General"];
const AMOUNTS = [50, 100, 250, 500, 1000];

export default function Giving() {
  const [tab, setTab] = useState("once");
  const [fund, setFund] = useState("Tithe");
  const [amount, setAmount] = useState(100);
  const [custom, setCustom] = useState("");

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
            <>
              <div role="tablist" aria-label="Giving frequency" className="grid grid-cols-2 rounded-full bg-sand-200 p-1">
                {[["once", "One-time"], ["recurring", "Recurring"]].map(([v, l]) => (
                  <button type="button" key={v} role="tab" aria-selected={tab === v} onClick={() => setTab(v)}
                    className={`rounded-full py-2 text-sm font-bold transition ${tab === v ? "bg-brand-600 text-white shadow" : "text-stone-600"}`}>{l}</button>
                ))}
              </div>

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

              <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
                Online giving is not configured yet. No payment will be taken and no receipt will be issued from this page.
              </div>
              <a href={PHONE_LINK} className="btn-primary mt-4 w-full !py-3.5">
                Call {PHONE} to arrange {tab === "once" ? "a" : "recurring"} gift of R{finalAmount || 0} to {fund}
              </a>
            </>
          </div>
        </div>
      </div>
    </section>
  );
}
