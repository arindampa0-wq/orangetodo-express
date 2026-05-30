import { Github, Container, Box, Shield, Server, ScrollText, ArrowRight } from "lucide-react";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  icon: React.ReactNode;
  tone: "orange" | "red" | "pink" | "neutral";
};

const nodes: Node[] = [
  { id: "gh", label: "GitHub", x: 60, y: 200, icon: <Github className="h-7 w-7" />, tone: "neutral" },
  { id: "ec2", label: "EC2", x: 260, y: 200, icon: <Server className="h-7 w-7" />, tone: "orange" },
  { id: "docker", label: "Docker", x: 260, y: 60, icon: <Container className="h-7 w-7" />, tone: "neutral" },
  { id: "ecr", label: "ECR", x: 520, y: 60, icon: <Box className="h-7 w-7" />, tone: "orange" },
  { id: "iam", label: "IAM", x: 400, y: 200, icon: <Shield className="h-7 w-7" />, tone: "red" },
  { id: "ecs", label: "ECS", x: 640, y: 200, icon: <Box className="h-7 w-7" />, tone: "orange" },
  { id: "cw", label: "CloudWatch", x: 820, y: 200, icon: <ScrollText className="h-7 w-7" />, tone: "pink" },
];

const toneClass: Record<Node["tone"], string> = {
  orange: "bg-[var(--gradient-ember)] text-primary-foreground",
  red: "bg-destructive text-destructive-foreground",
  pink: "bg-pink-600 text-white",
  neutral: "bg-secondary text-foreground border border-border",
};

function NodeBox({ n }: { n: Node }) {
  return (
    <div
      className="absolute flex flex-col items-center gap-2"
      style={{ left: n.x, top: n.y, transform: "translate(-50%, -50%)" }}
    >
      <div className={`h-14 w-14 rounded-xl grid place-items-center shadow-lg ${toneClass[n.tone]}`}>
        {n.icon}
      </div>
      <span className="text-xs font-medium text-foreground/90">{n.label}</span>
    </div>
  );
}

function Edge({
  from,
  to,
  label,
  curve = 0,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  label?: string;
  curve?: number;
}) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2 + curve;
  const d = `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-muted-foreground"
        markerEnd="url(#arrow)"
      />
      {label && (
        <text
          x={mx}
          y={my - 6}
          textAnchor="middle"
          className="fill-muted-foreground text-[11px]"
        >
          {label}
        </text>
      )}
    </g>
  );
}

const pos = Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }]));

export function DeploymentDiagram() {
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-4 sm:p-6">
      <div className="inline-flex items-center gap-2 mb-4 rounded-md border border-border bg-secondary/60 px-3 py-1.5">
        <ArrowRight className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-medium">Node App Deployment on ECR / ECS</span>
      </div>

      <div className="relative w-full overflow-x-auto">
        <div className="relative" style={{ width: 900, height: 300 }}>
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 900 300"
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
                <path d="M 0 0 L 10 5 L 0 10 z" className="fill-muted-foreground" />
              </marker>
            </defs>

            <Edge from={pos.gh} to={pos.ec2} label="code pull" />
            <Edge from={{ x: pos.ec2.x, y: pos.ec2.y - 30 }} to={{ x: pos.docker.x, y: pos.docker.y + 30 }} label="image build" />
            <Edge from={{ x: pos.docker.x + 30, y: pos.docker.y }} to={{ x: pos.ecr.x - 30, y: pos.ecr.y }} label="image push" />
            <Edge from={pos.iam} to={pos.ec2} />
            <Edge from={{ x: pos.iam.x + 20, y: pos.iam.y - 20 }} to={{ x: pos.ecr.x, y: pos.ecr.y + 30 }} curve={-40} />
            <Edge from={{ x: pos.ecr.x, y: pos.ecr.y + 30 }} to={{ x: pos.ecs.x, y: pos.ecs.y - 30 }} label="image pull" />
            <Edge from={pos.ecs} to={pos.cw} label="logs" />
          </svg>

          {nodes.map((n) => (
            <NodeBox key={n.id} n={n} />
          ))}
        </div>
      </div>
    </div>
  );
}
