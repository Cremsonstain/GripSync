import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Activity, Crosshair, Zap, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center space-y-8 pt-20">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Know Your <span className="text-primary animate-pulse">Grip</span>.<br />
          Own Your <span className="text-accent">Game</span>.
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl">
          Advanced biomechanical analysis of your grip and playstyle. Discover the optimal peripherals to unlock your true potential.
        </p>
        <Link href="/analyze">
          <Button size="lg" className="text-lg px-10 rounded-full">
            Start Analysis
          </Button>
        </Link>
        <div className="flex gap-8 text-sm text-slate-500 font-medium mt-12">
          <span>🎯 500+ Peripherals</span>
          <span>⚡ Real-time Tracking</span>
          <span>📊 Pro-level Metrics</span>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-surface/50 border-slate-800 hover:border-primary/50 transition-colors">
          <CardHeader>
            <Activity className="w-10 h-10 text-primary mb-4" />
            <CardTitle>Analyze</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400 text-sm">Computer vision powered hand-tracking captures your exact grip style and dimensions.</p>
          </CardContent>
        </Card>

        <Card className="bg-surface/50 border-slate-800 hover:border-accent/50 transition-colors">
          <CardHeader>
            <Crosshair className="w-10 h-10 text-accent mb-4" />
            <CardTitle>Visualize</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400 text-sm">See your biomechanics mapped out in 3D. Understand your contact points and strain areas.</p>
          </CardContent>
        </Card>

        <Card className="bg-surface/50 border-slate-800 hover:border-warning/50 transition-colors">
          <CardHeader>
            <Zap className="w-10 h-10 text-warning mb-4" />
            <CardTitle>Optimize</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400 text-sm">Get personalized gear recommendations mathematically matched to your physical profile.</p>
          </CardContent>
        </Card>

        <Card className="bg-surface/50 border-slate-800 hover:border-danger/50 transition-colors">
          <CardHeader>
            <Wallet className="w-10 h-10 text-danger mb-4" />
            <CardTitle>Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400 text-sm">Plan your dream setup with smart saving goals, priority ranking, and price tracking.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
