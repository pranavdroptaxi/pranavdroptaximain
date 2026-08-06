import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function AnimatedCounter({ value, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;

  useEffect(() => {
    if (!isInView || numericValue === 0) return;

    let start = 0;
    const end = numericValue;
    const totalSteps = 40;
    const stepTime = duration / totalSteps;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, numericValue, duration]);

  if (isNaN(numericValue) || numericValue === 0) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref} className="font-mono">
      {count.toLocaleString()}
      {suffix || value.replace(/[0-9,]/g, "")}
    </span>
  );
}
