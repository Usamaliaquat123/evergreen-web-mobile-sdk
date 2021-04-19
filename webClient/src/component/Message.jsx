import React from "react";

const Message = (props) => {
  const {message}= props
  const getStyle = () => {
    let baseClass = "alert ";
    if (message.msgError) {
      baseClass += "alert-danger ";
    } else {
      baseClass += "alert-primary";
    }
    return `${baseClass  } text-center`;
  };
  return (
    <div className={getStyle(props)} role="alert">
      {message.msgBody}
    </div>
  );
};
export default Message;
