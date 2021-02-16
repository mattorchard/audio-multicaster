import { useCallback, useRef } from "preact/hooks";
const useCanvasContext = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const elementRef = useCallback((element: HTMLCanvasElement | null) => {
    if (element === canvasRef.current) return;
    canvasRef.current = element;
    contextRef.current = element?.getContext("2d") || null;
  }, []);

  return {
    canvasRef,
    contextRef,
    elementRef,
  };
};

export default useCanvasContext;
