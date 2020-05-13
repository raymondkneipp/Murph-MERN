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

  const milliseconds = (end - start).toString().slice(-3, -1).padEnd(2, "0");

  return {
    minutes,
    seconds,
    milliseconds,
  };
};

export const msToTime = (duration) => {
  // let milliseconds = parseInt((duration % 1000) / 100);
  const milliseconds = duration.toString().slice(-3, -1).padEnd(2, "0");
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${
    hours === "00" ? "" : hours + ":"
  }${minutes}:${seconds}.${milliseconds}`;
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(date));
};
