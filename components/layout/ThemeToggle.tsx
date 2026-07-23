"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        fixed
        bottom-24
        right-6
        z-50
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-white/80
        backdrop-blur-md
        shadow-xl
        transition-all
        duration-300
        hover:scale-110
        dark:bg-[#2C1C23]/80
      "
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="text-[#F7E7CE]" size={24} />
      ) : (
        <Moon className="text-[#8A2846]" size={24} />
      )}
    </button>
  );
}