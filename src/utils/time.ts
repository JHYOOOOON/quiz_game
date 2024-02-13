export const timeToSeconds = (time: number) => (time / 1000).toFixed(2);

export const getTimestamp = () => Date.now().toString();
