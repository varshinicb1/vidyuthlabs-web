import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Renders children only once the wrapper scrolls near the viewport, then keeps
 * them mounted. Keeps heavy WebGL canvases out of the initial paint so LCP and
 * Core Web Vitals stay fast — important for SEO.
 */
export function LazyMount({
  children,
  className,
  rootMargin = '300px',
  placeholder,
}: {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  placeholder?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {show ? children : placeholder}
    </div>
  );
}
