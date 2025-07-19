# Next.js + Genesis DB Starter Template

A modern full-stack starter template combining Next.js 15, shadcn/ui, and Genesis DB.

## Features

- ⚡️ **Next.js 15** with App Router and TypeScript
- 🎨 **shadcn/ui** - Beautiful, accessible UI components
- 🗄️ **Genesis DB** - Event sourcing database engine with Docker setup
- 🚀 **Vercel-ready** - Optimized for deployment
- 🔧 **Type-safe** - Full TypeScript support throughout

## Quick Start

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

3. **Start Genesis DB locally:**
   ```bash
   docker-compose up -d
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Genesis DB Configuration

The Docker Compose file includes Genesis DB with the following configuration:
- Auth token: `secret` (change in production!)
- Timezone: `Europe/Vienna`
- Prometheus metrics: enabled
- Port: 8080

## Project Structure

```
├── app/                 # Next.js App Router
├── components/          # React components
│   └── ui/             # shadcn/ui components
├── lib/                # Utilities, cqrs commands and event projections
├── docker-compose.yml   # Genesis DB setup
└── package.json
```

## Deployment

This template is optimized for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository on Vercel
3. Configure environment variables
4. Deploy!

For production, ensure you:
- Use a secure `GENESISDB_AUTH_TOKEN`

## Learn More

- [Genesis DB Documentation](https://www.genesisdb.io/documentation/js-ts)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## License

MIT
