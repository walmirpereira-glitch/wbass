import { useRef, useState } from "react";
import { Volume2, VolumeX, X, Play } from "lucide-react";
import reelAsset from "@/assets/reels-wbass.mp4.asset.json";

export const FloatingReel = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [minimized, setMinimized] = useState(false);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  const reopen = () => {
    setMinimized(false);
    setTimeout(() => videoRef.current?.play().catch(() => {}), 50);
  };

  if (minimized) {
    return (
      <button
        onClick={reopen}
        aria-label="Abrir vídeo"
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl ring-2 ring-primary/40 transition hover:scale-105"
      >
        <Play className="h-6 w-6 fill-current" />
      </button>
    );
  }

  return (
    <div
      className="fixed z-50 overflow-hidden rounded-2xl border border-primary/30 bg-black shadow-2xl ring-1 ring-primary/20
        bottom-4 right-4
        w-[42vw] max-w-[240px] sm:max-w-[260px] md:max-w-[280px]
        aspect-[9/16]"
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 30px hsl(var(--primary) / 0.25)" }}
    >
      <video
        ref={videoRef}
        src={reelAsset.url}
        autoPlay
        loop
        muted={muted}
        playsInline
        className="h-full w-full object-cover"
      />

      <button
        onClick={() => setMinimized(true)}
        aria-label="Minimizar"
        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
      >
        <X className="h-4 w-4" />
      </button>

      <button
        onClick={toggleMute}
        aria-label={muted ? "Ativar som" : "Silenciar"}
        className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </div>
  );
};
