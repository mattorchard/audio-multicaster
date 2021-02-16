import { useEffect, useRef } from "preact/hooks";
import useLiveCallback from "./useLiveCallback";

const useRafLoop = (callback: (frameIndex: number) => void) => {
  const liveCallback = useLiveCallback(callback);
  const frameIndexRef = useRef(0);
  useEffect(() => {
    let cancelled = false;

    const rafCallback = () => {
      if (cancelled) return;
      frameIndexRef.current = (frameIndexRef.current + 1) % 60;
      requestAnimationFrame(rafCallback);
      liveCallback(frameIndexRef.current);
    };
    requestAnimationFrame(rafCallback);

    return () => {
      cancelled = true;
    };
  }, [liveCallback]);
};

export default useRafLoop;
