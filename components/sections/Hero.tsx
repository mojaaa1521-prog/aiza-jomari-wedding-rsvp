"use client";

import Image from "next/image";
import FloralBackground from "@/components/floral/FloralBackground";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">

      {/* Background Image */}

      <Image
        src="/couple/Hero.jpg"
        alt="Aiza & Jomari"
        fill
        priority
        className="object-cover object-bottom"
      />

      {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/45" />

      {/* Floral Decorations */}
      <FloralBackground />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">

        <p
  className="
    uppercase
    tracking-[0.55em]
    text-xs
    font-medium
    text-[#F7E7CE]/90
  "
>
  Together with our families
</p>

        <h1 className="mt-8 font-[family:var(--font-heading)] text-6xl md:text-8xl leading-none">
          Aiza
          <br />
          <span className="text-[#F7E7CE]">&</span>
          <br />
          Jomari
        </h1>

        <div className="mx-auto my-10 h-px w-36 bg-[#C8A04A]" />

        <p className="text-xl tracking-[0.25em]">
          December 17, 2026
        </p>

        <p className="mt-4 text-lg text-white/90">
          Ceremony • 1:00 PM
        </p>

        <p className="mt-2 max-w-xl mx-auto text-white/80">
          Minor Basilica of the National Shrine of Our Lady of Mount Carmel
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">

          <a
            href="#wedding"
            className="rounded-full bg-[#8A2846] px-10 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#6D1E39]"
          >
            View Invitation
          </a>

          <a
            href="#rsvp"
            className="rounded-full border border-[#F7E7CE] px-10 py-4 font-semibold text-[#F7E7CE] transition-all duration-300 hover:bg-[#F7E7CE] hover:text-[#8A2846]"
          >
            RSVP Now
          </a>

        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white text-3xl">
        ↓
      </div>

    </section>
  );
}