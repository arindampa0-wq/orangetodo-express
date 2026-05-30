# Deploying Ember Todo to AWS (ECR + ECS)

A minimal, no-database Node.js todo app. The container is built with a
multi-stage Dockerfile and runs as a non-root user on port `3000`.

## 0. Prerequisites
- AWS CLI configured (`aws configure`)
- Docker installed
- An ECR repo and an ECS cluster (Fargate recommended)

```bash
export AWS_REGION=us-east-1
export ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
export REPO=ember-todo
```

## 1. Build the image locally
```bash
docker build -t $REPO:latest .
docker run --rm -p 3000:3000 $REPO:latest
# open http://localhost:3000
```

## 2. Create the ECR repository (once)
```bash
aws ecr create-repository --repository-name $REPO --region $AWS_REGION
```

## 3. Push to ECR
```bash
aws ecr get-login-password --region $AWS_REGION \
  | docker login --username AWS --password-stdin \
    $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

docker tag $REPO:latest \
  $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO:latest

docker push \
  $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO:latest
```

## 4. ECS task definition (Fargate)
Key bits:
- **Image**: `$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/ember-todo:latest`
- **Port mapping**: `3000/tcp`
- **Execution role**: `ecsTaskExecutionRole` (with `AmazonECSTaskExecutionRolePolicy`)
- **Log driver**: `awslogs` → CloudWatch group `/ecs/ember-todo`

## 5. Run the service
Create an ECS service from the task definition, place it behind an ALB
targeting port `3000`, and you're live.

## Flow recap
```
GitHub  →  EC2 (builder)  →  Docker build  →  ECR  →  ECS  →  CloudWatch logs
                                ↑ IAM role grants push/pull
```
