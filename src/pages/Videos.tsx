import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VideosSection } from "@/components/sections/VideosSection";

const Videos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <VideosSection />
      </main>
      <Footer />
    </div>
  );
};

export default Videos;
