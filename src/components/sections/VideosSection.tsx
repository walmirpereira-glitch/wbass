import { motion } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";

const videos = [
  { id: "QZmcgy02MKk", title: "Video 1" },
  { id: "4ykOa9onhnw", title: "Video 2" },
  { id: "U6vWIAr4BZw", title: "Video 3" },
];

// Extend window to include YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const VideosSection = () => {
  const playersRef = useRef<{ [key: string]: any }>({});
  const currentlyPlayingRef = useRef<string | null>(null);

  const handlePlayerStateChange = useCallback((videoId: string, event: any) => {
    // YT.PlayerState.PLAYING === 1
    if (event.data === 1) {
      // Pause all other videos
      Object.entries(playersRef.current).forEach(([id, player]) => {
        if (id !== videoId && player && typeof player.pauseVideo === 'function') {
          player.pauseVideo();
        }
      });
      currentlyPlayingRef.current = videoId;
    }
  }, []);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayers = () => {
      videos.forEach((video) => {
        if (!playersRef.current[video.id]) {
          playersRef.current[video.id] = new window.YT.Player(`player-${video.id}`, {
            events: {
              onStateChange: (event: any) => handlePlayerStateChange(video.id, event),
            },
          });
        }
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayers();
    } else {
      window.onYouTubeIframeAPIReady = initPlayers;
    }

    return () => {
      // Cleanup
      Object.values(playersRef.current).forEach((player: any) => {
        if (player && typeof player.destroy === 'function') {
          player.destroy();
        }
      });
      playersRef.current = {};
    };
  }, [handlePlayerStateChange]);

  return (
    <section id="videos" className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Radial gradient overlay with brand green */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 0% 50%, hsl(130 60% 15% / 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 50%, hsl(130 60% 15% / 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 0%, hsl(130 60% 15% / 0.3) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 100%, hsl(130 60% 15% / 0.3) 0%, transparent 40%)
          `
        }}
      />

      <div className="container mx-auto px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-white mb-6 max-w-4xl mx-auto leading-relaxed">
            Vídeos gravados por parceiros clientes demonstrando o timbre reproduzido pela Wbass com diferentes baixos e heads.
          </h2>
          <a 
            href="https://www.instagram.com/tiagovieirabaixista/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg text-primary hover:text-primary/80 transition-colors font-bold"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @tiagovieirabaixista
          </a>
          <div className="w-20 h-1 bg-primary mx-auto mt-8 rounded-full" />
        </motion.div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Green glow effect */}
              <div 
                className="absolute -inset-3 rounded-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-300 blur-xl"
                style={{
                  background: "hsl(130 60% 35% / 0.3)"
                }}
              />
              
              {/* Video container */}
              <div 
                className="relative overflow-hidden bg-black border border-gray-800/50 group-hover:border-primary/30 transition-colors duration-300"
                style={{ 
                  borderRadius: "16px",
                  boxShadow: "0 0 40px -10px hsl(130 60% 35% / 0.3)"
                }}
              >
                <div className="aspect-[9/16]">
                  <iframe
                    id={`player-${video.id}`}
                    src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1&modestbranding=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    style={{ borderRadius: "16px" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
