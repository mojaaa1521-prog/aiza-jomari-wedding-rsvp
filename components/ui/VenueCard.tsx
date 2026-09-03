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
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[30px]
        border
        border-[#D8B86A]/60
        bg-[#FFFDF9]
        shadow-[0_15px_45px_rgba(58,43,43,0.18)]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-[0_20px_55px_rgba(58,43,43,0.25)]
      "
    >

      {/* VENUE PHOTO */}
      <div className="relative h-[220px] shrink-0 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="
            object-cover
            object-center
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>

      {/* CARD CONTENT */}
      <div className="flex flex-1 flex-col p-7">

        {/* TITLE */}
        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#F7E7CE]
              text-[#8A2846]
              transition-transform
              duration-300
              group-hover:scale-105
            "
          >
            {icon}
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#C8A04A]">
              Our Wedding
            </p>

            <h3
              className="
                mt-1
                font-[family:var(--font-heading)]
                text-4xl
                leading-none
                text-[#3A2B2B]
              "
            >
              {title}
            </h3>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="my-6 h-px bg-[#E8DCCF]" />

        {/* DATE & TIME */}
        <div className="grid min-h-[64px] gap-4 sm:grid-cols-2">

          {/* DATE */}
          <div className="flex items-center gap-3">

            <CalendarDays
              size={19}
              className="shrink-0 text-[#C8A04A]"
            />

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#A58B72]">
                Date
              </p>

              <p className="mt-1 text-sm text-[#3A2B2B]">
                {date}
              </p>
            </div>

          </div>

          {/* TIME */}
          <div className="flex items-center gap-3">

            <Clock3
              size={19}
              className="shrink-0 text-[#C8A04A]"
            />

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#A58B72]">
                Time
              </p>

              <p className="mt-1 text-sm text-[#3A2B2B]">
                {time}
              </p>
            </div>

          </div>

        </div>

        {/* LOCATION */}
        <div className="mt-6 flex min-h-[72px] items-start gap-3">

          <MapPin
            size={21}
            className="mt-1 shrink-0 text-[#8A2846]"
          />

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#A58B72]">
              Location
            </p>

            <p className="mt-1 leading-relaxed text-[#3A2B2B]">
              {location}
            </p>
          </div>

        </div>

        {/* BUTTON */}
        <div className="mt-auto pt-7">

          <a
            href={map}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              w-full
              items-center
              justify-center
              rounded-full
              border
              border-[#C8A04A]
              bg-[#8A2846]
              px-6
              py-3.5
              font-semibold
              text-white
              shadow-md
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#6D1E39]
              hover:shadow-lg
            "
          >
            Get Directions
            <span className="ml-2">
              →
            </span>
          </a>

        </div>

      </div>
    </div>
  );
}