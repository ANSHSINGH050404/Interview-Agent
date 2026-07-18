# Interview-Agent

AI **interview agent** monorepo (Turborepo) with a Next.js web app, backend service, and shared packages.

## Layout

```
Interview-Agent/
├── apps/
│   ├── web/          # Next.js frontend
│   └── backend/      # API / agent backend
├── packages/
│   ├── ui/
│   ├── eslint-config/
│   └── typescript-config/
├── turbo.json
└── package.json
```

## Getting started

```bash
git clone https://github.com/ANSHSINGH050404/Interview-Agent.git
cd Interview-Agent
bun install
bun run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Develop apps |
| `bun run build` | Build |
| `bun run lint` | Lint |
| `bun run check-types` | Typecheck |

## Author

[ANSHSINGH050404](https://github.com/ANSHSINGH050404)