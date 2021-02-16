export const isStreamOver = (stream: MediaStream) => {
  const tracks = stream.getTracks();
  return (
    tracks.length === 0 || tracks.every((track) => track.readyState === "ended")
  );
};

export const onStreamEnd = (
  stream: MediaStream,
  callback: (stream: MediaStream) => void
) => {
  let streamEnded = false;
  const handlePossibleEndEvent = () => {
    if (!streamEnded && isStreamOver(stream)) {
      streamEnded = true;
      callback(stream);
    }
  };
  stream.addEventListener("removetrack", handlePossibleEndEvent);
  stream
    .getTracks()
    .forEach((track) =>
      track.addEventListener("ended", handlePossibleEndEvent)
    );
  stream.addEventListener("addtrack", (event) =>
    event.track.addEventListener("ended", handlePossibleEndEvent)
  );
};

export const asAudioOnlyStream = (combinedStream: MediaStream) => {
  const audioTracks = combinedStream.getAudioTracks();
  if (audioTracks.length === 0) throw new Error("No audio in selected stream");
  const audioStream = new MediaStream();
  audioTracks.forEach((audioTrack) => audioStream.addTrack(audioTrack));
  return audioStream;
};
