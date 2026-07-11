"use client";

import { useState, useEffect, RefObject } from "react";

export function useCountUp(
  target: number,
  ref: RefObject<HTMLElement | null>,
  duration = 1500
) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = target;
    if (start === end) return;

    const stepTime = 16; // Roughly 60fps
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;
    
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentVal = Math.floor(increment * currentStep);
      if (currentVal >= end || currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(currentVal);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return count;
}
