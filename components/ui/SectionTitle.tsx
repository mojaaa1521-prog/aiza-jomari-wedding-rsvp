type SectionTitleProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-20 text-center">
      <p className="font-[family:var(--font-body)] uppercase tracking-[0.4em] text-sm text-[var(--color-burgundy)]">
        {eyebrow}
      </p>

      <h2 className="mt-4 font-[family:var(--font-heading)] text-5xl md:text-6xl text-[var(--color-burgundy)]">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-burgundy)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}