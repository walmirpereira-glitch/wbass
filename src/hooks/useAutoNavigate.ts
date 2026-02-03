import { useEffect, useRef } from "react";
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

// Cooldown global para evitar navegação repetida
let lastNavigationTime = 0;
const NAVIGATION_COOLDOWN = 1500; // 1.5 segundos de cooldown

export const useAutoNavigate = (
  footerRef: React.RefObject<HTMLElement>,
  headerRef?: React.RefObject<HTMLElement>
) => {
  const navigate = useNavigate();
  const location = useLocation();
  const forwardTimerRef = useRef<NodeJS.Timeout | null>(null);
  const backwardTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isAtTopRef = useRef(false);

  // Reset cooldown quando a rota muda
  useEffect(() => {
    lastNavigationTime = Date.now();
  }, [location.pathname]);

  useEffect(() => {
    const currentIndex = pageOrder.indexOf(location.pathname);
    const nextPage = currentIndex < pageOrder.length - 1 
      ? pageOrder[currentIndex + 1] 
      : null;

    if (footerRef.current && nextPage) {
      const footerObserver = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          
          if (entry.isIntersecting) {
            // Verificar cooldown antes de iniciar timer
            if (Date.now() - lastNavigationTime < NAVIGATION_COOLDOWN) {
              return;
            }
            
            forwardTimerRef.current = setTimeout(() => {
              // Verificar cooldown novamente antes de navegar
              if (Date.now() - lastNavigationTime < NAVIGATION_COOLDOWN) {
                return;
              }
              lastNavigationTime = Date.now();
              navigate(nextPage);
              window.scrollTo(0, 0);
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

      const currentFooter = footerRef.current;
      return () => {
        footerObserver.disconnect();
        if (forwardTimerRef.current) clearTimeout(forwardTimerRef.current);
      };
    }
  }, [footerRef, navigate, location.pathname]);

  useEffect(() => {
    const currentIndex = pageOrder.indexOf(location.pathname);
    const prevPage = currentIndex > 0 
      ? pageOrder[currentIndex - 1] 
      : null;

    if (!prevPage) return;

    const handleScroll = () => {
      // Verificar cooldown antes de processar
      if (Date.now() - lastNavigationTime < NAVIGATION_COOLDOWN) {
        return;
      }

      const scrollY = window.scrollY;
      
      if (scrollY <= 5) {
        if (!isAtTopRef.current) {
          isAtTopRef.current = true;
          backwardTimerRef.current = setTimeout(() => {
            if (window.scrollY <= 5 && Date.now() - lastNavigationTime >= NAVIGATION_COOLDOWN) {
              lastNavigationTime = Date.now();
              navigate(prevPage);
              requestAnimationFrame(() => {
                window.scrollTo(0, document.body.scrollHeight);
              });
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
};
