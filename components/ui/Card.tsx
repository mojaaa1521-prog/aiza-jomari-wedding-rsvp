import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-[32px]
        border border-[#E8DCCF]
        bg-gradient-to-b
        from-white
        to-[#FFF8F5]
        p-10
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}