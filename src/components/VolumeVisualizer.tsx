import { FunctionComponent } from "preact";
import useRafLoop from "../hooks/useRafLoop";
import useCanvasContext from "../hooks/useCanvasContext";
import { useMemo } from "preact/hooks";
import { createGetVolume } from "../helpers/audioHelpers";

const VolumeVisualizer: FunctionComponent<{
  stream: MediaStream;
  width?: number;
  height?: number;
  barWidth?: number;
  barGap?: number;
  fillStyle?: string;
}> = ({
  stream,
  width = 160,
  height = 90,
  barWidth = 6,
  barGap = 2,
  fillStyle = "#ffffff80",
}) => {
  const { contextRef, elementRef } = useCanvasContext();
  const getVolume = useMemo(() => createGetVolume(stream), [stream]);

  useRafLoop((frameIndex) => {
    const context = contextRef.current;
    if (!context) return;
    context.fillStyle = fillStyle;
    const volume = getVolume();
    const imageData = context.getImageData(0, 0, width, height);
    context.clearRect(0, 0, width, height);
    context.putImageData(imageData, -barWidth - barGap, 0);
    context.fillRect(width, height, -barWidth, Math.floor(-height * volume));
  });

  return (
    <canvas
      className="volume-visualizer"
      ref={elementRef}
      width={width}
      height={height}
    />
  );
};

export default VolumeVisualizer;
