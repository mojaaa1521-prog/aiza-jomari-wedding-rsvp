"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { src: "/gallery/photo2.jpg" },
  { src: "/gallery/photo14.jpg" },
  { src: "/gallery/photo15.jpg" },
  { src: "/gallery/photo8.jpg" },
  { src: "/gallery/photo16.jpg" },
  { src: "/gallery/photo6.jpg" },
  { src: "/gallery/photo10.jpg" },
];

export default function OurJourney() {
  const [current, setCurrent] = useState(0);

  const nextPhoto = () => {
    setCurrent((prev) => (prev + 1) % photos.length);
  };

  const previousPhoto = () => {
    setCurrent((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Automatic carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-[#FFF9F3] py-32"
    >
      {/* Background Photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/gallery/photo5.jpg')",
        }}
      />

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-[#FFF9F3]/75" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">

        {/* ================================= */}
        {/* SECTION TITLE */}
        {/* ================================= */}

        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-[#8A2846]">
            Our Journey
          </p>

          <h2 className="mt-4 font-[family:var(--font-heading)] text-5xl text-[#8A2846] md:text-6xl">
            Our Love Story
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-[#3A2B2B]/70">
            The journey that brought us here.
          </p>
        </div>

        {/* ================================= */}
        {/* PHOTO CAROUSEL */}
        {/* ================================= */}

        <div className="mx-auto max-w-5xl rounded-[36px] border border-[#D8B86A]/60 bg-[#FFFDF9] p-3 shadow-[0_20px_60px_rgba(58,43,43,0.18)]">

          {/* MAIN PHOTO */}
          <div className="group relative h-[420px] overflow-hidden rounded-[28px] bg-[#F7E7CE] md:h-[520px]">

            <Image
              key={photos[current].src}
              src={photos[current].src}
              alt="Aiza & Jomari"
              fill
              priority={current === 0}
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover object-center transition-all duration-700"
            />

            {/* Bottom Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

            {/* Photo Text */}
            <div className="absolute bottom-8 left-6 right-6 text-center text-white md:bottom-10">

              <p className="text-xs uppercase tracking-[0.45em] text-[#F2C86A]">
                Aiza & Jomari
              </p>

            </div>

            {/* PREVIOUS BUTTON */}
            <button
              type="button"
              onClick={previousPhoto}
              aria-label="Previous photo"
              className="
                absolute
                left-4
                top-1/2
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/40
                bg-black/25
                text-white
                backdrop-blur-sm
                transition-all
                duration-300
                hover:scale-110
                hover:bg-[#8A2846]
                md:left-6
                md:h-12
                md:w-12
              "
            >
              <ChevronLeft size={25} />
            </button>

            {/* NEXT BUTTON */}
            <button
              type="button"
              onClick={nextPhoto}
              aria-label="Next photo"
              className="
                absolute
                right-4
                top-1/2
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/40
                bg-black/25
                text-white
                backdrop-blur-sm
                transition-all
                duration-300
                hover:scale-110
                hover:bg-[#8A2846]
                md:right-6
                md:h-12
                md:w-12
              "
            >
              <ChevronRight size={25} />
            </button>

          </div>

          {/* ================================= */}
          {/* PHOTO THUMBNAILS */}
          {/* ================================= */}

          <div className="mt-3 grid grid-cols-4 gap-2 md:grid-cols-7">

            {photos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`View photo ${index + 1}`}
                className={`
                  group
                  relative
                  h-[75px]
                  overflow-hidden
                  rounded-[14px]
                  border-2
                  transition-all
                  duration-300
                  md:h-[90px]
                  ${
                    current === index
                      ? "border-[#8A2846] shadow-md"
                      : "border-transparent opacity-70 hover:border-[#C8A04A] hover:opacity-100"
                  }
                `}
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 25vw, 14vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {current === index && (
                  <div className="absolute inset-0 bg-[#8A2846]/15" />
                )}
              </button>
            ))}

          </div>

          {/* PHOTO COUNTER */}
          <div className="mt-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#A58B72]">
              {current + 1} / {photos.length}
            </p>
          </div>

        </div>

        {/* ================================= */}
        {/* OUR LOVE STORY */}
        {/* ================================= */}

        <div className="mx-auto mt-12 max-w-5xl rounded-[36px] border border-[#D8B86A]/60 bg-[#FFFDF9]/95 px-8 py-12 text-center shadow-[0_20px_60px_rgba(58,43,43,0.15)]">

          <p className="text-xs uppercase tracking-[0.4em] text-[#C8A04A]">
            Our Journey
          </p>

          <h3 className="mt-3 font-[family:var(--font-heading)] text-4xl text-[#8A2846] md:text-5xl">
            Our Love Story
          </h3>

          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#8A7565]">
            The journey that brought us here
          </p>

          {/* Timeline */}
          <div className="relative mx-auto mt-12 max-w-4xl">

            {/* Timeline Line */}
            <div className="absolute left-[16%] right-[16%] top-4 hidden h-px bg-[#D8B86A] md:block" />

            <div className="relative grid gap-10 md:grid-cols-3 md:gap-4">

              {/* BEGINNING */}
              <div className="flex flex-col items-center">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7E7CE] text-[#8A2846] ring-4 ring-[#FFFDF9]">
                  <Heart size={15} fill="currentColor" />
                </div>

                <p className="mt-5 text-xs tracking-[0.15em] text-[#C8A04A]">
                  JUNE 4, 2020
                </p>

                <h4 className="mt-2 font-[family:var(--font-heading)] text-xl text-[#3A2B2B]">
                  The Beginning
                </h4>

              </div>

              {/* PROMISE */}
              <div className="flex flex-col items-center">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7E7CE] text-[#8A2846] ring-4 ring-[#FFFDF9]">
                  <Heart size={15} fill="currentColor" />
                </div>

                <p className="mt-5 text-xs tracking-[0.15em] text-[#C8A04A]">
                  APRIL 9, 2025
                </p>

                <h4 className="mt-2 font-[family:var(--font-heading)] text-xl text-[#3A2B2B]">
                  The Promise
                </h4>

              </div>

              {/* WEDDING */}
              <div className="flex flex-col items-center">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8A2846] text-white ring-4 ring-[#FFFDF9]">
                  <Heart size={15} fill="currentColor" />
                </div>

                <p className="mt-5 text-xs tracking-[0.15em] text-[#C8A04A]">
                  DECEMBER 17, 2026
                </p>

                <h4 className="mt-2 font-[family:var(--font-heading)] text-xl text-[#3A2B2B]">
                  The Wedding
                </h4>

              </div>

            </div>
          </div>

          {/* Bottom Text */}
          <div className="mx-auto mt-12 flex max-w-xl items-center gap-4">

            <div className="h-px flex-1 bg-[#D8B86A]" />

            <span className="font-[family:var(--font-heading)] text-xl text-[#8A2846]">
              Until We Say “I Do”
            </span>

            <div className="h-px flex-1 bg-[#D8B86A]" />

          </div>

        </div>

      </div>
    </section>
  );
}