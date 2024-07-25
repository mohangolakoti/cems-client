import React, { useState, useEffect } from 'react';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);

  const formatTime = (date) => {
    const dat = new Date().toDateString()
    const time = new Date().toLocaleTimeString()
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${dat} ${time}`;
  };

  return (
    <div className="live-time">
      {formatTime(currentTime)}
    </div>
  );
};

export default CurrentTime;
