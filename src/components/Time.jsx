import React, { useState } from "react";

const Time = () => {
  const [time, setTime] = useState(null);
  setInterval(() => {
    setTime(
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  }, 1000);

  return <span>{time}</span>;
};

export default Time;
