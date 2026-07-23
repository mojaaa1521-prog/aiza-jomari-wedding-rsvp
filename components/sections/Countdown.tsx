"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const weddingDate = new Date("2026-12-17T13:00:00").getTime();

  const calculateTime = () => {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    return {
      days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((difference / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
    };
  };

  // Start with zeros so server and client match
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimeLeft(calculateTime());

    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-[#F7E7CE] text-center">
      <h2 className="font-[family:var(--font-heading)] text-5xl text-[var(--color-burgundy)] mb-10">
        Counting Down To Our Wedding Day
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        <TimeBox value={timeLeft.days} label="Days" />
        <TimeBox value={timeLeft.hours} label="Hours" />
        <TimeBox value={timeLeft.minutes} label="Minutes" />
        <TimeBox value={timeLeft.seconds} label="Seconds" />
      </div>

      <p className="mt-8 text-lg text-[var(--color-burgundy)]">
        December 17, 2026 • 1:00 PM
      </p>
    </section>
  );
}

function TimeBox({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="w-28 rounded-2xl bg-[var(--color-burgundy)] p-6 text-white shadow-lg">
      <div className="text-3xl font-bold">{value}</div>
      <div className="mt-2 text-sm uppercase tracking-widest">{label}</div>
    </div>
  );
}