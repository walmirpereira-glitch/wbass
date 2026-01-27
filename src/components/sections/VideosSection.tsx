import { motion } from "framer-motion";

const videos = [
  { id: "QZmcgy02MKk", title: "Video 1" },
  { id: "4ykOa9onhnw", title: "Video 2" },
  { id: "U6vWIAr4BZw", title: "Video 3" },
];

export const VideosSection = () => {
  return (
    <section id="videos" className="py-20 relative overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
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

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
            Sinta o Punch da Linha Easy
          </h2>
          <p className="text-lg text-gray-400">
            Performance real por quem entende de grave
          </p>
          <div className="divider-green mx-auto mt-6" />
        </motion.div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
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
                className="absolute -inset-2 rounded-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300 blur-xl"
                style={{
                  background: "hsl(130 60% 35% / 0.3)"
                }}
              />
              
              {/* Video container */}
              <div 
                className="relative overflow-hidden bg-black"
                style={{ 
                  borderRadius: "12px",
                  boxShadow: "0 0 30px -5px hsl(130 60% 35% / 0.25)"
                }}
              >
                <div className="aspect-[9/16]">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?modestbranding=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    style={{ borderRadius: "12px" }}
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
