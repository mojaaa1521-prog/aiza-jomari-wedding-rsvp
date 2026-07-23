import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-full bg-[var(--color-burgundy)] px-8 py-4 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-[var(--color-burgundy-dark)] hover:-translate-y-1 ${className}`}
    >
      {children}
    </button>
  );
}