import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const CHARSET = "01!@#$%^&*()_+{}[]|/\\?><~ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface CryptographicTextProps {
  text: string;
  className?: string;
  speed?: number; // ms per frame
  delay?: number; // ms before start
}

export function CryptographicText({ text, className = "", speed = 40, delay = 0 }: CryptographicTextProps) {
  const [displayText, setDisplayText] = useState(text.replace(/./g, ' '));
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isInView || hasRun.current) return;
    
    let timeout: ReturnType<typeof setInterval>;
    hasRun.current = true;

    // Start delay
    const startTimeout = setTimeout(() => {
      let iteration = 0;
      const maxIterations = text.length;

      const interval = setInterval(() => {
        setDisplayText(() => 
          text.split('')
            .map((_letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              // Skip spaces for glitch
              if (text[index] === ' ') return ' ';
              return CHARSET[Math.floor(Math.random() * CHARSET.length)];
            })
            .join('')
        );

        // increase iteration slightly per frame so it takes a bit of time
        iteration += 1 / 3;

        // Ensure we explicitly stop at the end to prevent memory overflow
        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text); // Final clamp
        }
      }, speed);

      // Save for cleanup
      timeout = interval;
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timeout) clearInterval(timeout);
    };
  }, [isInView, text, speed, delay]);

  return <span ref={ref} className={className}>{displayText}</span>;
}
