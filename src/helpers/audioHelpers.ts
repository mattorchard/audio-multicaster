const getVolume = (frequencies: Uint8Array) => {
  let volume = 0;
  frequencies.forEach((frequency) => (volume += frequency));
  return volume / frequencies.length;
};

const normalizeVolume = (volume: number) => Math.min(volume, 128) / 128;

export const createGetVolume = (inputStream: MediaStream) => {
  const audioContext = new AudioContext();
  const inputNode = audioContext.createMediaStreamSource(inputStream);
  const analyzerNode = audioContext.createAnalyser();
  inputNode.connect(analyzerNode);
  return () => {
    const buffer = new Uint8Array(analyzerNode.frequencyBinCount);
    analyzerNode.getByteFrequencyData(buffer);
    return normalizeVolume(getVolume(buffer));
  };
};
