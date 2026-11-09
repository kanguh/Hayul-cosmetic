/** 원을 따라 글자가 천천히 도는 배지 */
export default function RotatingBadge({ text, size = 132, className }: { text: string; size?: number; className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`} style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-current font-display text-[10.5px] tracking-[0.32em] uppercase">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 24 24" className="absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2">
        <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" fill="currentColor" />
      </svg>
    </div>
  );
}
