export const formatTime = (start, end) => {
  const minutes = Math.floor(((end - start) / 1000).toFixed(0) / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (
    ((end - start) / 1000).toFixed(0) -
    Math.floor(((end - start) / 1000).toFixed(0) / 60) * 60
  )
    .toString()
    .padStart(2, "0");

  const milliseconds = (end - start)
    .toString()
    .slice(-3, -1)
    .padEnd(2, "0");

  return {
    minutes,
    seconds,
    milliseconds
  };
};
