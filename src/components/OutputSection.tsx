import { FunctionComponent, Fragment } from "preact/compat";
import useAudioOutputDevices from "../hooks/useOutputDevices";
import OutputItem from "./OutputItem";

const OutputSection: FunctionComponent<{ source: MediaStream | null }> = ({
  source,
}) => {
  const [outputDevices, refreshOutputDevices] = useAudioOutputDevices();
  return (
    <Fragment>
      <div className="burst output__header" style={{ gridArea: "refresh" }}>
        <button type="button" onClick={refreshOutputDevices}>
          Refresh Devices
        </button>
      </div>
      <ul className="output-list" style={{ gridArea: "output" }}>
        {outputDevices.map((device) => (
          <li key={device.deviceId}>
            <OutputItem device={device} source={source} />
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default OutputSection;
