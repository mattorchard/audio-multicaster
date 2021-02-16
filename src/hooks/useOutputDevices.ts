import { useState, useCallback, useEffect } from "preact/hooks";
import useOnFirstInteraction from "./useOnFirstInteraction";
import DeviceDescriptor from "../types/DeviceDescriptor";

const isSyntheticDevice = ({ deviceId }: MediaDeviceInfo) =>
  deviceId === "default" || deviceId === "communications";

const useAudioOutputDevices = (): [DeviceDescriptor[], () => void] => {
  const [devices, setDevices] = useState<DeviceDescriptor[]>([]);

  const refreshDevices = useCallback(async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioOutputDevices = devices.filter(
      (device) => device.kind === "audiooutput"
    );
    const defaultOutputDevice = audioOutputDevices.find(
      (device) => device.deviceId === "default"
    );
    setDevices(
      audioOutputDevices
        .filter((device) => !isSyntheticDevice(device))
        .map(({ deviceId, groupId, label }) => ({
          deviceId,
          groupId,
          label,
          isDefault: groupId === defaultOutputDevice?.groupId,
        }))
    );
  }, []);

  useEffect(() => void refreshDevices(), []);
  useOnFirstInteraction(refreshDevices);

  return [devices, refreshDevices];
};

export default useAudioOutputDevices;
