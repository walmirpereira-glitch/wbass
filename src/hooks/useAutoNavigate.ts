import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const pageOrder = [
  "/",
  "/sobre",
  "/produtos",
  "/videos",
  "/garantia",
  "/dicas-de-uso",
  "/contato",
];

export const useAutoNavigate = (footerRef: React.RefObject<HTMLElement>) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFadingOut, setIsFadingOut] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const currentIndex = pageOrder.indexOf(location.pathname);
    const nextPage = currentIndex < pageOrder.length - 1 
      ? pageOrder[currentIndex + 1] 
      : null;

    if (!nextPage) return; // Last page, no auto-navigation

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting) {
          // Start 1 second timer when footer becomes visible
          timerRef.current = setTimeout(() => {
            setIsFadingOut(true);
            
            // Wait for fade animation, then navigate
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "instant" });
              navigate(nextPage);
              setIsFadingOut(false);
            }, 500); // Fade duration
          }, 500); // 500ms delay
        } else {
          // Cancel timer if user scrolls away
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
        }
      },
      { threshold: 0.5 } // Footer must be 50% visible
    );

    observer.observe(footerRef.current);

    return () => {
      observer.disconnect();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [footerRef, navigate, location.pathname]);

  return { isFadingOut };
};
