import { useRef, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { useElectionStore } from '../store/useElectionStore';

/**
 * useTimelineLogic Hook
 * Role: Encapsulates the intersection observer logic for marking timeline points as read,
 * as well as the Framer Motion scroll calculations (opacity and scale) for elements entering the viewport.
 */
export const useTimelineLogic = (index) => {
  const { reducedMotion, markTimelinePoint } = useElectionStore();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && markTimelinePoint) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          markTimelinePoint(index);
        }
      }, { threshold: 0.5 });
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [index, markTimelinePoint]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.3 1"]
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [0.6, 1]);

  return { ref, scaleProgress, opacityProgress };
};
