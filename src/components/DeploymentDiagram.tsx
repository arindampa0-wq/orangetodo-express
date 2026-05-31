import { ArrowRight } from "lucide-react";
import {
  ECRIcon,
  ECSIcon,
  IAMIcon,
  CloudWatchIcon,
  DockerIcon,
  GitHubIcon,
} from "./aws-icons";

type NodeDef = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  delay: number;
  glow?: boolean;
  render: () => React.ReactNode;
};

// Clean left-to-right pipeline (top row) with IAM as a side service (bottom).
// Canvas is 960 x 340.
const TOP_Y = 110;
const BOT_Y = 270;

const nodes: NodeDef[] = [
  { id: "gh",     label: "GitHub",     sub: "source",      x: 80,  y: TOP_Y, delay: 0.0, render: () => <GitHubIcon /> },
  { id: "docker", label: "Docker",     sub: "build image", x: 260, y: TOP_Y, delay: 0.3, render: () => <DockerIcon /> },
  { id: "ecr",    label: "Amazon ECR", sub: "registry",    x: 460, y: TOP_Y, delay: 0.6, glow: true, render: () => <ECRIcon /> },
  { id: "ecs",    label: "Amazon ECS", sub: "Fargate",     x: 680, y: TOP_Y, delay: 0.9, glow: true, render: () => <ECSIcon /> },
  { id: "cw",     label: "CloudWatch", sub: "logs",        x: 880, y: TOP_Y, delay: 1.2, render: () => <CloudWatchIcon /> },
  { id: "iam",    label: "IAM",        sub: "permissions", x: 570, y: BOT_Y, delay: 1.5, render: () => <IAMIcon /> },
];

const pos = Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }]));

const NODE_R = 44; // half tile + label space

function Edge({
  from,
  to,
  label,
  curve = 0,
  dashed = false,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  label?: string;
  curve?: number;
  dashed?: boolean;
}) {
  // shorten endpoints so arrows don't overlap tiles
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const fx = from.x + ux * NODE_R;
  const fy = from.y + uy * NODE_R;
  const tx = to.x - ux * NODE_R;
  const ty = to.y - uy * NODE_R;

  const mx = (fx + tx) / 2;
  const my = (fy + ty) / 2 + curve;
  const d = `M ${fx} ${fy} Q ${mx} ${my} ${tx} ${ty}`;

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="oklch(0.72 0.19 45 / 0.22)"
        strokeWidth="1.5"
        strokeDasharray={dashed ? "4 4" : undefined}
      />
      <path
        d={d}
        fill="none"
        stroke="oklch(0.78 0.19 50)"
        strokeWidth="1.75"
        className="animate-data-flow"
        markerEnd="url(#arrow)"
      />
      {label && (
        <text
          x={mx}
          y={my - 8}
          textAnchor="middle"
          className="fill-muted-foreground text-[11px] font-medium"
          style={{ paintOrder: "stroke", stroke: "oklch(0.18 0.02 40)", strokeWidth: 3 }}
        >
          {label}
        </text>
      )}
    </g>
  );
}

export function DeploymentDiagram() {
  return (
    <div className="relative w-full rounded-2xl border border-border bg-card p-4 sm:p-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="relative flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/60 px-3 py-1.5">
          <ArrowRight className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium">CI/CD · ECR → ECS Fargate</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-4 rounded-full bg-primary" /> image flow
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-4 rounded-full bg-muted-foreground/40" /> auth
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto">
        <div className="relative mx-auto" style={{ width: 960, height: 340 }}>
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 960 340"
          >
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="oklch(0.78 0.19 50)" />
              </marker>
            </defs>

            {/* Top pipeline */}
            <Edge from={pos.gh}     to={pos.docker} label="git pull" />
            <Edge from={pos.docker} to={pos.ecr}    label="docker push" />
            <Edge from={pos.ecr}    to={pos.ecs}    label="image pull" />
            <Edge from={pos.ecs}    to={pos.cw}     label="logs" />

            {/* IAM → ECR / ECS (dashed = auth) */}
            <Edge from={pos.iam} to={pos.ecr} curve={-30} dashed />
            <Edge from={pos.iam} to={pos.ecs} curve={-30} dashed />
          </svg>

          {nodes.map((n) => (
            <div
              key={n.id}
              className="absolute flex flex-col items-center gap-2"
              style={{ left: n.x, top: n.y, transform: "translate(-50%, -50%)" }}
            >
              <div
                className={`animate-float ${n.glow ? "rounded-2xl animate-pulse-glow" : ""}`}
                style={{ animationDelay: `${n.delay}s` }}
              >
                {n.render()}
              </div>
              <div className="text-center leading-tight">
                <div className="text-xs font-semibold text-foreground/90">{n.label}</div>
                {n.sub && (
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {n.sub}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
