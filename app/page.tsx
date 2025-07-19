import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Next.js + Genesis DB Starter</h1>
          <p className="text-xl text-muted-foreground mb-8">
            A modern starter template with Next.js 15, shadcn/ui, and Genesis DB
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="https://www.genesisdb.io/documentation/js-ts" target="_blank" rel="noopener noreferrer">
                Genesis DB Docs
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer">
                shadcn/ui
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Genesis DB Ready</CardTitle>
              <CardDescription>
                Local database setup with Docker Compose
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Run <code className="bg-muted px-1 py-0.5 rounded">docker-compose up</code> to start Genesis DB locally.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modern UI Components</CardTitle>
              <CardDescription>
                Built with shadcn/ui and Tailwind CSS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Beautiful, accessible components that you can copy and customize.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Type-Safe</CardTitle>
              <CardDescription>
                Full TypeScript support out of the box
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Enjoy autocomplete and type checking throughout your application.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Start Genesis DB: <code className="bg-muted px-1 py-0.5 rounded">docker-compose up -d</code></li>
                <li>Install dependencies: <code className="bg-muted px-1 py-0.5 rounded">npm install</code></li>
                <li>Run development server: <code className="bg-muted px-1 py-0.5 rounded">npm run dev</code></li>
                <li>Open <a href="http://localhost:3000" className="text-primary hover:underline">http://localhost:3000</a></li>
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Genesis DB</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p>Genesis DB - The event sourcing database for developers who love event sourcing - written in Go.</p>
              <Button asChild>
                <Link href="/genesis-db-demo">
                  Play with Genesis DB
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
