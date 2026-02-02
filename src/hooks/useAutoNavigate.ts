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

export const useAutoNavigate = (
  footerRef: React.RefObject<HTMLElement>,
  headerRef?: React.RefObject<HTMLElement>
) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFadingOut, setIsFadingOut] = useState(false);
  const forwardTimerRef = useRef<NodeJS.Timeout | null>(null);
  const backwardTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isAtTopRef = useRef(false);

  useEffect(() => {
    const currentIndex = pageOrder.indexOf(location.pathname);
    const nextPage = currentIndex < pageOrder.length - 1 
      ? pageOrder[currentIndex + 1] 
      : null;
    const prevPage = currentIndex > 0 
      ? pageOrder[currentIndex - 1] 
      : null;

    // Forward navigation (footer)
    if (footerRef.current && nextPage) {
      const footerObserver = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          
          if (entry.isIntersecting) {
            forwardTimerRef.current = setTimeout(() => {
              setIsFadingOut(true);
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "instant" });
                navigate(nextPage);
                setIsFadingOut(false);
              }, 500);
            }, 500);
          } else {
            if (forwardTimerRef.current) {
              clearTimeout(forwardTimerRef.current);
              forwardTimerRef.current = null;
            }
          }
        },
        { threshold: 0.5 }
      );
      footerObserver.observe(footerRef.current);

      // Cleanup for footer observer
      const currentFooter = footerRef.current;
      return () => {
        footerObserver.disconnect();
        if (forwardTimerRef.current) clearTimeout(forwardTimerRef.current);
      };
    }
  }, [footerRef, navigate, location.pathname]);

  // Backward navigation (scroll to top)
  useEffect(() => {
    const currentIndex = pageOrder.indexOf(location.pathname);
    const prevPage = currentIndex > 0 
      ? pageOrder[currentIndex - 1] 
      : null;

    if (!prevPage) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Check if at top (with small threshold)
      if (scrollY <= 5) {
        if (!isAtTopRef.current) {
          isAtTopRef.current = true;
          backwardTimerRef.current = setTimeout(() => {
            if (window.scrollY <= 5) {
              setIsFadingOut(true);
              setTimeout(() => {
                navigate(prevPage);
                // Scroll to bottom of previous page
                setTimeout(() => {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
                  setIsFadingOut(false);
                }, 50);
              }, 500);
            }
          }, 500);
        }
      } else {
        isAtTopRef.current = false;
        if (backwardTimerRef.current) {
          clearTimeout(backwardTimerRef.current);
          backwardTimerRef.current = null;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (backwardTimerRef.current) clearTimeout(backwardTimerRef.current);
    };
  }, [navigate, location.pathname]);

  return { isFadingOut };
};
