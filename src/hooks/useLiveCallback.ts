import { useCallback } from "preact/hooks";
import useAsRef from "./useAsRef";

const useLiveCallback = <T extends any[], R>(callback: (...args: T) => R) => {
  const callbackRef = useAsRef(callback);
  return useCallback(
    (...args: T) => callbackRef.current(...args),
    // Specified to avoid warning, but will never change
    [callbackRef]
  );
};

export default useLiveCallback;
