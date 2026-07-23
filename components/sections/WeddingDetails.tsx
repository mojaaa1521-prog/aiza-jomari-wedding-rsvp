"use client";

import { Church, PartyPopper } from "lucide-react";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import VenueCard from "@/components/ui/VenueCard";

export default function WeddingDetails() {
  return (
    <section
      id="wedding"
      className="relative overflow-hidden bg-cover bg-center py-28"
      style={{
        backgroundImage: "url('/background/wedding-details.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 transition-colors duration-500 dark:bg-[#1B1316]/75" />

      {/* Content */}
      <div className="relative z-10">
        <Container>
          <SectionTitle
            eyebrow="Our Wedding"
            title="Join Us On Our Special Day"
            subtitle="Together with our families, we invite you to celebrate our wedding."
          />

          <div className="grid gap-10 lg:grid-cols-2">
            <VenueCard
              image="/venue/church.jpg"
              title="Ceremony"
              icon={<Church size={36} />}
              date="December 17, 2026"
              time="1:00 PM – 3:00 PM"
              location="Minor Basilica of the National Shrine of Our Lady of Mount Carmel"
              map="https://www.google.com/maps/place/Minor+Basilica+of+the+National+Shrine+of+Our+Lady+of+Mount+Carmel+(Diocese+of+Cubao)/@14.6143252,121.0307065,225m/data=!3m1!1e3!4m6!3m5!1s0x3397b6327d2e54c9:0x39a6d6a8b7eea521!8m2!3d14.6144003!4d121.030824!16s%2Fg%2F1tfrv0f7?entry=ttu&g_ep=EgoyMDI2MDcxOS4wIKXMDSoASAFQAw%3D%3D"
            />

            <VenueCard
              image="/venue/reception.jpg"
              title="Reception"
              icon={<PartyPopper size={36} />}
              date="December 17, 2026"
              time="3:30 PM – 7:00 PM"
              location="Oasis Manila"
              map="https://maps.google.com/?q=Oasis+Manila"
            />
          </div>
        </Container>
      </div>
    </section>
  );
}