import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

type VenueCardProps = {
  image: string;
  title: string;
  icon: React.ReactNode;
  date: string;
  time: string;
  location: string;
  map: string;
};

export default function VenueCard({
  image,
  title,
  icon,
  date,
  time,
  location,
  map,
}: VenueCardProps) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
        dark:bg-[#2C1C23]
      "
    >
      {/* Hero Image */}
      <div className="group relative h-72 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-8 left-8 text-white">
          {icon}

          <h3 className="mt-4 font-[family:var(--font-heading)] text-5xl">
            {title}
          </h3>

          <div className="mt-4 flex items-center gap-2">
            <CalendarDays size={18} />
            <span>{date}</span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <Clock3 size={18} />
            <span>{time}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-start gap-3">
          <MapPin className="mt-1 text-[var(--color-burgundy)]" />

          <p className="text-[var(--foreground)]">
            {location}
          </p>
        </div>

        <a
          href={map}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-8
            inline-flex
            w-full
            items-center
            justify-center
            rounded-full
            bg-[var(--color-burgundy)]
            px-8
            py-4
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-[var(--color-burgundy-dark)]
            hover:shadow-xl
          "
        >
          Get Directions →
        </a>
      </div>
    </div>
  );
}