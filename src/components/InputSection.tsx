import { Fragment, FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import { asAudioOnlyStream, onStreamEnd } from "../helpers/streamHelpers";
import useAsRef from "../hooks/useAsRef";
import VolumeVisualizer from "./VolumeVisualizer";

const InputSection: FunctionComponent<{
  stream: MediaStream | null;
  onStreamChange: (stream: MediaStream | null) => void;
}> = ({ stream, onStreamChange }) => {
  const streamRef = useAsRef(stream);

  useEffect(() => {
    if (stream) {
      onStreamEnd(stream, (endedStream) => {
        if (endedStream === streamRef.current) onStreamChange(null);
      });
    }
  }, [stream, streamRef]);

  const handleSelectStream = async () => {
    try {
      // @ts-ignore
      const stream = (await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: true,
      })) as MediaStream;
      onStreamChange(asAudioOnlyStream(stream));
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <section style={{ gridArea: "input" }} className="burst input-section">
      <header className="input-section__header">
        <h2>Input</h2>
        <button
          type="button"
          className={stream ? "secondary" : "primary"}
          onClick={handleSelectStream}
        >
          {stream ? "Change" : "Select"}
        </button>
      </header>
      {stream && (
        <Fragment>
          {/* Debug Info*/}
          <VolumeVisualizer stream={stream} />
        </Fragment>
      )}
    </section>
  );
};

export default InputSection;
