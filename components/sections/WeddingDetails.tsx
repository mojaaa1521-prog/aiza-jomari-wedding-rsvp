"use client";

import { Church, PartyPopper } from "lucide-react";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import VenueCard from "@/components/ui/VenueCard";

export default function WeddingDetails() {
  return (
    <section
      id="wedding"
      className="relative overflow-hidden bg-[#FFF9F3] py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#FFF9F3]" />

      {/* Content */}
      <div className="relative z-10">
        <Container>

          <SectionTitle
            eyebrow="Our Wedding"
            title="Join Us On Our Special Day"
            subtitle="Together with our families, we invite you to celebrate our wedding."
          />

          {/* Ceremony & Reception */}
          <div className="mx-auto mt-20 grid max-w-6xl gap-10 lg:grid-cols-2">

            {/* ================================= */}
            {/* CEREMONY */}
            {/* ================================= */}

            <VenueCard
              image="/venue/church.jpg"
              title="Ceremony"
              icon={<Church size={32} />}
              date="December 17, 2026"
              time="1:00 PM – 3:00 PM"
              location="Minor Basilica of the National Shrine of Our Lady of Mount Carmel"
              map="https://www.google.com/maps/place/Minor+Basilica+of+the+National+Shrine+of+Our+Lady+of+Mount+Carmel+(Diocese+of+Cubao)/@14.6143252,121.0307065,225m/data=!3m1!1e3!4m6!3m5!1s0x3397b6327d2e54c9:0x39a6d6a8b7eea521!8m2!3d14.6144003!4d121.030824!16s%2Fg%2F1tfrv0f7?entry=ttu"
            />

            {/* ================================= */}
            {/* RECEPTION */}
            {/* ================================= */}

            <VenueCard
              image="/venue/reception.jpg"
              title="Reception"
              icon={<PartyPopper size={32} />}
              date="December 17, 2026"
              time="4:00 PM – 8:00 PM"
              location="Oasis Manila"
              map="https://maps.google.com/?q=Oasis+Manila"
            />

          </div>

        </Container>
      </div>
    </section>
  );
}