// TimedJumpscare.tsx
import React from "react";
import "../App.css";

type TimedJumpscareProps = {
  waitTime: number;  // milliseconds before BOO
  scareTime: number; // milliseconds BOO is visible
};

export default function TimedJumpscare({ waitTime, scareTime }: TimedJumpscareProps) {
  const cycleTime = waitTime + scareTime;

  const style: React.CSSProperties = {
    animationName: "blink",
    animationTimingFunction: "steps(1, start)",
    animationIterationCount: "infinite",
    animationDuration: `${cycleTime}ms`,
    animationDelay: `${waitTime}ms`,
  };

  return <span className="BooText" style={style}>BOO!</span>;
}
