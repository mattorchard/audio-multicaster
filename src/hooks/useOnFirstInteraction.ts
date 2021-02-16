import { useEffect } from "preact/hooks";
import useLiveCallback from "./useLiveCallback";

const firstInteractionPromise: Promise<void> = new Promise((resolve) => {
  const onFirstInteraction = () => {
    window.removeEventListener("click", onFirstInteraction);
    resolve();
  };
  window.addEventListener("click", onFirstInteraction, { once: true });
});

const useOnFirstInteraction = (callback: () => void) => {
  const liveCallback = useLiveCallback(callback);
  useEffect(() => {
    firstInteractionPromise.then(liveCallback);
  }, [liveCallback]);
};

export default useOnFirstInteraction;
