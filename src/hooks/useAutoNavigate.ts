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

export const useAutoNavigate = (
  footerRef: React.RefObject<HTMLElement>,
  headerRef?: React.RefObject<HTMLElement>
) => {
  const navigate = useNavigate();
  const location = useLocation();
  const forwardTimerRef = useRef<NodeJS.Timeout | null>(null);
  const backwardTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isAtTopRef = useRef(false);

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
            forwardTimerRef.current = setTimeout(() => {
              // Navegação instantânea sem scroll
              navigate(nextPage);
              window.scrollTo(0, 0);
            }, 400);
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
      const scrollY = window.scrollY;
      
      if (scrollY <= 5) {
        if (!isAtTopRef.current) {
          isAtTopRef.current = true;
          backwardTimerRef.current = setTimeout(() => {
            if (window.scrollY <= 5) {
              navigate(prevPage);
              // Scroll para o final da página anterior
              requestAnimationFrame(() => {
                window.scrollTo(0, document.body.scrollHeight);
              });
            }
          }, 400);
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
