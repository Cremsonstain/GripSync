import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function VerdictCard() {
  return (
    <Card className="relative overflow-hidden border-2 border-primary/50 animate-glow">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-50"></div>
      <CardHeader className="text-center pb-2 relative z-10">
        <CardTitle className="text-sm font-mono text-primary uppercase tracking-widest">The Verdict</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8 relative z-10">
        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          S-Tier Match
        </div>
        <p className="font-mono text-lg text-slate-300 bg-black/40 px-6 py-2 rounded border border-slate-700/50 text-center">
          "Unparalleled synergy. Your tracking limits are unbound."
        </p>
        <div className="mt-6 flex gap-3">
          <Badge variant="accent" className="text-lg px-4 py-1">Aim: S</Badge>
          <Badge variant="primary" className="text-lg px-4 py-1">Comfort: A</Badge>
          <Badge variant="warning" className="text-lg px-4 py-1">Speed: S+</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
