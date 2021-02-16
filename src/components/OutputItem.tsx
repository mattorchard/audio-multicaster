import { FunctionComponent } from "preact/compat";
import DeviceDescriptor from "../types/DeviceDescriptor";
import { useEffect, useRef, useState } from "preact/hooks";

const OutputItem: FunctionComponent<{
  device: DeviceDescriptor;
  source: MediaStream | null;
}> = ({ device, source }) => {
  const [enabled, setEnabled] = useState(!device.isDefault);
  const [volume, setVolume] = useState(100);

  const sinkId = device.deviceId;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const onAudioElementChange = (audioElement: HTMLAudioElement | null) => {
    audioRef.current = audioElement;
    if (audioElement) {
      audioElement.srcObject = source;
      // @ts-ignore
      audioElement.setSinkId(sinkId).catch(console.error);
    }
  };
  useEffect(() => {
    // @ts-ignore
    audioRef.current?.setSinkId(sinkId).catch(console.error);
  }, [sinkId]);
  useEffect(() => {
    if (audioRef.current) audioRef.current.srcObject = source;
  }, [source]);

  return (
    <div className="burst output-item">
      <p style={{ gridArea: "label" }}>{device.label || "Unlabeled Device"}</p>
      <input
        type="checkbox"
        title="Enabled"
        style={{ gridArea: "mute" }}
        checked={enabled}
        onChange={(e) => setEnabled(e.currentTarget.checked)}
      />
      <input
        type="range"
        title="Volume"
        style={{ gridArea: "volume" }}
        min={0}
        max={100}
        step={1}
        value={volume}
        onChange={(e) => setVolume(parseInt(e.currentTarget.value))}
      />

      {source && (
        <audio
          ref={onAudioElementChange}
          hidden
          autoPlay
          volume={volume / 100}
          muted={!enabled}
        />
      )}
    </div>
  );
};

export default OutputItem;
