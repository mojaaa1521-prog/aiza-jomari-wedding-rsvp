import Hero from "@/components/sections/Hero";
import Countdown from "@/components/sections/Countdown";
import WeddingDetails from "@/components/sections/WeddingDetails";
import RSVPForm from "@/components/sections/RSVPForm";
import ThemeToggle from "@/components/layout/ThemeToggle";
import MusicPlayer from "@/components/layout/MusicPlayer";
import OurJourney from "@/components/sections/OurJourney";

export default function Home() {
  return (
    <main>

      <Hero />

      <Countdown />

      <WeddingDetails />

      <OurJourney />

      <RSVPForm />

       <ThemeToggle />
      <MusicPlayer />

    </main>
  );
}