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
  const isFooterVisibleRef = useRef(false);

  const NAV_DELAY = 2000;

  // Reset cooldown quando a rota muda
  useEffect(() => {
    lastNavigationTime = Date.now();
  }, [location.pathname]);

  useEffect(() => {
    const currentIndex = pageOrder.indexOf(location.pathname);
    const nextPage = currentIndex < pageOrder.length - 1 
      ? pageOrder[currentIndex + 1] 
      : null;

    if (!footerRef.current || !nextPage) return;

    const startForwardTimer = () => {
      if (forwardTimerRef.current) clearTimeout(forwardTimerRef.current);
      if (!isFooterVisibleRef.current) return;

      const elapsed = Date.now() - lastNavigationTime;
      const cooldownRemaining = NAVIGATION_COOLDOWN - elapsed;
      const delay = cooldownRemaining > 0 ? NAV_DELAY + cooldownRemaining : NAV_DELAY;

      forwardTimerRef.current = setTimeout(() => {
        if (!isFooterVisibleRef.current) return;
        if (Date.now() - lastNavigationTime < NAVIGATION_COOLDOWN) return;
        lastNavigationTime = Date.now();
        navigate(nextPage);
        window.scrollTo(0, 0);
      }, delay);
    };

    const cancelForwardTimer = () => {
      if (forwardTimerRef.current) {
        clearTimeout(forwardTimerRef.current);
        forwardTimerRef.current = null;
      }
    };

    const handleInteraction = () => {
      if (!isFooterVisibleRef.current) return;
      // Reinicia o cronômetro a cada interação
      startForwardTimer();
    };

    const footerObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          isFooterVisibleRef.current = true;
          startForwardTimer();
        } else {
          isFooterVisibleRef.current = false;
          cancelForwardTimer();
        }
      },
      { threshold: 0.5 }
    );
    footerObserver.observe(footerRef.current);

    const interactionEvents: (keyof WindowEventMap)[] = [
      "mousedown",
      "keydown",
      "touchstart",
      "wheel",
    ];
    interactionEvents.forEach((evt) =>
      window.addEventListener(evt, handleInteraction, { passive: true })
    );

    return () => {
      footerObserver.disconnect();
      cancelForwardTimer();
      interactionEvents.forEach((evt) =>
        window.removeEventListener(evt, handleInteraction)
      );
    };
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
