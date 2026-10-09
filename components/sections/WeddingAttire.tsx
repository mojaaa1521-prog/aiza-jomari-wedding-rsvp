
import Image from "next/image";

export default function WeddingAttire() {
  return (
    <section
      id="attire"
      className="relative overflow-hidden bg-[#FCF8F1] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-[#8A2846]">
            A Guide for Our Guests
          </p>

          <h2 className="mt-4 font-[family:var(--font-heading)] text-4xl text-[#722F37] md:text-6xl">
            Wedding Attire
          </h2>

          <p className="mt-4 text-lg tracking-[0.15em] text-[#8E6F47]">
            Burgundy · Gold · Beige
          </p>

          <div className="mx-auto mt-6 h-px w-24 bg-[#D6C39F]" />

          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-[#5C4940]">
            We invite our guests to wear formal or semi-formal attire
            inspired by our wedding colors. Thank you for celebrating
            this special day with us!
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#D6C39F]/60 bg-white shadow-lg">
          <img
  src="/attire/wedding-attire.png"
  alt="Wedding attire in burgundy, gold, and beige"
  className="h-auto w-full"
/>
        </div>

        <p className="mt-6 text-center text-sm italic text-[#8E6F47]">
          Elegant attire · Beautiful memories · Together in love
        </p>
      </div>
    </section>
  );
}
