/**
 * Official AWS service icons + Docker / GitHub marks,
 * served from icepanel's CDN (community mirror of the
 * official AWS Architecture Icon pack).
 */

const ICON: Record<string, string> = {
  ec2: "https://icon.icepanel.io/AWS/svg/Compute/EC2.svg",
  ecr: "https://icon.icepanel.io/AWS/svg/Containers/Elastic-Container-Registry.svg",
  ecs: "https://icon.icepanel.io/AWS/svg/Containers/Elastic-Container-Service.svg",
  iam: "https://icon.icepanel.io/AWS/svg/Security-Identity-Compliance/Identity-and-Access-Management.svg",
  cloudwatch:
    "https://icon.icepanel.io/AWS/svg/Management-Governance/CloudWatch.svg",
  docker: "https://icon.icepanel.io/Technology/svg/Docker.svg",
  github: "https://icon.icepanel.io/Technology/svg/GitHub.svg",
};

function Tile({
  src,
  alt,
  size = 64,
  invert = false,
}: {
  src: string;
  alt: string;
  size?: number;
  invert?: boolean;
}) {
  return (
    <div
      className="rounded-2xl grid place-items-center bg-card border border-border shadow-glow backdrop-blur-sm"
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt={alt}
        width={size * 0.62}
        height={size * 0.62}
        className={invert ? "invert" : ""}
        loading="lazy"
      />
    </div>
  );
}

export const EC2Icon = (p: { size?: number }) => (
  <Tile src={ICON.ec2} alt="AWS EC2" {...p} />
);
export const ECRIcon = (p: { size?: number }) => (
  <Tile src={ICON.ecr} alt="AWS ECR" {...p} />
);
export const ECSIcon = (p: { size?: number }) => (
  <Tile src={ICON.ecs} alt="AWS ECS" {...p} />
);
export const IAMIcon = (p: { size?: number }) => (
  <Tile src={ICON.iam} alt="AWS IAM" {...p} />
);
export const CloudWatchIcon = (p: { size?: number }) => (
  <Tile src={ICON.cloudwatch} alt="AWS CloudWatch" {...p} />
);
export const DockerIcon = (p: { size?: number }) => (
  <Tile src={ICON.docker} alt="Docker" {...p} />
);
export const GitHubIcon = (p: { size?: number }) => (
  <Tile src={ICON.github} alt="GitHub" {...p} invert />
);
