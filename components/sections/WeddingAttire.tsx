
"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ======================================
// WEDDING ATTIRE SLIDES
// ======================================

const attireSlides = [
  {
    src: "/attire/wedding-attireG.jpg",
    title: "Wedding Guest Attire",
    description: "Burgundy · Blush Pink · Champagne Beige",
    alt: "Wedding guest attire guide",
    width: 1536,
    height: 1024,
  },
  {
    src: "/attire/sponsor-attire.jpg",
    title: "Principal Sponsors Attire",
    description: "Ninong & Ninang Outfit Inspiration",
    alt: "Principal sponsors attire guide featuring Barong Tagalog and formal gown",
    width: 1408,
    height: 768,
  },
];

export default function WeddingAttire() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % attireSlides.length
    );
  };

  const previousSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + attireSlides.length) %
        attireSlides.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = attireSlides[currentSlide];

  return (
    <section
      id="attire"
      className="relative overflow-hidden bg-[#FCF8F1] px-4 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-6xl">

        {/* ====================================== */}
        {/* SECTION HEADER */}
        {/* ====================================== */}

        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-[#8A2846]">
            A Guide for Our Guests
          </p>

          <h2 className="mt-4 font-(--font-heading) text-4xl text-[#722F37] md:text-6xl">
            Wedding Attire
          </h2>

          <p className="mt-4 text-lg tracking-[0.1em] text-[#8E6F47]">
            Burgundy · Blush Pink · Champagne Beige
          </p>

          <div className="mx-auto mt-6 h-px w-24 bg-[#D6C39F]" />

          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-[#5C4940]">
            We invite our guests to explore our wedding attire
            guides for both wedding guests and principal sponsors.
            Thank you for celebrating this special day with us!
          </p>
        </div>

        {/* ====================================== */}
        {/* WEDDING ATTIRE SLIDESHOW */}
        {/* ====================================== */}

        <div className="overflow-hidden rounded-2xl border border-[#D6C39F]/60 bg-white shadow-lg">

          {/* CURRENT SLIDE IMAGE */}

          <div className="relative w-full bg-[#FFFDF9]">
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              sizes="(max-width: 768px) 100vw, 1152px"
              className="block h-auto w-full object-contain"
            />
          </div>

          {/* SLIDE INFORMATION */}

          <div className="px-4 py-7 text-center md:px-8">

            <h3 className="font-(--font-heading) text-2xl text-[#722F37] md:text-3xl">
              {slide.title}
            </h3>

            <p className="mt-2 text-sm tracking-wide text-[#8E6F47]">
              {slide.description}
            </p>

            {/* PREVIOUS / NEXT BUTTONS */}

            <div className="mt-6 flex items-center justify-center gap-6">

              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous attire slide"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D6C39F] bg-[#FFF9F3] text-[#8A2846] transition duration-300 hover:scale-105 hover:bg-[#F0E2D6]"
              >
                <ChevronLeft size={22} />
              </button>

              <span className="min-w-12 text-sm font-semibold text-[#8A2846]">
                {currentSlide + 1} / {attireSlides.length}
              </span>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next attire slide"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D6C39F] bg-[#FFF9F3] text-[#8A2846] transition duration-300 hover:scale-105 hover:bg-[#F0E2D6]"
              >
                <ChevronRight size={22} />
              </button>

            </div>

            {/* NAVIGATION DOTS */}

            <div className="mt-5 flex items-center justify-center gap-3">
              {attireSlides.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to ${item.title}`}
                  aria-current={
                    currentSlide === index
                      ? "true"
                      : undefined
                  }
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-8 bg-[#8A2846]"
                      : "w-2.5 bg-[#D6C39F] hover:bg-[#C8A04A]"
                  }`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* ====================================== */}
        {/* WEDDING REMINDERS HEADER */}
        {/* ====================================== */}

        <div className="mt-16 text-center">

          <p className="text-sm uppercase tracking-[0.4em] text-[#8A2846]">
            A Gentle Reminder
          </p>

          <h3 className="mt-4 font-(--font-heading) text-3xl text-[#722F37] md:text-5xl">
            Wedding Reminders
          </h3>

          <div className="mx-auto mt-6 h-px w-24 bg-[#D6C39F]" />

          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-[#5C4940]">
            A few thoughtful reminders to help make our
            celebration wonderful for everyone.
          </p>
        </div>

        {/* ====================================== */}
        {/* WEDDING REMINDERS IMAGE */}
        {/* ====================================== */}

        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-[#D6C39F]/60 bg-white p-3 shadow-lg md:p-6">

          <Image
            src="/attire/wedding-reminders.png"
            alt="Wedding guidelines about adult-only celebration, invited guests, gifts, and RSVP confirmation"
            width={1200}
            height={900}
            sizes="(max-width: 768px) 100vw, 1024px"
            className="block h-auto w-full object-contain"
          />

        </div>

        {/* ====================================== */}
        {/* FOOTER */}
        {/* ====================================== */}

        <p className="mt-10 text-center text-sm italic text-[#8E6F47]">
          Elegant attire · Beautiful memories · Together in love
        </p>

      </div>
    </section>
  );
}
