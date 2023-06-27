# Chat-IP

2110471 computer network I final project

## Setup

Backend:

- Copy `.env.example` and rename to `.env`
- Start database by: `cd apps/server && docker-compose up -d`
  - Database can be accessed via `mongodb://localhost:27018/`
- `pnpm dev`

Frontend

- Copy `.env.example` and rename to `.env`
- Run backend
- `cd apps/web && pnpm dev`
