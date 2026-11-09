/** 끝없이 흘러가는 띠 (내용을 두 번 이어 붙여 이음새 없이 반복) */
export default function Marquee({ items, className, reverse }: { items: string[]; className?: string; reverse?: boolean }) {
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-8">{t}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-60">
            <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <div className="flex w-max animate-marquee" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {row}
        {row}
      </div>
      <span className="sr-only">{items.join(", ")}</span>
    </div>
  );
}
