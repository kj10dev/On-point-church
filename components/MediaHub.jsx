"use client";
import { useState, useMemo } from "react";
import { SERIES } from "../lib/data";

const unique = (arr) => ["All", ...new Set(arr)];

export default function MediaHub() {
  const [chatOpen, setChatOpen] = useState(false);
  const [series, setSeries] = useState("All");
  const [speaker, setSpeaker] = useState("All");
  const [topic, setTopic] = useState("All");
  const [query, setQuery] = useState("");
  const [playing, setPlaying] = useState(null); // sermon id being "listened to"

  const sermons = useMemo(() => SERIES.filter(s =>
    (series === "All" || s.series === series) &&
    (speaker === "All" || s.speaker === speaker) &&
    (topic === "All" || s.topic === topic) &&
    (query === "" || s.title.toLowerCase().includes(query.toLowerCase()))
  ), [series, speaker, topic, query]);

  const notesHref = (t) => "data:text/plain;charset=utf-8," + encodeURIComponent(`Sermon Notes\n\n${t}\n\nKey points:\n1. Jesus sets us free (John 8:36)\n2. We are healed, delivered, restored\n3. Go and give (Matt 10:8)`);

  return (
    <section id="watch" className="mx-auto max-w-7xl px-4 py-20">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-600">Watch &amp; Listen</p>
      <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Livestream &amp; Media Hub</h2>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-xl">
          <iframe className="h-full w-full" src="https://www.youtube.com/embed/live_stream?channel=UCexample" title="Livestream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" aria-hidden="true" />LIVE
          </span>
          <button onClick={() => setChatOpen(o => !o)} aria-expanded={chatOpen}
            className="absolute bottom-3 right-3 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-brand-700 shadow transition hover:bg-white">
            {chatOpen ? "Hide Chat" : "💬 Live Chat"}
          </button>
        </div>

        {chatOpen && (
          <aside className="flex flex-col rounded-2xl bg-white p-4 shadow-md ring-1 ring-sand-200" aria-label="Live chat">
            <h3 className="mb-2 font-bold text-brand-700">Live Chat</h3>
            <div className="flex-1 space-y-2 overflow-y-auto rounded-xl bg-sand-100 p-3 text-sm">
              <p><strong className="text-brand-600">Thandi:</strong> Amen!! 🔥</p>
              <p><strong className="text-brand-600">Kea:</strong> That word hit home today 🙏</p>
              <p><strong className="text-brand-600">Visitor_12:</strong> First time watching — this is amazing</p>
            </div>
            <form className="mt-3 flex gap-2" onSubmit={e => e.preventDefault()}>
              <input aria-label="Chat message" placeholder="Say hello…" />
              <button className="btn-primary shrink-0 !px-4 !py-2 !text-sm">Send</button>
            </form>
          </aside>
        )}
      </div>

      {/* Archive */}
      <div className="card mt-10">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[200px] flex-1">
            <label htmlFor="q">Search sermons</label>
            <input id="q" value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g. freedom…" />
          </div>
          {[ ["Series", series, setSeries], ["Speaker", speaker, setSpeaker], ["Topic", topic, setTopic] ].map(([label, val, setVal]) => (
            <div key={label}>
              <label htmlFor={`f-${label}`}>{label}</label>
              <select id={`f-${label}`} value={val} onChange={e => setVal(e.target.value)} className="!w-auto">
                {unique(SERIES.map(s => s[label.toLowerCase()])).map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm text-stone-500" aria-live="polite">{sermons.length} sermon{sermons.length !== 1 && "s"} found</p>
        <ul className="mt-3 divide-y divide-sand-200">
          {sermons.map(s => (
            <li key={s.id} className="flex flex-wrap items-center gap-3 py-4">
              <div className="min-w-0 flex-1">
                <p className="font-bold">{s.title} <span className="tag ml-2 bg-brand-100 text-brand-700">{s.series}</span></p>
                <p className="text-sm text-stone-500">{s.speaker} · {s.topic}</p>
              </div>
              <button onClick={() => setPlaying(playing === s.id ? null : s.id)} aria-pressed={playing === s.id}
                className="btn-outline !px-4 !py-1.5 !text-sm">{playing === s.id ? "⏸ Stop" : "🎧 Listen"}</button>
              <a href={notesHref(s.title)} download={`${s.title}-notes.txt`} className="btn-outline !px-4 !py-1.5 !text-sm">📄 Notes</a>
              {playing === s.id && (
                <div className="w-full" aria-live="polite">
                  <audio className="w-full" controls autoPlay src="" aria-label={`Audio player for ${s.title}`} />
                </div>
              )}
            </li>
          ))}
          {sermons.length === 0 && <li className="py-6 text-center text-stone-400">No sermons match those filters.</li>}
        </ul>
      </div>
    </section>
  );
}
