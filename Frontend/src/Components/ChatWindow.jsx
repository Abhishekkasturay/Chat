import React from "react";

const ChatWindow = ({ messages }) => {
  return (
    <>
      {messages.map(({ message, userName }, index) => (
        <div className="w-full px-4 py-4" key={index}>
          <b>Sent by {userName}</b>
          <p>{message}</p>
        </div>
      ))}
    </>
  );
};

export default ChatWindow;
