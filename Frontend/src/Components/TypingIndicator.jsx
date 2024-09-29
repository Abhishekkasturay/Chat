import React from "react";

const TypingIndicator = ({ typingUsers }) => {
  if (typingUsers.length === 0) return null;

  return <p>Typing: {typingUsers.join(", ")}</p>;
};

export default TypingIndicator;
