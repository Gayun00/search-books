import { useEffect, useRef, useState } from "react";

type IntersectionObserverOptions = IntersectionObserverInit & {
  freezeOnceVisible?: boolean;
};

type UseIntersectionObserverArgs = {
  onIntersect: () => void;
  options?: IntersectionObserverOptions;
};

const useIntersectionObserver = ({
  onIntersect,
  options = {},
}: UseIntersectionObserverArgs) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!targetRef.current) {
      return;
    }

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        onIntersect();
        if (options.freezeOnceVisible) {
          observer.current?.disconnect();
        }
      } else {
        setIntersecting(false);
      }
    }, options);

    observer.current.observe(targetRef.current);

    return () => {
      observer.current?.disconnect();
    };
  }, [targetRef, onIntersect, options]);

  return { targetRef, isIntersecting };
};

export default useIntersectionObserver;
