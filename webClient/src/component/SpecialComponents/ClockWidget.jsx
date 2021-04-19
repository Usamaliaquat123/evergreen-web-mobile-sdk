/* eslint-disable no-nested-ternary */
import React from "react";

const ClockWidget = ({props}) => {

  const { hours, minutes, seconds, ampm } = props;
  return (
    <div
      className="text-white clock font-weight-bold"
      style={{ fontSize: "25px" }}
    >
      {hours === 0 ? 12 : hours > 12 ? hours - 12 : hours}:
      {minutes > 9 ? minutes : `0${minutes}`}:
      {seconds > 9 ? seconds : `0${seconds}`} {ampm}
    </div>
  );
};
export default ClockWidget;