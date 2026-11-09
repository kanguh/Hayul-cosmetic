import type { Product } from "@/lib/products";

type Props = { product: Product; className?: string; bg?: boolean; uid?: string };

/** 사진 대신 쓰는 패키지 일러스트 (제품마다 색과 용기 모양이 다름) */
export default function ProductVisual({ product, className, bg = true, uid = "" }: Props) {
  const { palette: c, shape } = product;
  const id = `${product.slug}${uid}`;
  const short = product.name.split(" ").slice(0, -1).join(" ") || product.name;

  return (
    <svg viewBox="0 0 400 500" className={className} role="img" aria-label={`${product.nameKo} 패키지`}>
      <defs>
        <radialGradient id={`bg-${id}`} cx="50%" cy="38%" r="75%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor={c.bg} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`body-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor={c.body} />
          <stop offset="0.55" stopColor={c.body} stopOpacity="0.92" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id={`liq-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.liquid} stopOpacity="0.75" />
          <stop offset="1" stopColor={c.liquid} />
        </linearGradient>
        <linearGradient id={`cap-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor={c.cap} />
          <stop offset="0.6" stopColor={c.cap} />
          <stop offset="1" stopColor="#000" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={`shine-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`clip-${id}`}>{bodyPath(shape)}</clipPath>
      </defs>

      {bg && (
        <>
          <rect width="400" height="500" fill={c.bg} />
          <rect width="400" height="500" fill={`url(#bg-${id})`} />
          <circle cx="200" cy="230" r="150" fill="#fff" opacity="0.18" />
        </>
      )}

      {/* 바닥 그림자 */}
      <ellipse cx="200" cy="442" rx={shape === "jar" ? 120 : 90} ry="14" fill="#000" opacity="0.13" />

      {/* 용기 몸통 */}
      <g>
        <g fill={`url(#body-${id})`}>{bodyPath(shape)}</g>
        {(shape === "dropper" || shape === "bottle") && (
          <rect x="120" y={shape === "dropper" ? 300 : 280} width="160" height="160" fill={`url(#liq-${id})`} clipPath={`url(#clip-${id})`} opacity="0.9" />
        )}
        {/* 유리 반사광 */}
        <rect x="150" y="150" width="22" height="300" fill={`url(#shine-${id})`} clipPath={`url(#clip-${id})`} opacity="0.55" />
      </g>

      {/* 뚜껑 / 펌프 / 스포이드 */}
      {capPath(shape, `url(#cap-${id})`)}

      {/* 라벨 */}
      <g textAnchor="middle" fill={c.label}>
        <text x="200" y={labelY(shape)} className="font-display" fontSize="26" letterSpacing="7" fontWeight="500">
          HAYUL
        </text>
        <line x1="182" x2="218" y1={labelY(shape) + 13} y2={labelY(shape) + 13} stroke={c.label} strokeWidth="1" opacity="0.7" />
        <text x="200" y={labelY(shape) + 34} className="font-display" fontSize="15" fontStyle="italic" opacity="0.9">
          {short}
        </text>
        <text x="200" y={labelY(shape) + 54} fontSize="8.5" letterSpacing="2.5" opacity="0.75" className="font-sans">
          {product.volume.toUpperCase()}
        </text>
      </g>
    </svg>
  );
}

function bodyPath(shape: Product["shape"]) {
  switch (shape) {
    case "dropper":
      return <rect x="138" y="215" width="124" height="225" rx="30" />;
    case "bottle":
      return <path d="M150 150 h100 a24 24 0 0 1 24 24 v242 a24 24 0 0 1 -24 24 h-100 a24 24 0 0 1 -24 -24 v-242 a24 24 0 0 1 24 -24z" />;
    case "jar":
      return <rect x="102" y="300" width="196" height="140" rx="30" />;
    case "tube":
      return <path d="M134 108 h132 l-14 300 q-52 16 -104 0z" />;
    case "pump":
      return <rect x="140" y="200" width="120" height="240" rx="26" />;
  }
}

function capPath(shape: Product["shape"], fill: string) {
  switch (shape) {
    case "dropper":
      return (
        <g fill={fill}>
          <rect x="172" y="190" width="56" height="34" rx="6" />
          <path d="M180 192 v-46 q0 -34 20 -34 q20 0 20 34 v46z" />
        </g>
      );
    case "bottle":
      return (
        <g fill={fill}>
          <rect x="166" y="96" width="68" height="60" rx="10" />
        </g>
      );
    case "jar":
      return (
        <g fill={fill}>
          <rect x="96" y="250" width="208" height="60" rx="14" />
          <rect x="96" y="294" width="208" height="8" fill="#000" opacity="0.08" />
        </g>
      );
    case "tube":
      return (
        <g fill={fill}>
          <rect x="128" y="88" width="144" height="26" rx="4" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={140 + i * 22} y="92" width="2" height="18" fill="#000" opacity="0.12" />
          ))}
          <rect x="164" y="404" width="72" height="40" rx="8" />
        </g>
      );
    case "pump":
      return (
        <g fill={fill}>
          <rect x="176" y="172" width="48" height="34" rx="5" />
          <rect x="190" y="132" width="20" height="44" />
          <path d="M168 118 h76 q14 0 14 12 v8 h-90z" />
        </g>
      );
  }
}

function labelY(shape: Product["shape"]) {
  return { dropper: 280, bottle: 210, jar: 352, tube: 200, pump: 268 }[shape];
}
