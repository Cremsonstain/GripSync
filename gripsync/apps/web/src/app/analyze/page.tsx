'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { SetupViewerPanel } from '@/components/setup/SetupViewerPanel';
import { Camera, Monitor, Play, Square, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AnalyzePage() {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else router.push('/dashboard/latest');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analysis Session</h1>
        <p className="text-slate-400">Capture your grip and gameplay style.</p>
      </div>

      {/* Wizard Progress */}
      <div className="flex justify-between items-center mb-8 relative">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-800 -z-10" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 bg-background px-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2
                ${step >= i ? 'bg-primary border-primary text-white' : 'bg-surface border-slate-700 text-slate-500'}`}
            >
              {step > i ? <CheckCircle2 className="w-6 h-6" /> : i}
            </div>
            <span className="text-xs font-medium text-slate-400 hidden sm:block">
              {i === 1 ? 'Setup' : i === 2 ? 'Hand Cam' : i === 3 ? 'Gameplay' : 'Results'}
            </span>
          </div>
        ))}
      </div>

      <Card className="overflow-hidden border-slate-700 shadow-xl shadow-primary/5">
        <CardContent className="p-0">
          <div className="aspect-video bg-black relative flex items-center justify-center">
            {/* Camera feed placeholder */}
            <div className="absolute inset-0 border-2 border-dashed border-slate-800 m-8 rounded-xl flex flex-col items-center justify-center text-slate-600">
              {step === 1 && <Monitor className="w-16 h-16 mb-4" />}
              {step === 2 && <Camera className="w-16 h-16 mb-4" />}
              {step === 3 && <Play className="w-16 h-16 mb-4" />}
              <p className="font-medium text-lg">
                {step === 1
                  ? 'Connect desktop client...'
                  : step === 2
                    ? 'Position hand in frame'
                    : step === 3
                      ? 'Play your favorite game'
                      : 'Analyzing data...'}
              </p>
            </div>

            {/* Recording HUD */}
            {isRecording && (
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-danger/50 backdrop-blur-md">
                <div className="w-3 h-3 bg-danger rounded-full animate-pulse" />
                <span className="font-mono text-danger font-medium">00:00:15</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Setup preview</h2>
          <p className="text-sm text-slate-400">
            Inspect the hardware configuration while your session is prepared.
          </p>
        </div>
        <SetupViewerPanel />
      </section>

      <div className="flex justify-between items-center bg-surface p-6 rounded-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-accent">
            <div className="w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            Desktop Connected
          </div>
        </div>

        <div className="flex gap-4">
          {(step === 2 || step === 3) && (
            <Button
              variant={isRecording ? 'danger' : 'primary'}
              onClick={() => setIsRecording(!isRecording)}
              className="gap-2"
            >
              {isRecording ? (
                <>
                  <Square className="w-4 h-4 fill-current" /> Stop Recording
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" /> Start Recording
                </>
              )}
            </Button>
          )}
          <Button variant="secondary" onClick={handleNext} disabled={isRecording}>
            {step === 4 ? 'View Dashboard' : 'Next Step'}
          </Button>
        </div>
      </div>
    </div>
  );
}
