import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimalPlaces?: number;
}

export function AnimatedNumber({
  value,
  duration = 1.5,
  suffix = "",
  prefix = "",
  decimalPlaces = 0,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const counterRef = useRef(0);

  useEffect(() => {
    const target = value;
    const increment = target / (duration * 60);

    const animate = () => {
      if (counterRef.current < target) {
        counterRef.current = Math.min(counterRef.current + increment, target);
      }

      if (ref.current) {
        ref.current.innerText = prefix + counterRef.current.toFixed(decimalPlaces) + suffix;
      }

      if (counterRef.current < target) {
        requestAnimationFrame(animate);
      }
    };

    counterRef.current = 0;
    animate();

    return () => {
      counterRef.current = 0;
    };
  }, [value, duration, suffix, prefix, decimalPlaces]);

  return <span ref={ref}>0{suffix}</span>;
}

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimalPlaces?: number;
  className?: string;
}

export function CountUp({
  end,
  duration = 1.5,
  suffix = "",
  prefix = "",
  decimalPlaces = 0,
  className = "",
}: CountUpProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <AnimatedNumber
        value={end}
        duration={duration}
        suffix={suffix}
        prefix={prefix}
        decimalPlaces={decimalPlaces}
      />
    </motion.span>
  );
}
