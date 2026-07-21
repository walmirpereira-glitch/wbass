import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, X, Play } from "lucide-react";
import reelAsset from "@/assets/reels-wbass.mp4.asset.json";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const FloatingReel = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement | HTMLButtonElement>(null);
  const [muted, setMuted] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  const draggingRef = useRef(false);
  const didDragRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const offsetRef = useRef<{ x: number; y: number } | null>(null);
  const positionRef = useRef(position);
  positionRef.current = position;

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

  const handleReopenClick = () => {
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    reopen();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (!minimized && target.closest("button")) return;

    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    draggingRef.current = true;
    didDragRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    el.setPointerCapture(e.pointerId);

    if (positionRef.current === null) {
      setPosition({ x: rect.left, y: rect.top });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const start = dragStartRef.current;
    if (start) {
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (Math.sqrt(dx * dx + dy * dy) > 4) {
        didDragRef.current = true;
      }
    }
    const el = containerRef.current;
    if (!el || offsetRef.current === null) return;
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const newX = clamp(e.clientX - offsetRef.current.x, 0, Math.max(0, vw - rect.width));
    const newY = clamp(e.clientY - offsetRef.current.y, 0, Math.max(0, vh - rect.height));
    setPosition({ x: newX, y: newY });
    e.preventDefault();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (el) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // capture already released
      }
    }
    draggingRef.current = false;
    dragStartRef.current = null;
    offsetRef.current = null;
    // didDragRef stays true briefly so the click handler can detect it
  };

  // Keep the player within the viewport after a resize or when minimizing/expanding
  useEffect(() => {
    const handleResize = () => {
      if (positionRef.current === null || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setPosition({
        x: clamp(positionRef.current.x, 0, Math.max(0, vw - rect.width)),
        y: clamp(positionRef.current.y, 0, Math.max(0, vh - rect.height)),
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (positionRef.current === null || !containerRef.current) return;
    const raf = requestAnimationFrame(() => {
      const rect = containerRef.current!.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setPosition((prev) => {
        if (!prev) return prev;
        const newX = clamp(prev.x, 0, Math.max(0, vw - rect.width));
        const newY = clamp(prev.y, 0, Math.max(0, vh - rect.height));
        return newX === prev.x && newY === prev.y ? prev : { x: newX, y: newY };
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [minimized]);

  if (minimized) {
    return (
      <button
        ref={containerRef as React.RefObject<HTMLButtonElement>}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handleReopenClick}
        aria-label="Abrir vídeo"
        className={`fixed z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl ring-2 ring-primary/40 transition hover:scale-105 cursor-move touch-none ${
          position ? "" : "bottom-4 right-4"
        }`}
        style={{
          left: position?.x,
          top: position?.y,
          right: position ? "auto" : undefined,
          bottom: position ? "auto" : undefined,
        }}
      >
        <Play className="h-6 w-6 fill-current" />
      </button>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`fixed z-50 overflow-hidden rounded-2xl border border-primary/30 bg-black shadow-2xl ring-1 ring-primary/20 cursor-move touch-none
        w-[42vw] max-w-[240px] sm:max-w-[260px] md:max-w-[280px]
        aspect-[9/16]
        ${position ? "" : "bottom-4 right-4"}`}
      style={{
        boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 30px hsl(var(--primary) / 0.25)",
        left: position?.x,
        top: position?.y,
        right: position ? "auto" : undefined,
        bottom: position ? "auto" : undefined,
      }}
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
        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80 cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>

      <button
        onClick={toggleMute}
        aria-label={muted ? "Ativar som" : "Silenciar"}
        className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105 cursor-pointer"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </div>
  );
};
