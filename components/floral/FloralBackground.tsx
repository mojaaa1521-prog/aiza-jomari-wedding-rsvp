import Image from "next/image";

export default function FloralBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      <Image
        src="/floral/top-left.png"
        alt=""
        width={220}
        height={220}
        className="absolute left-0 top-0 animate-float opacity-80"
      />

      <Image
        src="/floral/top-right.png"
        alt=""
        width={220}
        height={220}
        className="absolute right-0 top-0 animate-float opacity-80"
      />

      <Image
        src="/floral/bottom-left.png"
        alt=""
        width={220}
        height={220}
        className="absolute bottom-0 left-0 animate-float opacity-80"
      />

      <Image
        src="/floral/bottom-right.png"
        alt=""
        width={220}
        height={220}
        className="absolute bottom-0 right-0 animate-float opacity-80"
      />

    </div>
  );
}