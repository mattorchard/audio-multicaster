import { Fragment } from "preact";
import "./globals.css";
import { useState } from "preact/hooks";
import InputSection from "./components/InputSection";
import OutputSection from "./components/OutputSection";

const App = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  return (
    <Fragment>
      <h1 style={{ gridArea: "brand" }} className="brand burst">
        Audio&nbsp;Multiplexer
      </h1>
      <InputSection stream={stream} onStreamChange={setStream} />
      <OutputSection source={stream} />
    </Fragment>
  );
};

const WrappedApp = () => <App />;

export default WrappedApp;
