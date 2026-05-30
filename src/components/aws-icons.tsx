import type { SVGProps } from "react";

/**
 * Simplified AWS service marks — solid colored tile + white glyph,
 * mirroring AWS's "Resource icon" style. Self-contained SVGs, no deps.
 */

type TileProps = {
  size?: number;
  className?: string;
  bg: string; // tailwind bg class
  children: React.ReactNode;
};

function Tile({ size = 56, bg, className = "", children }: TileProps) {
  return (
    <div
      className={`rounded-xl grid place-items-center shadow-lg ${bg} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 64 64" width={size * 0.62} height={size * 0.62} fill="none">
        {children}
      </svg>
    </div>
  );
}

/* ---------- AWS EC2 ---------- */
export function EC2Icon(props: { size?: number; className?: string }) {
  return (
    <Tile {...props} bg="bg-[var(--gradient-ember)]">
      {/* chip outline */}
      <rect x="14" y="14" width="36" height="36" rx="3" stroke="white" strokeWidth="2.5" />
      <rect x="22" y="22" width="20" height="20" rx="1.5" fill="white" />
      {/* pins */}
      {[20, 32, 44].map((y) => (
        <g key={y}>
          <rect x="6" y={y - 2} width="8" height="4" fill="white" />
          <rect x="50" y={y - 2} width="8" height="4" fill="white" />
        </g>
      ))}
      {[20, 32, 44].map((x) => (
        <g key={x}>
          <rect x={x - 2} y="6" width="4" height="8" fill="white" />
          <rect x={x - 2} y="50" width="4" height="8" fill="white" />
        </g>
      ))}
    </Tile>
  );
}

/* ---------- AWS ECR (Elastic Container Registry) ---------- */
export function ECRIcon(props: { size?: number; className?: string }) {
  return (
    <Tile {...props} bg="bg-[var(--gradient-ember)]">
      {/* stacked container boxes */}
      <rect x="10" y="14" width="44" height="12" rx="2" stroke="white" strokeWidth="2.5" />
      <rect x="10" y="28" width="44" height="12" rx="2" stroke="white" strokeWidth="2.5" />
      <rect x="10" y="42" width="44" height="10" rx="2" fill="white" />
      <circle cx="17" cy="20" r="1.8" fill="white" />
      <circle cx="17" cy="34" r="1.8" fill="white" />
    </Tile>
  );
}

/* ---------- AWS ECS (Elastic Container Service) ---------- */
export function ECSIcon(props: { size?: number; className?: string }) {
  return (
    <Tile {...props} bg="bg-[var(--gradient-ember)]">
      {/* hexagonal container cluster */}
      <polygon
        points="32,8 54,20 54,44 32,56 10,44 10,20"
        stroke="white"
        strokeWidth="2.5"
      />
      <rect x="22" y="22" width="20" height="6" rx="1" fill="white" />
      <rect x="22" y="30" width="20" height="6" rx="1" fill="white" />
      <rect x="22" y="38" width="20" height="6" rx="1" fill="white" />
    </Tile>
  );
}

/* ---------- AWS IAM (Identity & Access Management) ---------- */
export function IAMIcon(props: { size?: number; className?: string }) {
  return (
    <Tile {...props} bg="bg-destructive">
      {/* shield + key */}
      <path
        d="M32 6 L54 14 V32 C54 44 44 54 32 58 C20 54 10 44 10 32 V14 Z"
        stroke="white"
        strokeWidth="2.5"
      />
      <circle cx="28" cy="28" r="5" stroke="white" strokeWidth="2.5" />
      <path
        d="M32 28 H44 M40 28 V34 M44 28 V32"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Tile>
  );
}

/* ---------- AWS CloudWatch ---------- */
export function CloudWatchIcon(props: { size?: number; className?: string }) {
  return (
    <Tile {...props} bg="bg-pink-600">
      {/* magnifier + chart bars */}
      <circle cx="28" cy="28" r="14" stroke="white" strokeWidth="2.5" />
      <line x1="38" y1="38" x2="50" y2="50" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="22" y="28" width="3" height="8" fill="white" />
      <rect x="27" y="22" width="3" height="14" fill="white" />
      <rect x="32" y="26" width="3" height="10" fill="white" />
    </Tile>
  );
}

/* ---------- Docker whale ---------- */
export function DockerIcon(props: { size?: number; className?: string }) {
  const { size = 56, className = "" } = props;
  return (
    <div
      className={`rounded-xl grid place-items-center bg-secondary border border-border ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 64 48" width={size * 0.72} height={size * 0.54} fill="none">
        {/* containers grid */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => {
            if (row === 2 && col > 2) return null;
            return (
              <rect
                key={`${row}-${col}`}
                x={6 + col * 7}
                y={8 + row * 7}
                width="6"
                height="6"
                rx="0.5"
                fill="#2496ED"
              />
            );
          })
        )}
        {/* whale body */}
        <path
          d="M2 30 H46 C50 30 54 26 54 22 C56 22 58 24 58 26 C60 24 62 26 62 28 C62 36 54 42 44 42 H14 C8 42 2 36 2 30 Z"
          fill="#2496ED"
        />
        {/* spout */}
        <path
          d="M50 18 C50 14 54 14 54 18"
          stroke="#2496ED"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* ---------- GitHub mark ---------- */
export function GitHubIcon({ size = 56 }: { size?: number }) {
  return (
    <div
      className="rounded-xl grid place-items-center bg-secondary border border-border"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.62}
        height={size * 0.62}
        fill="currentColor"
        className="text-foreground"
      >
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.18c-3.2.69-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.27 5.69.41.36.77 1.06.77 2.13v3.16c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
      </svg>
    </div>
  );
}

// helper: pass-through for SVGProps if needed elsewhere
export type _Svg = SVGProps<SVGSVGElement>;
