import { createFileRoute } from "@tanstack/react-router";
import { Flame, Github, Container } from "lucide-react";
import { TodoApp } from "@/components/TodoApp";
import { DeploymentDiagram } from "@/components/DeploymentDiagram";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ember Todo — Deploy to AWS ECS" },
      {
        name: "description",
        content:
          "A minimal Node.js todo app with a multi-stage Dockerfile, ready to deploy on AWS ECR + ECS.",
      },
      { property: "og:title", content: "Ember Todo — Deploy to AWS ECS" },
      {
        property: "og:description",
        content: "Black & orange todo app with a complete ECR/ECS deployment diagram.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            <span className="font-bold tracking-tight">Ember</span>
          </div>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#app" className="hover:text-foreground transition">App</a>
            <a href="#deploy" className="hover:text-foreground transition">Deploy</a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground mb-6">
          <Container className="h-3.5 w-3.5 text-primary" />
          Dockerized · Multi-stage build · ECS ready
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          A todo app that ships{" "}
          <span className="bg-clip-text text-transparent bg-[var(--gradient-ember)]">
            on fire.
          </span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Plain Node + React. No database. Just a clean UI, a battle-tested Dockerfile,
          and a one-command path to AWS ECR + ECS.
        </p>
      </section>

      <section id="app" className="max-w-6xl mx-auto px-6 py-10">
        <TodoApp />
      </section>

      <section id="deploy" className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Deployment flow</h2>
          <p className="text-sm text-muted-foreground mt-1">
            From a git push to a running container on ECS.
          </p>
        </div>
        <DeploymentDiagram />

        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          <Card title="1. Build the image">
            <code className="block text-xs bg-secondary/60 rounded-md p-3 text-foreground/90">
              docker build -t ember-todo .
            </code>
          </Card>
          <Card title="2. Tag & push to ECR">
            <code className="block text-xs bg-secondary/60 rounded-md p-3 text-foreground/90 whitespace-pre-wrap">
{`aws ecr get-login-password --region $REGION \\
  | docker login --username AWS --password-stdin \\
    $ACCOUNT.dkr.ecr.$REGION.amazonaws.com

docker tag ember-todo:latest \\
  $ACCOUNT.dkr.ecr.$REGION.amazonaws.com/ember-todo:latest

docker push \\
  $ACCOUNT.dkr.ecr.$REGION.amazonaws.com/ember-todo:latest`}
            </code>
          </Card>
          <Card title="3. Run on ECS Fargate">
            <p className="text-sm text-muted-foreground">
              Point your ECS task definition at the ECR image, expose port{" "}
              <span className="text-primary font-mono">3000</span>, attach an IAM
              execution role, and stream logs to CloudWatch.
            </p>
          </Card>
          <Card title="4. Health check">
            <code className="block text-xs bg-secondary/60 rounded-md p-3 text-foreground/90">
              GET /healthz → 200 OK
            </code>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border mt-10">
        <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-muted-foreground flex justify-between">
          <span>Built with Node + Docker.</span>
          <span>Ship it 🔥</span>
        </div>
      </footer>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-semibold mb-3 text-foreground">{title}</h3>
      {children}
    </div>
  );
}
