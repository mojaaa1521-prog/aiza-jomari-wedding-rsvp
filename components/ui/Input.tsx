import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-[#E8DCCF] bg-white px-5 py-4 text-[#3A2B2B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-burgundy)] ${className}`}
    />
  );
}