"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import VisitModal from "../components/VisitModal";
import MediaHub from "../components/MediaHub";
import GroupFinder from "../components/GroupFinder";
import EventsCalendar from "../components/EventsCalendar";
import Giving from "../components/Giving";
import PrayerWall from "../components/PrayerWall";
import ConnectCard from "../components/ConnectCard";
import Footer from "../components/Footer";

export default function Page() {
  const [visitOpen, setVisitOpen] = useState(false);
  return (
    <>
      <Navbar onVisit={() => setVisitOpen(true)} />
      <main id="main">
        <Hero onVisit={() => setVisitOpen(true)} />

        <section id="visit" className="mx-auto max-w-7xl px-4 py-20 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">This Sunday could change everything.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-600">
            Come exactly as you are. Expect warm coffee, real worship, biblical teaching,
            and a community that will know your name by the time you leave.
          </p>
          <button onClick={() => setVisitOpen(true)} className="btn-primary mt-8">Plan Your Visit →</button>
        </section>

        <MediaHub />
        <GroupFinder />
        <EventsCalendar />
        <Giving />
        <PrayerWall />
        <ConnectCard />
      </main>
      <Footer />
      <VisitModal open={visitOpen} onClose={() => setVisitOpen(false)} />
    </>
  );
}
